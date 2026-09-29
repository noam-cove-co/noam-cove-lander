"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { STAYS_LIGHT_FUNNEL } from "@/config/stays-light-funnel";
import { track } from "@/lib/analytics";
import { Reveal } from "@/components/reveal";
import { StaysLightChrome } from "@/components/land/funnel/chrome";
import { DeskFinderCard } from "@/components/land/funnel/oos-ui";
import { cn } from "cn";

const LAND = "stays-light";

const libraries = [
  {
    id: "home",
    kicker: "At home",
    headline: "Dads keep the family films here.",
    line: "Not in a drawer. Not on a full laptop. On a drive that simply shows up.",
    volume: "Family",
    siteDeskId: "home",
  },
  {
    id: "marketing",
    kicker: "Marketing",
    headline: "Performance is nothing without room.",
    line: "The campaign, the cut, the masters. One drive the whole desk can open.",
    volume: "Spring campaign",
    siteDeskId: "marketing",
  },
  {
    id: "studio",
    kicker: "Studio",
    headline: "Quiet confidence. Loud libraries.",
    line: "Sessions, photographs, rushes. Still just a drive on the Mac.",
    volume: "Studio",
    siteDeskId: "studio",
  },
  {
    id: "agents",
    kicker: "Agents",
    headline: "The repo lives on the drive.",
    line: "So does the agent. A home that is not the system disk.",
    volume: "florist-shop",
    siteDeskId: "agents",
  },
];

export function LibrariesStep() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const lib = libraries[active];
  const files = site.desks.find((d) => d.id === lib.siteDeskId)?.files.slice(0, 4) ?? [];

  return (
    <StaysLightChrome stepId="libraries">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="font-sans text-[0.72rem] font-medium tracking-[0.28em] text-[#0e6b56] uppercase">
            Libraries
          </p>
          <h1 className="mt-5 max-w-[16ch] font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            Quiet confidence. Loud libraries.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#3c4654]">
            Cove does not become a different product for each desk. The folders change. The click does not.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="space-y-1">
            {libraries.map((item, index) => {
              const on = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActive(index);
                    track(site.analytics.events.landCta, {
                      land: LAND,
                      cta: "Library select",
                      desk: item.id,
                      funnel: STAYS_LIGHT_FUNNEL,
                      step: "libraries",
                    });
                  }}
                  className={cn(
                    "block w-full border-t border-[#0e1320]/12 py-5 text-left transition-colors last:border-b",
                    on ? "opacity-100" : "opacity-40 hover:opacity-70",
                  )}
                >
                  <p className="font-sans text-[0.65rem] tracking-[0.22em] text-[#0e6b56] uppercase">
                    {String(index + 1).padStart(2, "0")} · {item.kicker}
                  </p>
                  <p className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{item.headline}</p>
                  {on ? <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#3c4654]">{item.line}</p> : null}
                </button>
              );
            })}
          </div>

          <motion.div
            key={lib.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div
              className="rounded-[2px] p-5 sm:p-7"
              style={{
                background:
                  "linear-gradient(160deg, #d8d4c9 0%, #ebe8e0 45%, #cfcbbf 100%)",
              }}
            >
              <DeskFinderCard volume={lib.volume} files={files} />
              <p className="mt-5 font-sans text-[0.68rem] tracking-[0.18em] text-[#0e1320]/45 uppercase">
                On this Mac · almost nothing until you open
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </StaysLightChrome>
  );
}
