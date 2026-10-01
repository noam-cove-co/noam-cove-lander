"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CoveMark, Wordmark } from "@/components/brand";
import { LandWaitlist } from "@/components/land/land-waitlist";
import { track } from "@/lib/analytics";
import { site } from "@/config/site";

const LAND = "shows-up";
const CAMPAIGN = "shows-up";

function FinderStage() {
  return (
    <div
      className="relative h-full min-h-[320px] w-full overflow-hidden sm:min-h-[420px] lg:min-h-0"
      style={{
        background:
          "radial-gradient(80% 70% at 85% 110%, rgba(14,107,86,0.42), transparent 55%), linear-gradient(165deg, #9eb0c4 0%, #d8d0c4 46%, #a8bdb4 100%)",
      }}
    >
      <div className="flex h-8 items-center gap-3 px-3 text-[11px] text-[#1d1d1f]/85">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Image src="/brand/cove-mark.png" alt="" width={12} height={12} className="rounded-[3px]" />
          Cove
        </span>
        <span className="opacity-70">File</span>
        <span className="opacity-70">Edit</span>
        <span className="ml-auto tabular-nums opacity-80">Mon 9:41</span>
      </div>
      <div className="px-3 pb-4 pt-1 sm:px-4">
        <div className="overflow-hidden rounded-[10px] bg-[#f6f6f6] text-[#1d1d1f] shadow-[0_18px_48px_-22px_rgba(0,0,0,0.55)] ring-1 ring-black/12">
          <div className="flex h-9 items-center gap-2 border-b border-black/10 bg-white/70 px-3">
            <span className="flex gap-1.5" aria-hidden>
              <i className="block size-2.5 rounded-full bg-[#ff5f57]" />
              <i className="block size-2.5 rounded-full bg-[#febc2e]" />
              <i className="block size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold">
              <Image src="/brand/cove-mark.png" alt="" width={14} height={14} className="rounded-[3px]" />
              Cove
            </p>
          </div>
          <div className="grid min-h-[240px] grid-cols-[7.5rem_1fr] sm:min-h-[280px] sm:grid-cols-[9rem_1fr]">
            <aside className="border-r border-black/8 bg-[#ececee] px-2 py-3 text-[11px]">
              <p className="px-1.5 pb-2 text-[9px] font-semibold tracking-[0.08em] text-[#8e8e93] uppercase">
                Locations
              </p>
              <div className="mb-1 flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[#1d1d1f]/70">
                <span
                  className="size-3 rounded-[3px]"
                  style={{ background: "linear-gradient(180deg,#c8ccd2,#8e949e)" }}
                />
                Macintosh HD
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-[#0a84ff] px-1.5 py-1.5 font-semibold text-white">
                <Image src="/brand/cove-mark.png" alt="" width={12} height={12} className="rounded-[3px]" />
                Cove
              </div>
            </aside>
            <div className="grid grid-cols-3 content-start gap-3 px-3 py-4 sm:gap-4 sm:px-4">
              {[
                ["Family album", "In cloud"],
                ["Campaign kit", "In cloud"],
                ["Cut_04", "In cloud"],
              ].map(([name, tag]) => (
                <div key={name} className="flex flex-col items-center gap-1 text-center">
                  <span
                    className="relative h-9 w-11 rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:h-10 sm:w-12"
                    style={{
                      background: "linear-gradient(180deg,#7eb6ff 0%,#3b82f6 45%,#2563eb 100%)",
                    }}
                  >
                    <span
                      className="absolute -top-1 left-1 h-1.5 w-4 rounded-t-[3px]"
                      style={{ background: "linear-gradient(180deg,#9ec9ff,#6aa8f5)" }}
                    />
                  </span>
                  <span className="max-w-[9ch] text-[10px] font-medium leading-tight">{name}</span>
                  <span className="text-[8px] font-semibold tracking-[0.08em] text-cove uppercase">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShowsUpView() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-svh bg-paper text-foreground">
      <AttributionBeacon land={LAND} />

      <header className="relative z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
            <CoveMark className="size-9" priority />
            <span className="inline-flex items-center gap-1.5">
              <Wordmark className="text-[1.45rem]" />
              <span className="translate-y-[0.35em] font-sans text-[0.55rem] font-medium tracking-[0.14em] text-cove">
                BETA
              </span>
            </span>
          </Link>
          <a
            href="#list"
            onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join the list nav" })}
            className="text-sm font-medium text-foreground/75 hover:text-foreground"
          >
            Join the list
          </a>
        </div>
      </header>

      {/* One composition hero: brand, headline, support, CTA, full-bleed Finder plane */}
      <section className="relative overflow-hidden border-b border-foreground/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 12% 0%, rgba(14,107,86,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 95% 100%, rgba(14,19,32,0.05), transparent 50%), #f5f6f8",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
          <div className="flex flex-col justify-center px-4 pt-8 pb-10 sm:px-6 sm:pt-14 sm:pb-16 lg:py-20">
            <motion.p
              className="font-sans text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Private beta · Mac
            </motion.p>
            <motion.h1
              className="mt-4 max-w-[12ch] font-serif text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.98] tracking-[-0.04em] text-balance"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              The Mac that <em className="font-serif text-cove not-italic">stays light</em>.
            </motion.h1>
            <motion.p
              className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A cloud drive on your Mac. One click, and it shows up in Finder under Locations, beside
              Macintosh HD.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32 }}
            >
              <a
                href="#list"
                onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join the private beta" })}
                className="try-mac-frame inline-flex w-fit"
                style={{ animation: "none" }}
              >
                <span
                  className="try-mac inline-flex h-12 items-center px-6 text-[15px] font-medium whitespace-nowrap"
                  style={{ animation: "none" }}
                >
                  Join the private beta
                </span>
              </a>
              <p className="text-sm text-muted-foreground">Seats open from the list. We write when one opens.</p>
            </motion.div>
          </div>

          <motion.div
            className="relative min-h-[340px] lg:min-h-[560px]"
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-0">
              <FinderStage />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-sans text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">How it shows up</p>
        <h2 className="mt-3 max-w-[18ch] font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
          Not another browser tab. A drive.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Campaign masters, Premiere projects, family film: they stay in the cloud. The laptop does not
          carry them. That is the whole product.
        </p>
      </section>

      <section id="list" className="border-t border-foreground/10 bg-[#0e1320] text-[#f5f6f8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="font-sans text-[0.72rem] font-medium tracking-[0.22em] text-[#3dcea0] uppercase">
              Waitlist
            </p>
            <h2 className="mt-3 max-w-[14ch] font-serif text-4xl tracking-[-0.035em]">
              Your own cloud drive. Reserved.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
              Private beta for Mac. Join the list. Invite someone and climb. Marketing teams are among the
              first seats.
            </p>
          </div>
          <LandWaitlist source="land-shows-up" land={LAND} campaign={CAMPAIGN} dark />
        </div>
      </section>

      <footer className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:px-6">
          <span>getcove.cloud</span>
          <span>
            linkedin.com/company/<strong className="font-medium text-foreground">getcove</strong>
          </span>
        </div>
      </footer>
    </div>
  );
}
