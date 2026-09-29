import { randomBytes } from "node:crypto";
import { promises as fs } from "fs";
import path from "path";

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
};

export type WaitlistWriteResult = {
  status: "created" | "exists";
  inviteCode: string;
  invited: number;
};

const file = path.join(process.cwd(), "data", "waitlist.json");
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

async function readAll(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((row): row is WaitlistEntry => Boolean(row) && typeof row === "object");
  } catch {
    return [];
  }
}

async function writeAll(rows: WaitlistEntry[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(rows, null, 2));
}

function sameSignup(row: WaitlistEntry, email: string, source: string) {
  return emailOf(row) === email.toLowerCase() && row.source === source;
}

function applyReferral(rows: WaitlistEntry[], ref: string | undefined, email: string, ownCode: string) {
  const code = normalRef(ref);
  if (!code || code === ownCode) return;
  const referrer = rows.find((row) => (row.inviteCode ?? "").toLowerCase() === code);
  if (!referrer || emailOf(referrer) === email.toLowerCase()) return;
  referrer.invited = countOf(referrer.invited) + 1;
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
    };
  }

  const inviteCode = uniqueCode(rows);
  applyReferral(rows, ref, entry.email, inviteCode);
  const created: WaitlistEntry = { ...entry, inviteCode, invited: 0 };
  rows.push(created);
  await writeAll(rows);
  return { status: "created", inviteCode, invited: 0 };
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
