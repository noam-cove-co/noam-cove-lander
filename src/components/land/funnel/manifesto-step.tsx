"use client";

import { motion, useReducedMotion } from "motion/react";
import { StaysLightChrome } from "@/components/land/funnel/chrome";
import { CoveMark } from "@/components/brand";

export function ManifestoStep() {
  const reduce = useReducedMotion();

  return (
    <StaysLightChrome stepId="manifesto">
      <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-end overflow-hidden px-5 pb-28 pt-16 sm:px-8 sm:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 80% 10%, rgba(14,107,86,0.09), transparent 55%), radial-gradient(60% 50% at 10% 90%, rgba(14,19,32,0.06), transparent 50%), linear-gradient(165deg, #ddd9d0 0%, #e9e7e1 42%, #d5d2c9 100%)",
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-[12%] right-[8%] opacity-[0.14] sm:right-[12%]"
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.14, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <CoveMark className="size-[min(52vw,380px)]" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-5xl">
          <motion.p
            className="font-sans text-[0.72rem] font-medium tracking-[0.28em] text-[#0e6b56] uppercase"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Cove
          </motion.p>
          <motion.h1
            className="mt-6 max-w-[14ch] font-serif text-[clamp(3.2rem,9vw,6.5rem)] leading-[0.92] tracking-[-0.045em]"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            The Mac that stays light.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-md text-lg leading-relaxed text-[#3c4654] sm:text-xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            A cloud drive, shown in Finder. The library does not live on the system disk.
          </motion.p>
          <motion.div
            className="mt-12 h-px max-w-[8rem] bg-[#0e1320]/25"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.p
            className="mt-6 font-sans text-[0.7rem] tracking-[0.2em] text-[#0e1320]/45 uppercase"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Private beta · NOAM Co.
          </motion.p>
        </div>
      </section>
    </StaysLightChrome>
  );
}
