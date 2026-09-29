"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { site } from "@/config/site";
import { LOOK_FAMILIAR_FUNNEL } from "@/config/look-familiar-funnel";
import { track } from "@/lib/analytics";
import { withUtm } from "@/lib/attribution";
import { DemoStage } from "@/components/demo-stage";
import { Reveal } from "@/components/reveal";
import { FunnelChrome, FunnelTryCta } from "@/components/land/funnel/chrome";
import { CoveFinderPreview } from "@/components/land/funnel/oos-ui";

const LAND = "out-of-space";

export function DriveStep() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 0.55", "end end"],
  });

  function mount(next: boolean) {
    if (mountedRef.current === next) return;
    mountedRef.current = next;
    setMounted(next);
    track(site.analytics.events.landCta, {
      land: LAND,
      cta: next ? "Mount preview" : "Unmount preview",
      funnel: LOOK_FAMILIAR_FUNNEL,
      step: "drive",
    });
  }

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    if (value > 0.08) mount(true);
  });

  return (
    <FunnelChrome stepId="drive">
      <div className="hero-wash">
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
          <Reveal>
            <p className="font-marker rotate-[-3deg] text-3xl text-cove">Then this</p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Your own cloud drive, on your Mac.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              One click. Cove shows up under Locations. The heavy files stay in the cloud. The Mac stays light.
            </p>
          </Reveal>
        </div>
        <div ref={stageRef}>
          <DemoStage length={0.75}>
            <CoveFinderPreview mounted={mounted} onMount={() => mount(true)} />
            <div className="relative z-30 mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => mount(!mountedRef.current)}
                className="try-mac-frame"
                style={{ animation: "none" }}
              >
                <span
                  className="try-mac inline-flex h-11 items-center px-5 text-[14px] font-medium"
                  style={{ animation: "none" }}
                >
                  {mounted ? "Remove from this Mac" : "One click: show Family"}
                </span>
              </button>
              <FunnelTryCta href={withUtm("/demo")} label="Try on this Mac" />
            </div>
          </DemoStage>
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          Next: pick a desk like yours. Same drive. Different libraries.
        </p>
      </section>
    </FunnelChrome>
  );
}
