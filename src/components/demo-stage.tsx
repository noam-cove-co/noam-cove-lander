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

export function DemoStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const narrow = useSyncExternalStore(subscribeNarrow, readNarrow, () => false);
  const [peak, setPeak] = useState(1);

  useLayoutEffect(() => {
    if (reduce || narrow) return;
    const measure = () => {
      const frame = ref.current?.querySelector("[data-demo-frame]") as HTMLElement | null;
      if (!frame) return;
      const width = frame.offsetWidth;
      const height = frame.offsetHeight;
      if (width < 8 || height < 8) return;
      const byWidth = (window.innerWidth * 0.85) / width;
      const byHeight = (window.innerHeight * 1.02) / height;
      const next = Math.min(byWidth, byHeight);
      const clamped = next < 1.02 ? 1 : Math.min(next, 1.7);
      setPeak((current) => (Math.abs(current - clamped) < 0.01 ? current : clamped));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce, narrow]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [1, reduce ? 1 : peak, reduce ? 1 : peak, 1]);

  // Mobile: no sticky runway — CloudStream can sit a natural gap below the demo.
  if (reduce || narrow) {
    return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>;
  }

  return (
    <div ref={ref} className="relative h-[108vh]">
      <div className="sticky top-16 z-20 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div data-demo-frame style={{ scale }} className="origin-top will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
