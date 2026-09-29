"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { MacDesktop, PhonePeek } from "@/components/platform-plays";
import { WaitlistForm } from "@/components/waitlist";

export function DownloadView() {
  const reduce = useReducedMotion();
  const [waitlistIntent, setWaitlistIntent] = useState<{ ios: boolean; stamp: number }>({
    ios: false,
    stamp: 0,
  });

  function askForSeat(ios = false) {
    setWaitlistIntent({ ios, stamp: Date.now() });
    requestAnimationFrame(() => {
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 85% 110%, rgba(14,107,86,0.35), transparent 55%), linear-gradient(165deg, #d5dee6 0%, #efe8df 46%, #c5d4cc 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.72rem] font-medium tracking-[0.22em] text-[#0e6b56] uppercase">
              {site.campaign.badge}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-balance text-[#0e1320] sm:text-6xl lg:text-7xl">
              {site.download.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3c4654]">{site.download.body}</p>
          </motion.div>

          <div className="mt-14 grid items-start gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <MacDesktop />
              <p className="mt-5 text-xs tracking-[0.18em] text-[#0e6b56] uppercase">
                {site.platforms.macos.status}
              </p>
              <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] text-[#0e1320] sm:text-5xl">
                {site.platforms.macos.name}
              </h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-[#3c4654]">
                {site.platforms.macos.detail}
              </p>
              <ul className="mt-7 grid gap-0 border-t border-[#0e1320]/12">
                {site.download.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-[#0e1320]/12 py-3.5 text-[15px] leading-relaxed text-[#0e1320]"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-[#0e6b56]" strokeWidth={2.25} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => askForSeat(false)}
                className="mt-8 h-12 rounded-md bg-[#0e6b56] px-5 text-[15px] font-medium text-white"
              >
                Ask for a seat
              </button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="lg:pt-2"
            >
              <PhonePeek />
              <p className="mt-5 text-xs tracking-[0.18em] text-[#5c6570] uppercase">
                {site.platforms.ios.status}
              </p>
              <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] text-[#0e1320] sm:text-5xl">
                {site.platforms.ios.name}
              </h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-[#3c4654]">
                {site.platforms.ios.detail}
              </p>
              <button
                type="button"
                onClick={() => askForSeat(true)}
                className="mt-8 h-12 rounded-md border border-[#0e1320]/15 bg-white/55 px-5 text-[15px] font-medium text-[#0e1320] backdrop-blur-sm"
              >
                Tell me when iPhone is ready
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="relative isolate scroll-mt-24 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 10% 0%, rgba(14,107,86,0.2), transparent 50%), linear-gradient(165deg, #c5d4cc 0%, #efe8df 42%, #d5dee6 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-[#0e6b56] uppercase">
            {site.campaign.badge}
          </p>
          <h2 className="mt-3 font-serif text-5xl tracking-[-0.04em] text-[#0e1320] sm:text-6xl">
            Ask for a seat
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#3c4654]">
            Tell us whether the drive is for family photos, a marketing team, a studio, or a project you
            are building with an agent.
          </p>
          <div className="mt-10">
            <WaitlistForm
              key={waitlistIntent.stamp || "idle"}
              source="download"
              iosDefault={waitlistIntent.ios}
              initialStep={waitlistIntent.ios && waitlistIntent.stamp ? 2 : 0}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
