"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import {
  DESK_STORAGE_KEY,
  LOOK_FAMILIAR_FUNNEL,
  type FunnelDeskId,
  funnelDesks,
} from "@/config/look-familiar-funnel";
import { track } from "@/lib/analytics";
import { patchFunnelAttribution } from "@/lib/attribution";
import { Reveal } from "@/components/reveal";
import { FunnelChrome } from "@/components/land/funnel/chrome";
import { DeskFinderCard } from "@/components/land/funnel/oos-ui";
import { cn } from "cn";

const LAND = "out-of-space";

function filesFor(siteDeskId: string) {
  return site.desks.find((desk) => desk.id === siteDeskId)?.files.slice(0, 4) ?? [];
}

export function DeskStep() {
  const [selected, setSelected] = useState<FunnelDeskId>("home");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DESK_STORAGE_KEY) as FunnelDeskId | null;
      const initial =
        saved && funnelDesks.some((desk) => desk.id === saved) ? saved : ("home" as FunnelDeskId);
      setSelected(initial);
      window.localStorage.setItem(DESK_STORAGE_KEY, initial);
      patchFunnelAttribution({
        funnel: LOOK_FAMILIAR_FUNNEL,
        funnel_step: "desk",
        desk: initial,
        land: LAND,
      });
    } catch {
      // ignore
    }
  }, []);

  function choose(id: FunnelDeskId) {
    setSelected(id);
    try {
      window.localStorage.setItem(DESK_STORAGE_KEY, id);
    } catch {
      // ignore
    }
    patchFunnelAttribution({
      funnel: LOOK_FAMILIAR_FUNNEL,
      funnel_step: "desk",
      desk: id,
      land: LAND,
    });
    track(site.analytics.events.landCta, {
      land: LAND,
      cta: "Select desk",
      desk: id,
      funnel: LOOK_FAMILIAR_FUNNEL,
      step: "desk",
    });
  }

  const active = funnelDesks.find((desk) => desk.id === selected) ?? funnelDesks[0];

  return (
    <FunnelChrome stepId="desk">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">On the desks</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Same product. Different libraries.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cove does not become a different app for each desk. Pick the one that looks like yours.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {funnelDesks.map((desk) => (
            <button
              key={desk.id}
              type="button"
              onClick={() => choose(desk.id)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm transition-colors",
                selected === desk.id
                  ? "border-foreground bg-foreground text-paper"
                  : "border-foreground/15 bg-white/70 text-foreground hover:border-foreground/30",
              )}
            >
              {desk.persona}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <Reveal key={active.id}>
            <p className="text-[0.68rem] font-medium tracking-[0.2em] text-cove uppercase">{active.persona}</p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">{active.headline}</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{active.body}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              Selected for the next step and the waitlist. You can change it anytime.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-[16px] bg-[#e8e6de] p-4 sm:p-5">
              <DeskFinderCard volume={active.volume} files={filesFor(active.siteDeskId)} />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {funnelDesks
            .filter((desk) => desk.id !== selected)
            .map((desk) => (
              <button
                key={desk.id}
                type="button"
                onClick={() => choose(desk.id)}
                className="rounded-[14px] border border-foreground/10 bg-paper p-5 text-left transition-colors hover:border-cove/35"
              >
                <p className="text-[0.68rem] font-medium tracking-[0.18em] text-cove uppercase">{desk.persona}</p>
                <p className="mt-2 font-serif text-xl tracking-[-0.03em]">{desk.headline}</p>
              </button>
            ))}
        </div>
      </div>
    </FunnelChrome>
  );
}
