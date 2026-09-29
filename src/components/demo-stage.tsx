"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

function subscribeNarrow(onChange: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function readNarrow() {
  return window.matchMedia("(max-width: 767px)").matches;
}

export function DemoStage({ children, length = 1 }: { children: ReactNode; length?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const narrow = useSyncExternalStore(subscribeNarrow, readNarrow, () => false);
  const [peak, setPeak] = useState(1);
  // Extra downward settle so zoom-out hands off flush into the next section (no giant gap).
  const [settleY, setSettleY] = useState(0);
  // Homepage ~200vh: zoom in, hold, zoom out. Demo page can pass length=0.5 for half.
  const runway = Math.max(0.5, length) * 200;

  useLayoutEffect(() => {
    if (reduce || narrow) return;
    const measure = () => {
      const frame = ref.current?.querySelector("[data-demo-frame]") as HTMLElement | null;
      if (!frame) return;
      const width = frame.offsetWidth;
      const height = frame.offsetHeight;
      if (width < 8 || height < 8) return;
      // Prefer ~85vw, but never grow past ~88svh so the sticky frame stays on screen.
      const byWidth = (window.innerWidth * 0.85) / width;
      const byHeight = (window.innerHeight * 0.88) / height;
      const next = Math.min(byWidth, byHeight);
      const clamped = next < 1.02 ? 1 : Math.min(next, 1.55);
      setPeak((current) => (Math.abs(current - clamped) < 0.01 ? current : clamped));
      // From vertical center down to a tight bottom pad, so release meets CloudStream cleanly.
      const fromCenterToBottom = (window.innerHeight - height) / 2 - 20;
      setSettleY((current) => {
        const value = Math.max(0, fromCenterToBottom);
        return Math.abs(current - value) < 1 ? current : value;
      });
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    const frame = ref.current?.querySelector("[data-demo-frame]");
    if (frame && ro) ro.observe(frame);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce, narrow]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Zoom in → hold sticky at peak → zoom back out as the section releases.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.85, 1],
    [1, reduce ? 1 : peak, reduce ? 1 : peak, reduce ? 1 : peak, 1],
  );
  // Stay centered through the hold; drift down while zooming out so the next section isn’t orphaned.
  const y = useTransform(scrollYProgress, [0, 0.75, 1], [0, 0, reduce ? 0 : settleY]);

  if (reduce || narrow) {
    return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>;
  }

  return (
    <div ref={ref} className="relative" style={{ height: `${runway}vh` }}>
      <div className="sticky top-0 z-20 flex h-svh items-center justify-center overflow-visible">
        <motion.div
          data-demo-frame
          style={{ scale, y }}
          className="mx-auto w-full max-w-6xl origin-center px-4 will-change-transform sm:px-6"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
