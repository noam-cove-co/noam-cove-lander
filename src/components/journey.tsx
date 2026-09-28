"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Kicker } from "@/components/section";
import { cn } from "cn";

const apps = ["Photos", "Finder", "Premiere", "Logic", "Cursor"];

export function Journey() {
  const steps = site.journey.steps;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = refs.current.filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = nodes.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.25, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id={site.journey.id} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Kicker>{site.journey.kicker}</Kicker>
      <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl">
        {site.journey.title}
      </h2>
      <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          {steps.map((step, index) => (
            <article
              key={step.index}
              ref={(node) => {
                refs.current[index] = node;
              }}
              className="border-t border-foreground/10 py-8 lg:min-h-[48vh]"
            >
              <p className={cn("font-serif text-sm", index === active ? "text-cove" : "text-muted-foreground")}>
                {step.index}
              </p>
              <h3 className="mt-2 font-serif text-3xl tracking-tight">{step.title}</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">{step.body}</p>
              <div className="mt-6 lg:hidden">
                <Stage index={index} />
              </div>
            </article>
          ))}
        </div>
        <div className="sticky top-28 hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <Stage index={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Stage({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="glass rounded-[28px] p-6">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">New drive</p>
        <p className="mt-4 font-serif text-4xl tracking-tight">Family</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["1 TB", "2 TB", "4 TB"].map((size, sizeIndex) => (
            <span
              key={size}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm",
                sizeIndex === 1 ? "bg-pine text-paper" : "bg-white/70 ring-1 ring-foreground/10",
              )}
            >
              {size}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Lives in the cloud. Named by you.</p>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="glass rounded-[28px] p-6">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Locations</p>
        <div className="mt-4 grid gap-2">
          <div className="rounded-2xl bg-white/50 px-4 py-3 text-sm text-muted-foreground">Macintosh HD</div>
          <div className="flex items-center gap-3 rounded-2xl bg-mist px-4 py-3 text-sm text-pine">
            <CoveMark className="size-5" />
            Family
            <span className="ml-auto size-2 rounded-full bg-cove" />
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">On your Mac, beside the drives you already have.</p>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="glass rounded-[28px] p-6">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Opens with</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {apps.map((app) => (
            <span key={app} className="rounded-2xl bg-white/70 px-3 py-2 text-sm ring-1 ring-black/5">
              {app}
            </span>
          ))}
        </div>
        <p className="mt-5 font-mono text-xs text-muted-foreground">Cove / Family / School play.mov</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-[28px] p-6">
      <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Family</p>
      <p className="mt-3 font-serif text-4xl tracking-tight">2.4 TB</p>
      <p className="mt-2 text-sm text-muted-foreground">of photos and videos, kept in the cloud.</p>
      <div className="mt-6 rounded-2xl bg-pine px-4 py-4 text-paper">
        <p className="text-sm text-white/70">Stored on this Mac</p>
        <p className="font-serif text-3xl">Almost nothing</p>
      </div>
    </div>
  );
}
