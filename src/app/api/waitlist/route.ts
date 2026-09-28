import { macs, roles, site } from "@/config/site";
import { addWaitlistEntry } from "@/lib/waitlist-store";

const roleIds = new Set<string>(roles.map((role) => role.id));
const macIds = new Set<string>(macs.map((mac) => mac.id));

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "That note was empty." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, message: "That note was empty." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;

  if (clean(input.company, 120)) {
    return Response.json({ ok: true, already: false });
  }

  const name = clean(input.name, 80);
  const email = clean(input.email, 160).toLowerCase();
  const role = clean(input.role, 32);
  const mac = clean(input.mac, 32);
  const source = clean(input.source, 32) || "site";
  const headline = clean(input.headline, 8) || site.experiment.active;
  const iosInterest = Boolean(input.iosInterest);
  const organisation = clean(input.organisation, 120);
  const note = clean(input.note, 500);
  const allowedRoles = new Set<string>([...roleIds, "range"]);

  if (name.length < 2) {
    return Response.json({ ok: false, message: "Add your name, so we know who to write to." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, message: "That email does not look ready to receive a letter." }, { status: 400 });
  }

  if (!allowedRoles.has(role)) {
    return Response.json({ ok: false, message: "Choose the desk you work at." }, { status: 400 });
  }

  if (mac && !macIds.has(mac)) {
    return Response.json({ ok: false, message: "Choose a Mac, or leave it open." }, { status: 400 });
  }

  try {
    const result = await addWaitlistEntry({
      id: crypto.randomUUID(),
      name,
      email,
      role,
      mac,
      iosInterest,
      source,
      campaign: source === "mt-mtn" ? "mt-mtn" : site.campaign.id,
      headline,
      organisation,
      note,
      createdAt: new Date().toISOString(),
    });

    return Response.json({ ok: true, already: result === "exists" });
  } catch {
    return Response.json(
      { ok: false, message: "The list did not take that. Try again in a moment." },
      { status: 500 },
    );
  }
}
