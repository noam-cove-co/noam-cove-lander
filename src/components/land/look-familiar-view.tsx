"use client";

import Link from "next/link";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { withUtm } from "@/lib/attribution";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CreativeFrame } from "@/components/campaign/creative-frame";
import { campaignById } from "@/config/campaigns";

const LAND = "look-familiar";

const featured = [
  "oos-og-rolex",
  "oos-ig-nb",
  "oos-li-porsche",
  "oos-poster-ralph",
  "oos-ig-news",
  "oos-fb-news",
];

export function LookFamiliarView() {
  const campaign = campaignById("out-of-space");
  const ads = campaign?.creatives.filter((item) => featured.includes(item.id)) ?? [];

  return (
    <div className="min-h-svh bg-[#efece4] text-[#0e1320]">
      <AttributionBeacon land={LAND} />
      <header className="border-b border-[#0e1320]/15">
        <div className="mx-auto flex max-w-5xl items-end justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="font-sans text-[0.68rem] tracking-[0.22em] text-[#0e6b56] uppercase">Print desk</p>
            <h1 className="mt-1 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">Look familiar?</h1>
          </div>
          <nav className="flex gap-4 text-sm text-[#3c4654]">
            <Link href={withUtm("/land/out-of-space")} className="hover:text-[#0e1320]">
              Look familiar journey
            </Link>
            <Link
              href={withUtm("/land/join-the-list")}
              onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join" })}
              className="hover:text-[#0e1320]"
            >
              Join the list →
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="max-w-2xl font-serif text-3xl leading-snug tracking-[-0.03em] sm:text-4xl">
          Newspaper quiet. Magazine confidence. The same Cove truth: enough space to do the work, on your Mac.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3c4654]">
          Inspired by Rolex, Porsche, Ralph Lauren, and New Balance print of their time: one line that lands, a little air, no clutter.
        </p>

        <div className="mt-14 grid gap-10">
          {ads.map((creative) => {
            const scale = Math.min(1, 720 / creative.width);
            return (
              <figure key={creative.id} className="border border-[#0e1320]/12 bg-[#e7e4db] p-4 sm:p-6">
                <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2 text-sm text-[#5c6570]">
                  <span className="font-serif text-xl tracking-tight text-[#0e1320]">{creative.headline}</span>
                  <span>
                    {creative.label} | {creative.persona}
                  </span>
                </figcaption>
                <div className="overflow-auto">
                  <div
                    className="origin-top-left shadow-[0_18px_40px_-28px_rgba(14,19,32,0.45)]"
                    style={{ width: creative.width * scale, height: creative.height * scale }}
                  >
                    <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                      <CreativeFrame creative={creative} />
                    </div>
                  </div>
                </div>
                <p className="mt-3">
                  <a
                    href={`/campaign/out-of-space/${creative.id}.png`}
                    download
                    className="text-sm text-cove hover:underline"
                  >
                    Download PNG
                  </a>
                </p>
              </figure>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-[#0e1320]/15">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
          <p className="font-serif text-3xl tracking-[-0.03em]">The Mac stays light.</p>
          <Link
            href={withUtm("/land/join-the-list")}
            onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Footer join" })}
            className="inline-flex h-12 items-center rounded-md bg-[#0e1320] px-6 text-[15px] font-medium text-[#f5f6f8]"
          >
            Join the private beta
          </Link>
        </div>
      </footer>
    </div>
  );
}
