import { getLeaderboard, storageBackend } from "@/lib/waitlist-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? "5");
  const you = url.searchParams.get("you") ?? undefined;
  const rows = await getLeaderboard(Number.isFinite(limit) ? limit : 5, you ?? undefined);
  return Response.json(
    { ok: true, rows, backend: storageBackend() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
