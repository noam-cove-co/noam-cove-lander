/**
 * Screenshot each /internal/campaign/[name]/export/[id] creative
 * into public/campaign/[name]/[id].png at native pixel size.
 */
import playwright from "/tmp/node_modules/playwright-core/index.js";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";

const { chromium } = playwright;
const base = process.env.SITE_URL ?? "http://127.0.0.1:4317";
const chrome = process.env.CHROME_PATH ?? "/usr/local/bin/google-chrome";
const only = process.env.ONLY?.split(",").filter(Boolean) ?? null;

// Keep in sync with src/config/campaigns.ts
const campaigns = [
  {
    id: "own-drive",
    creatives: [
      "od-og-always",
      "od-li-light",
      "od-fb-heavy",
      "od-ig-ohio",
      "od-ig-always",
      "od-story-click",
      "od-poster-own",
      "od-li-square",
      "od-og-hero-cta",
      "od-ig-hero-cta",
      "od-ig-product",
      "od-fb-product",
      "od-li-hero",
      "od-poster-product",
    ],
  },
  {
    id: "join-the-list",
    creatives: [
      "jl-og-seat",
      "jl-li-reserved",
      "jl-fb-write",
      "jl-ig-list",
      "jl-ig-click",
      "jl-story-beta",
      "jl-poster-wait",
      "jl-li-square",
      "jl-og-void",
      "jl-ig-void",
      "jl-story-void",
      "jl-poster-void",
      "jl-og-board",
      "jl-ig-board",
      "jl-ig-board-tall",
      "jl-fb-board",
      "jl-li-board",
    ],
  },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: chrome,
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const campaign of campaigns) {
  const dir = join(process.cwd(), "public/campaign", campaign.id);
  await mkdir(dir, { recursive: true });
  const ids = only
    ? campaign.creatives.filter((id) => only.includes(id))
    : campaign.creatives;
  for (const id of ids) {
    const url = `${base}/internal/campaign/${campaign.id}/export/${id}`;
    const page = await browser.newPage({
      viewport: { width: 1600, height: 2200 },
      deviceScaleFactor: 1,
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(500);
    const frame = page.locator(`[data-creative="${id}"]`);
    await frame.waitFor({ state: "visible", timeout: 15000 });
    const out = join(dir, `${id}.png`);
    await frame.screenshot({ path: out, type: "png" });
    const box = await frame.boundingBox();
    console.log(JSON.stringify({ campaign: campaign.id, id, out, box }));
    await page.close();
  }
}

const manifestPath = join(process.cwd(), "public/campaign/manifest.json");
let previous = {};
try {
  previous = JSON.parse(await readFile(manifestPath, "utf8"));
} catch {
  previous = {};
}

await writeFile(
  manifestPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      previousGeneratedAt: previous.generatedAt ?? null,
      campaigns: campaigns.map((c) => ({
        id: c.id,
        assets: c.creatives.map((id) => `/campaign/${c.id}/${id}.png`),
      })),
    },
    null,
    2,
  ),
);

await browser.close();
console.log("done");
