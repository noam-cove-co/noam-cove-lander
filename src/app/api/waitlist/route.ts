import { macs, roles, site } from "@/config/site";
import { addWaitlistEntry, inviteCount, storageBackend } from "@/lib/waitlist-store";

const roleIds = new Set<string>(roles.map((role) => role.id));
const macIds = new Set<string>(macs.map((mac) => mac.id));

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export async function GET(request: Request) {
  const ref = new URL(request.url).searchParams.get("ref") ?? "";
  const invited = await inviteCount(ref);
  if (invited === null) {
    return Response.json({ ok: false }, { status: 404 });
  }
  return Response.json(
    { ok: true, invited, backend: storageBackend() },
    { headers: { "Cache-Control": "no-store" } },
  );
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
  const source = clean(input.source, 48) || "site";
  const headline = clean(input.headline, 8) || site.experiment.active;
  const iosInterest = Boolean(input.iosInterest);
  const organisation = clean(input.organisation, 120);
  const note = clean(input.note, 500);
  const land = clean(input.land, 64);
  const campaign = clean(input.campaign, 64) || (source === "mt-mtn" ? "mt-mtn" : site.campaign.id);
  const allowedRoles = new Set<string>([...roleIds, "range", "home"]);

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
    const result = await addWaitlistEntry(
      {
        id: crypto.randomUUID(),
        name,
        email,
        role,
        mac,
        iosInterest,
        source,
        campaign,
        headline,
        organisation,
        note,
        land: land || undefined,
        utmSource: clean(input.utm_source, 80) || undefined,
        utmMedium: clean(input.utm_medium, 80) || undefined,
        utmCampaign: clean(input.utm_campaign, 80) || undefined,
        utmContent: clean(input.utm_content, 80) || undefined,
        utmTerm: clean(input.utm_term, 80) || undefined,
        createdAt: new Date().toISOString(),
      },
      clean(input.ref, 32),
    );

    return Response.json({
      ok: true,
      already: result.status === "exists",
      inviteCode: result.inviteCode,
      invited: result.invited,
      rank: result.rank,
      backend: storageBackend(),
    });
  } catch {
    return Response.json(
      { ok: false, message: "The list did not take that. Try again in a moment." },
      { status: 500 },
    );
  }
}
