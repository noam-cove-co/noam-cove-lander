import { randomBytes } from "node:crypto";
import { promises as fs } from "fs";
import path from "path";
import { getRedis } from "@/lib/redis";

export type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  role: string;
  mac: string;
  iosInterest: boolean;
  source: string;
  campaign: string;
  headline: string;
  organisation: string;
  note: string;
  createdAt: string;
  inviteCode?: string;
  invited?: number;
  land?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referredBy?: string;
};

export type WaitlistWriteResult = {
  status: "created" | "exists";
  inviteCode: string;
  invited: number;
  rank: number | null;
};

export type LeaderboardRow = {
  rank: number;
  name: string;
  invites: number;
  you?: boolean;
};

const file = path.join(process.cwd(), "data", "waitlist.json");
const REDIS_KEY = "cove:waitlist:entries";
const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";

let pending: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = pending.then(task, task);
  pending = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function emailOf(row: WaitlistEntry) {
  return typeof row.email === "string" ? row.email.toLowerCase() : "";
}

function countOf(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function normalRef(ref: string | undefined) {
  const code = (ref ?? "").trim().toLowerCase();
  return /^[a-z0-9]{4,16}$/.test(code) ? code : "";
}

function makeCode(length: number) {
  const chars: string[] = [];
  const span = alphabet.length * Math.floor(256 / alphabet.length);
  while (chars.length < length) {
    for (const byte of randomBytes(length)) {
      if (byte >= span) continue;
      chars.push(alphabet[byte % alphabet.length]);
      if (chars.length === length) return chars.join("");
    }
  }
  return chars.join("");
}

function uniqueCode(rows: WaitlistEntry[]) {
  const taken = new Set(rows.map((row) => (row.inviteCode ?? "").toLowerCase()).filter(Boolean));
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = makeCode(attempt < 6 ? 6 : 8);
    if (!taken.has(code)) return code;
  }
  return makeCode(10);
}

function displayName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Guest";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

async function readFileAll(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row): row is WaitlistEntry => Boolean(row) && typeof row === "object");
  } catch {
    return [];
  }
}

async function writeFileAll(rows: WaitlistEntry[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(rows, null, 2));
}

async function readAll(): Promise<WaitlistEntry[]> {
  const redis = getRedis();
  if (!redis) return readFileAll();
  try {
    const rows = await redis.get<WaitlistEntry[]>(REDIS_KEY);
    if (!Array.isArray(rows)) return [];
    return rows.filter((row): row is WaitlistEntry => Boolean(row) && typeof row === "object");
  } catch {
    return readFileAll();
  }
}

async function writeAll(rows: WaitlistEntry[]) {
  const redis = getRedis();
  if (redis) {
    await redis.set(REDIS_KEY, rows);
    return;
  }
  await writeFileAll(rows);
}

function sameSignup(row: WaitlistEntry, email: string, source: string) {
  return emailOf(row) === email.toLowerCase() && row.source === source;
}

function applyReferral(rows: WaitlistEntry[], ref: string | undefined, email: string, ownCode: string) {
  const code = normalRef(ref);
  if (!code || code === ownCode) return "";
  const referrer = rows.find((row) => (row.inviteCode ?? "").toLowerCase() === code);
  if (!referrer || emailOf(referrer) === email.toLowerCase()) return "";
  referrer.invited = countOf(referrer.invited) + 1;
  return code;
}

function rankFor(rows: WaitlistEntry[], inviteCode: string) {
  const ranked = [...rows]
    .filter((row) => Boolean(row.inviteCode))
    .sort((a, b) => countOf(b.invited) - countOf(a.invited) || a.createdAt.localeCompare(b.createdAt));
  const index = ranked.findIndex((row) => (row.inviteCode ?? "").toLowerCase() === inviteCode.toLowerCase());
  return index >= 0 ? index + 1 : null;
}

async function addLocked(
  entry: Omit<WaitlistEntry, "inviteCode" | "invited">,
  ref?: string,
): Promise<WaitlistWriteResult> {
  const rows = await readAll();
  const existing = rows.find((row) => sameSignup(row, entry.email, entry.source));
  if (existing) {
    if (typeof existing.inviteCode !== "string" || !/^[a-z0-9]{4,16}$/i.test(existing.inviteCode)) {
      existing.inviteCode = uniqueCode(rows);
      await writeAll(rows);
    }
    return {
      status: "exists",
      inviteCode: existing.inviteCode.toLowerCase(),
      invited: countOf(existing.invited),
      rank: rankFor(rows, existing.inviteCode),
    };
  }

  const inviteCode = uniqueCode(rows);
  const referredBy = applyReferral(rows, ref, entry.email, inviteCode);
  const created: WaitlistEntry = {
    ...entry,
    inviteCode,
    invited: 0,
    referredBy: referredBy || undefined,
  };
  rows.push(created);
  await writeAll(rows);
  return { status: "created", inviteCode, invited: 0, rank: rankFor(rows, inviteCode) };
}

export function addWaitlistEntry(
  entry: Omit<WaitlistEntry, "inviteCode" | "invited">,
  ref?: string,
): Promise<WaitlistWriteResult> {
  return enqueue(() => addLocked(entry, ref));
}

export function inviteCount(ref: string): Promise<number | null> {
  const code = normalRef(ref);
  if (!code) return Promise.resolve(null);
  return enqueue(async () => {
    const rows = await readAll();
    const row = rows.find((item) => (item.inviteCode ?? "").toLowerCase() === code);
    if (!row) return null;
    return countOf(row.invited);
  });
}

export function getLeaderboard(limit = 5, youCode?: string): Promise<LeaderboardRow[]> {
  return enqueue(async () => {
    const rows = await readAll();
    const ranked = [...rows]
      .filter((row) => Boolean(row.inviteCode))
      .sort((a, b) => countOf(b.invited) - countOf(a.invited) || a.createdAt.localeCompare(b.createdAt))
      .slice(0, Math.max(3, Math.min(limit, 20)));

    // Demo seed when empty so land creatives / pages never look barren in local mock mode.
    if (ranked.length === 0) {
      return [
        { rank: 1, name: "Amelia K.", invites: 14 },
        { rank: 2, name: "James R.", invites: 11 },
        { rank: 3, name: "Priya S.", invites: 7 },
        { rank: 4, name: "Tom H.", invites: 6 },
        { rank: 5, name: "Sara L.", invites: 4 },
      ].slice(0, limit);
    }

    const you = normalRef(youCode);
    return ranked.map((row, index) => ({
      rank: index + 1,
      name: displayName(row.name),
      invites: countOf(row.invited),
      you: you ? (row.inviteCode ?? "").toLowerCase() === you : false,
    }));
  });
}

export function storageBackend(): "redis" | "file" {
  return getRedis() ? "redis" : "file";
}
