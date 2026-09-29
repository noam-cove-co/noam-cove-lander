"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { STAYS_LIGHT_FUNNEL } from "@/config/stays-light-funnel";
import { track } from "@/lib/analytics";
import { CoveMark } from "@/components/brand";
import { Glyph, HdIcon, MacWindow } from "@/components/mac-window";
import { Reveal } from "@/components/reveal";
import { StaysLightChrome } from "@/components/land/funnel/chrome";
import { MacDesktopShell } from "@/components/land/funnel/oos-ui";

const LAND = "stays-light";
const files = site.desks[0].files.slice(0, 6);

export function PresenceStep() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  function mount(next: boolean) {
    setMounted(next);
    track(site.analytics.events.landCta, {
      land: LAND,
      cta: next ? "Mount presence" : "Unmount presence",
      funnel: STAYS_LIGHT_FUNNEL,
      step: "presence",
    });
  }

  return (
    <StaysLightChrome stepId="presence">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <p className="font-sans text-[0.72rem] font-medium tracking-[0.28em] text-[#0e6b56] uppercase">
            On the Mac
          </p>
          <h1 className="mt-5 max-w-[12ch] font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            It simply shows up.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-[#3c4654] sm:text-lg">
            Under Locations. Beside Macintosh HD. One click, and the drive is there. The heavy files stay in the
            cloud. The laptop stays itself.
          </p>
          <button
            type="button"
            onClick={() => mount(!mounted)}
            className="mt-10 inline-flex h-12 items-center bg-[#0e1320] px-6 text-[14px] tracking-[0.04em] text-[#f5f6f8]"
          >
            {mounted ? "Remove from this Mac" : "One click: show Family"}
          </button>
        </Reveal>

        <Reveal delay={0.08}>
          <MacDesktopShell menu={mounted ? "Cove" : "Finder"}>
            <MacWindow title={mounted ? "Family" : "Macintosh HD"} className="shadow-none">
              <div className="grid min-h-[300px] sm:grid-cols-[160px_minmax(0,1fr)]">
                <aside className="border-b border-black/8 bg-[#ececec] px-2 py-2 text-[13px] sm:border-r sm:border-b-0">
                  <p className="px-2 pt-1 pb-1 text-[11px] font-semibold tracking-wide text-[#6e6e73]">Locations</p>
                  <div
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
                      mounted ? "" : "bg-[#0a84ff] text-white"
                    }`}
                  >
                    <HdIcon />
                    Macintosh HD
                  </div>
                  <AnimatePresence mode="wait">
                    {mounted ? (
                      <motion.div
                        key="cove"
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.35 }}
                        className="mt-0.5 flex items-center gap-2 rounded-md bg-[#0a84ff] px-2 py-1.5 text-white"
                      >
                        <CoveMark className="size-[21px] shrink-0 text-white" />
                        <span className="truncate">Family</span>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="cta"
                        type="button"
                        onClick={() => mount(true)}
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 w-full rounded-md bg-[#0e6b56] px-3 py-2.5 text-left text-[13px] font-medium text-white"
                      >
                        One click: show Family
                      </motion.button>
                    )}
                  </AnimatePresence>
                </aside>
                <div className="bg-[#f6f6f6] p-4">
                  <AnimatePresence mode="wait">
                    {mounted ? (
                      <motion.div
                        key="files"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <p className="mb-3 text-[12px] text-[#6e6e73]">Cloud drive · on this Mac</p>
                        <div className="grid grid-cols-3 gap-3">
                          {files.map((file, index) => (
                            <motion.div
                              key={file.name}
                              className="flex flex-col items-center gap-1.5 text-center"
                              initial={reduce ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Glyph kind={file.kind} name={file.name} variant={index % 3} className="size-12" />
                              <span className="line-clamp-2 text-[11px] leading-tight">{file.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        className="grid min-h-[220px] place-items-center text-center"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div>
                          <p className="font-serif text-2xl tracking-[-0.03em]">Nothing else plugged in.</p>
                          <p className="mt-2 max-w-[14rem] text-[13px] text-[#6e6e73]">
                            Until you show the drive.
                          </p>
                          <button
                            type="button"
                            onClick={() => mount(true)}
                            className="mt-5 inline-flex h-10 items-center rounded-md bg-[#0e6b56] px-4 text-[13px] font-medium text-white"
                          >
                            Show Family
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </MacWindow>
          </MacDesktopShell>
        </Reveal>
      </div>
    </StaysLightChrome>
  );
}
