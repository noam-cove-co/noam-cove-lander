"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { FunnelChrome } from "@/components/land/funnel/chrome";
import { MacDesktopShell, StorageMeter, StorageSettingsPanel } from "@/components/land/funnel/oos-ui";

const pains = [
  {
    mark: "01",
    scribble: "Every export",
    line: "11 GB left, and the export still needs somewhere to land.",
    detail: "The cut finishes. The disk does not. Something has to go.",
  },
  {
    mark: "02",
    scribble: "One small disk",
    line: "Family film and the client campaign sharing one small disk.",
    detail: "Christmas.mov next to banner-v17.png. Neither should live on Macintosh HD.",
  },
  {
    mark: "03",
    scribble: "The drawer",
    line: "A drawer of little drives, none of them the right one.",
    detail: "You already paid for the space. It just never shows up on the Mac.",
  },
  {
    mark: "04",
    scribble: "The agent’s desk",
    line: "The agent’s repo wants a home that is not the system disk.",
    detail: "Cursor, Claude, the project notes: they need a drive, not 11 GB of mercy.",
  },
];

function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scribbleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const meterY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const meterRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 4]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20">
      <motion.div style={{ opacity: fade }} className="mx-auto max-w-6xl">
        <motion.p style={{ y: scribbleY }} className="font-marker rotate-[-4deg] text-3xl text-cove sm:text-4xl">
          Look familiar?
        </motion.p>
        <div className="mt-4 grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h1 className="max-w-2xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              The work got heavy. The laptop stayed the same size.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Running out of space is the quiet ceiling on every desk: home film, a spring campaign, a studio session, a
              repo an agent is writing. Cove is the other drive.
            </p>
          </div>
          <motion.div style={{ y: meterY, rotate: meterRotate }} className="relative">
            <StorageMeter />
            <p className="font-marker absolute -right-2 -bottom-4 rotate-[8deg] text-2xl text-cove sm:right-4">
              every year
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function PainJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 28, mass: 0.35 });
  const [index, setIndex] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(pains.length - 1, Math.floor(v * pains.length + 0.001));
    setIndex((current) => (current === next ? current : next));
  });

  if (reduce) {
    return (
      <section className="border-y border-foreground/10 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">The pain</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
            Never quite enough room to do what you actually want.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {pains.map((item) => (
              <li key={item.mark} className="rounded-[12px] border border-foreground/10 bg-[#f3f1ea] p-5">
                <span className="font-marker text-2xl text-cove">{item.mark}</span>
                <p className="mt-2 font-serif text-2xl leading-snug tracking-[-0.03em]">{item.line}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative bg-paper" style={{ height: `${pains.length * 85}vh` }}>
      <div className="sticky top-[3.25rem] flex min-h-[calc(100svh-3.25rem)] items-center overflow-hidden border-y border-foreground/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">The pain</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
              Never quite enough room to do what you actually want.
            </h2>
            <div className="mt-8 space-y-3">
              {pains.map((item, i) => {
                const on = i === index;
                return (
                  <div
                    key={item.mark}
                    className={`rounded-[12px] border px-4 py-3 transition-all duration-500 ${
                      on
                        ? "border-cove/35 bg-[#f3f1ea] shadow-[0_18px_40px_-32px_rgba(14,19,32,0.35)]"
                        : "border-transparent opacity-40"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-marker text-xl text-cove">{item.mark}</span>
                      <p className="font-marker text-lg text-cove/80">{item.scribble}</p>
                    </div>
                    <p className="mt-1 font-serif text-xl leading-snug tracking-[-0.03em] sm:text-2xl">{item.line}</p>
                    {on ? <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p> : null}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <MacDesktopShell menu="System Settings">
                <StorageSettingsPanel />
              </MacDesktopShell>
            </motion.div>
            <p className="font-marker pointer-events-none absolute -left-2 top-6 rotate-[-8deg] text-2xl text-[#d01212] sm:-left-4 sm:text-3xl">
              {pains[index].scribble}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PainStep() {
  return (
    <FunnelChrome stepId="pain">
      <HeroScene />
      <PainJourney />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="font-marker rotate-[-3deg] text-3xl text-cove">So?</p>
        <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
          There is another drive.
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          Next: see Cove show up under Locations on a Mac. One click. The heavy files stay in the cloud.
        </p>
      </section>
    </FunnelChrome>
  );
}
