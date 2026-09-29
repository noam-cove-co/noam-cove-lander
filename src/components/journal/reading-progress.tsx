"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.bottom <= window.innerHeight ? 1 : 0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  const pct = Math.round(progress * 100);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-foreground/8"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className="journal-progress-ink h-full bg-cove transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="journal-progress sticky top-14 z-30 border-b border-foreground/15 bg-background/95 backdrop-blur-sm md:top-16">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <p className="font-marker text-sm text-foreground/70">Edition in progress</p>
          <p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
            {pct}% read
          </p>
        </div>
      </div>
    </>
  );
}
