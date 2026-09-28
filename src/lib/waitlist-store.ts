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
};

const file = path.join(process.cwd(), "data", "waitlist.json");

async function readAll(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as WaitlistEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addWaitlistEntry(
  entry: WaitlistEntry,
): Promise<"created" | "exists"> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const rows = await readAll();
  if (
    rows.some(
      (row) =>
        row.email.toLowerCase() === entry.email.toLowerCase() && row.source === entry.source,
    )
  ) {
    return "exists";
  }
  rows.push(entry);
  await fs.writeFile(file, JSON.stringify(rows, null, 2));
  return "created";
}
