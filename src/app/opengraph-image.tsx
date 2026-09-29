import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cove: your own cloud drive, on your Mac. Crafted by NOAM Co.";

/** Main-site OG / social share image: Own Drive hero creative. */
export default async function OpenGraphImage() {
  const png = await readFile(join(process.cwd(), "public/campaign/own-drive/od-og-hero-cta.png"));
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
