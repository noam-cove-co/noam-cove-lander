"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { withUtm } from "@/lib/attribution";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CoveMark, NoamSeal, Wordmark } from "@/components/brand";
import { DemoStage } from "@/components/demo-stage";
import { Glyph, HdIcon, MacWindow } from "@/components/mac-window";
import { Reveal } from "@/components/reveal";

const LAND = "out-of-space";

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

const cases = [
  {
    persona: "At home",
    headline: "Dads keep the family films here.",
    body: "Not in a drawer. Not on a full laptop. On a drive that simply shows up under Locations.",
    volume: "Family",
    files: site.desks.find((d) => d.id === "home")?.files.slice(0, 4) ?? [],
  },
  {
    persona: "Marketing",
    headline: "The campaign on one drive the whole desk can open.",
    body: "Briefs, selects, the cut, the masters. Same folders on every Mac. No more which-drive emails.",
    volume: "Spring campaign",
    files: site.desks.find((d) => d.id === "marketing")?.files.slice(0, 4) ?? [],
  },
  {
    persona: "Studio",
    headline: "Sessions and rushes. Still just a drive.",
    body: "Logic, Premiere, Capture One open the work as if it were plugged in. The heavy files stay in the cloud.",
    volume: "Studio",
    files: site.desks.find((d) => d.id === "studio")?.files.slice(0, 4) ?? [],
  },
  {
    persona: "Agents",
    headline: "The repo lives on the drive. So does the agent.",
    body: "Point the copilot at Cove. The project has a home that is not the system disk.",
    volume: "florist-shop",
    files: site.desks.find((d) => d.id === "agents")?.files.slice(0, 4) ?? [],
  },
];

function TryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: label, href })}
      className="try-mac-frame inline-flex w-fit"
      style={{ animation: "none" }}
    >
      <span
        className="try-mac inline-flex h-12 items-center px-6 text-[15px] font-medium whitespace-nowrap"
        style={{ animation: "none" }}
      >
        {label}
      </span>
    </a>
  );
}

function StorageMeter({ used = 0.94, label = "Nearly full" }: { used?: number; label?: string }) {
  const pct = Math.round(used * 100);
  return (
    <div className="rounded-[12px] bg-white/95 p-5 shadow-[0_22px_50px_-32px_rgba(14,19,32,0.45)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between text-sm text-[#6e6e73]">
        <span className="inline-flex items-center gap-2 font-medium text-[#1d1d1f]">
          <HdIcon />
          Macintosh HD
        </span>
        <span className="font-marker text-xl text-[#ff9f0a]">{label}</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e5e5ea]">
        <motion.div
          className="h-full rounded-full bg-[#ff9f0a]"
          initial={{ width: "0%" }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-2 text-sm text-[#6e6e73]">244 GB of 256 GB used</p>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-black/8 pt-3 text-[11px]">
        <div>
          <div className="mb-1 h-1.5 rounded-full bg-[#5ac8fa]" />
          <p className="text-[#6e6e73]">System</p>
          <p className="font-medium text-[#1d1d1f]">38 GB</p>
        </div>
        <div>
          <div className="mb-1 h-1.5 rounded-full bg-[#af52de]" />
          <p className="text-[#6e6e73]">Apps</p>
          <p className="font-medium text-[#1d1d1f]">52 GB</p>
        </div>
        <div>
          <div className="mb-1 h-1.5 rounded-full bg-[#ff9f0a]" />
          <p className="text-[#6e6e73]">Documents</p>
          <p className="font-medium text-[#1d1d1f]">154 GB</p>
        </div>
      </div>
    </div>
  );
}

function MacDesktopShell({ children, menu = "Finder" }: { children: React.ReactNode; menu?: string }) {
  return (
    <div
      className="overflow-hidden rounded-[14px] shadow-[0_28px_70px_-36px_rgba(14,19,32,0.55)] ring-1 ring-black/12"
      style={{
        background:
          "radial-gradient(80% 70% at 85% 110%, rgba(14,107,86,0.38), transparent 55%), linear-gradient(165deg, #9eb0c4 0%, #d8d0c4 46%, #a8bdb4 100%)",
      }}
    >
      <div className="flex h-8 items-center gap-3 px-3 text-[11px] text-[#1d1d1f]/85 backdrop-blur-sm">
        <CoveMark className="size-3.5 opacity-80" />
        <span className="font-semibold">{menu}</span>
        <span className="hidden sm:inline">File</span>
        <span className="hidden sm:inline">Edit</span>
        <span className="hidden sm:inline">View</span>
        <span className="ml-auto tabular-nums">Mon 9:41</span>
      </div>
      <div className="px-3 pt-2 pb-4 sm:px-5 sm:pb-5">{children}</div>
    </div>
  );
}

function StorageSettingsPanel() {
  return (
    <MacWindow title="Storage" className="max-w-lg" bodyClassName="bg-[#ececec]">
      <div className="grid gap-0 sm:grid-cols-[160px_minmax(0,1fr)]">
        <aside className="hidden border-r border-black/8 bg-[#e8e8e8] p-3 text-[12px] sm:block">
          <p className="px-2 pb-2 text-[10px] font-semibold tracking-wide text-[#6e6e73] uppercase">System Settings</p>
          {["Wi‑Fi", "Bluetooth", "Displays", "Sound", "Storage"].map((item) => (
            <div
              key={item}
              className={`rounded-md px-2 py-1.5 ${item === "Storage" ? "bg-[#0a84ff] text-white" : "text-[#1d1d1f]/80"}`}
            >
              {item}
            </div>
          ))}
        </aside>
        <div className="bg-[#f6f6f6] p-4 sm:p-5">
          <p className="text-[11px] font-semibold tracking-wide text-[#6e6e73] uppercase">Macintosh HD</p>
          <h3 className="mt-1 font-serif text-2xl tracking-[-0.03em]">256 GB Flash Storage</h3>
          <div className="mt-4 flex items-end gap-4">
            <div
              className="relative size-28 shrink-0 rounded-full"
              style={{
                background:
                  "conic-gradient(#5ac8fa 0 15%, #af52de 15% 35%, #ff9f0a 35% 94%, #e5e5ea 94% 100%)",
              }}
              aria-hidden
            >
              <div className="absolute inset-[18%] grid place-items-center rounded-full bg-[#f6f6f6] text-center">
                <span>
                  <span className="block text-lg font-semibold tabular-nums">11 GB</span>
                  <span className="text-[10px] text-[#6e6e73]">available</span>
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2 text-[12px]">
              <p className="font-marker rotate-[-3deg] text-xl text-[#ff9f0a]">Sound familiar?</p>
              <p className="leading-snug text-[#3c4654]">
                Recommendations: empty Trash, remove large attachments, buy more cloud you will never open in Finder.
              </p>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg bg-white ring-1 ring-black/8">
            {[
              { name: "System Data", size: "38 GB", tone: "#5ac8fa" },
              { name: "Applications", size: "52 GB", tone: "#af52de" },
              { name: "Documents", size: "154 GB", tone: "#ff9f0a" },
              { name: "Available", size: "11 GB", tone: "#e5e5ea" },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between border-b border-black/6 px-3 py-2 last:border-0">
                <span className="inline-flex items-center gap-2">
                  <i className="size-2.5 rounded-full" style={{ background: row.tone }} />
                  {row.name}
                </span>
                <span className="tabular-nums text-[#6e6e73]">{row.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

function CoveFinderPreview({
  mounted,
  onMount,
}: {
  mounted: boolean;
  onMount: () => void;
}) {
  const files = site.desks[0].files.slice(0, 6);
  return (
    <MacDesktopShell menu={mounted ? "Cove" : "Finder"}>
      <MacWindow title={mounted ? "Family" : "Macintosh HD"} className="shadow-none">
        <div className="grid min-h-[280px] sm:grid-cols-[168px_minmax(0,1fr)]">
          <aside className="border-b border-black/8 bg-[#ececec] px-2 py-2 text-[13px] sm:border-r sm:border-b-0">
            <p className="px-2 pt-1 pb-1 text-[11px] font-semibold tracking-wide text-[#6e6e73]">Locations</p>
            <div className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${mounted ? "" : "bg-[#0a84ff] text-white"}`}>
              <HdIcon />
              Macintosh HD
            </div>
            {mounted ? (
              <div className="mt-0.5 flex items-center gap-2 rounded-md bg-[#0a84ff] px-2 py-1.5 text-white">
                <CoveMark className="size-[21px] shrink-0 text-white" />
                <span className="truncate">Family</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onMount}
                className="mt-2 w-full rounded-md bg-[#0e6b56] px-3 py-2.5 text-left text-[13px] font-medium text-white"
              >
                One click: show Family
              </button>
            )}
            <p className="mt-3 px-2 text-[11px] font-semibold tracking-wide text-[#6e6e73]">Favourites</p>
            <div className="px-2 py-1 text-[#1d1d1f]/70">Desktop</div>
            <div className="px-2 py-1 text-[#1d1d1f]/70">Downloads</div>
          </aside>
          <div className="bg-[#f6f6f6] p-4">
            {mounted ? (
              <>
                <div className="mb-3 flex items-center justify-between gap-3 text-[12px] text-[#6e6e73]">
                  <span>Cloud drive · on this Mac</span>
                  <span className="font-marker shrink-0 text-lg text-cove">zero KB until you open</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {files.map((file, index) => (
                    <div key={file.name} className="flex flex-col items-center gap-1.5 text-center">
                      <Glyph kind={file.kind} name={file.name} variant={index % 3} className="size-12" />
                      <span className="line-clamp-2 text-[11px] leading-tight">{file.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid h-full min-h-[220px] place-items-center text-center">
                <div>
                  <p className="font-serif text-2xl tracking-[-0.03em]">11 GB free</p>
                  <p className="mt-2 max-w-[16rem] text-[13px] leading-relaxed text-[#6e6e73]">
                    The work is waiting. The disk is not.
                  </p>
                  <button
                    type="button"
                    onClick={onMount}
                    className="mt-4 inline-flex h-10 items-center rounded-md bg-[#0e6b56] px-4 text-[13px] font-medium text-white"
                  >
                    Show Family on this Mac
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-black/10 px-3 py-2 text-[11px] text-[#6e6e73]">
          <span>{mounted ? "Cove · your own cloud drive" : "About This Mac · Storage"}</span>
          <span>{mounted ? "186 items" : "244 GB used"}</span>
        </div>
      </MacWindow>
    </MacDesktopShell>
  );
}

function CaseStudyCard({
  item,
}: {
  item: (typeof cases)[number];
}) {
  return (
    <article className="group relative overflow-hidden rounded-[16px] bg-[#f3f1ea] ring-1 ring-foreground/10">
      <div className="border-b border-foreground/8 px-5 py-4 sm:px-6">
        <p className="text-[0.68rem] font-medium tracking-[0.2em] text-cove uppercase">{item.persona}</p>
        <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{item.headline}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{item.body}</p>
      </div>
      <div className="bg-[#e8e6de] px-4 py-4 sm:px-5">
        <MacWindow title={item.volume} className="shadow-[0_16px_40px_-28px_rgba(14,19,32,0.4)]">
          <div className="flex items-center gap-2 border-b border-black/8 bg-[#ececec] px-3 py-2 text-[12px]">
            <CoveMark className="size-4 text-cove" />
            <span className="font-medium">{item.volume}</span>
            <span className="ml-auto text-[#6e6e73]">On this Mac</span>
          </div>
          <div className="grid grid-cols-4 gap-2 p-3">
            {item.files.map((file, index) => (
              <div key={file.name} className="flex flex-col items-center gap-1 text-center">
                <Glyph kind={file.kind} name={file.name} variant={index % 3} className="size-10" />
                <span className="line-clamp-2 text-[10px] leading-tight text-[#3c4654]">{file.name}</span>
              </div>
            ))}
          </div>
        </MacWindow>
      </div>
    </article>
  );
}

function EmailCase() {
  const note = site.reviews.featured;
  return (
    <div>
      <p className="font-marker inline-block -rotate-2 text-[2.05rem] leading-none font-medium text-[#d01212] sm:text-[2.35rem]">
        {site.reviews.annotation}
      </p>
      <article className="mt-4 overflow-hidden bg-white shadow-[0_22px_50px_-32px_rgba(14,19,32,0.45)] ring-1 ring-black/10">
        <div className="flex h-11 items-center justify-between border-b border-black/8 px-4 text-[15px]">
          <span className="text-[#007aff]">‹ Inbox</span>
          <span className="text-[13px] text-[#6e6e73]">Today</span>
        </div>
        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <h3 className="text-[1.35rem] leading-snug font-semibold tracking-tight sm:text-[1.6rem]">{note.subject}</h3>
          <div className="mt-5 flex items-center gap-3 border-b border-black/8 pb-5">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#8e8e93] text-sm font-medium text-white">
              {note.initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold">{note.from}</p>
              <p className="text-[13px] text-[#6e6e73]">
                To {note.to}
                <span className="px-1.5 text-[#aeaeb2]">·</span>
                {note.role}
              </p>
            </div>
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-[17px] leading-relaxed">
            {note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <div className="mt-8 flex items-start gap-3">
        <NoamSeal className="mt-0.5 size-7 shrink-0 text-muted-foreground" />
        <p className="max-w-xl text-muted-foreground">{note.aside}</p>
      </div>
    </div>
  );
}

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
    <section ref={ref} className="relative overflow-hidden px-4 pt-10 pb-20 sm:px-6 sm:pt-16 sm:pb-28">
      <motion.div style={{ opacity: fade }} className="mx-auto max-w-6xl">
        <motion.p
          style={{ y: scribbleY }}
          className="font-marker rotate-[-4deg] text-3xl text-cove sm:text-4xl"
        >
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TryCta href={withUtm("/demo")} label="Try on this Mac" />
              <Link
                href={withUtm("/land/join-the-list")}
                onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Get more room" })}
                className="inline-flex h-12 items-center justify-center rounded-md border border-foreground/15 bg-white/80 px-5 text-[15px]"
              >
                Get more room
              </Link>
            </div>
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
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden border-y border-foreground/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
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

function MountReveal() {
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
    });
  }

  // Reveal Cove as the sticky Finder settles into view, so the journey
  // still lands even if a control below the fold is missed.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    if (value > 0.08) mount(true);
  });

  return (
    <section className="hero-wash border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24">
        <Reveal>
          <p className="font-marker rotate-[-3deg] text-3xl text-cove">Then this</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Your own cloud drive, on your Mac.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            One click. Cove shows up under Locations. The heavy files stay in the cloud. The Mac stays light.
          </p>
        </Reveal>
      </div>
      <div ref={stageRef}>
        <DemoStage length={0.85}>
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
            <TryCta href={withUtm("/land/own-drive")} label="See the drive" />
          </div>
        </DemoStage>
      </div>
    </section>
  );
}

export function OutOfSpaceView() {
  return (
    <div className="min-h-svh bg-[#f3f1ea] text-foreground">
      <AttributionBeacon land={LAND} />
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-[#f3f1ea]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
            <CoveMark className="size-9" />
            <span className="inline-flex items-center gap-1.5">
              <Wordmark className="text-[1.45rem]" />
              <span className="translate-y-[0.35em] font-sans text-[0.55rem] font-medium tracking-[0.14em] text-cove">
                BETA
              </span>
            </span>
          </Link>
          <Link
            href={withUtm("/land/join-the-list")}
            onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join the list" })}
            className="text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            Join the list →
          </Link>
        </div>
      </header>

      <HeroScene />
      <PainJourney />
      <MountReveal />

      <section className="border-t border-foreground/10 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">On the desks</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
              Same product. Different libraries.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Cove does not become a different app for each desk. It is still a drive that shows up on the Mac.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {cases.map((item, i) => (
              <Reveal key={item.persona} delay={i * 0.04}>
                <CaseStudyCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-[#f3f1ea]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">{site.reviews.kicker}</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">{site.reviews.title}</h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-10">
            <EmailCase />
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {site.reviews.quotes.slice(0, 4).map((quote) => (
              <Reveal key={quote.name}>
                <figure>
                  <blockquote className="font-serif text-xl leading-snug tracking-[-0.03em] sm:text-2xl">
                    “{quote.quote.replace(/\*/g, "")}”
                  </blockquote>
                  <figcaption className="mt-4">
                    <p className="font-serif text-lg tracking-tight">{quote.name}</p>
                    <p className="mt-0.5 text-[0.78rem] tracking-[0.04em] text-muted-foreground">{quote.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-[#0e1320] text-[#f5f6f8]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="font-marker text-3xl text-[#3dcea0]">Enough room?</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Join the private beta.</h2>
            <p className="mt-3 max-w-md text-base text-[#f5f6f8]/70">
              Your own cloud drive, on your Mac. Crafted by NOAM Co. in Yorkshire.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={withUtm("/land/join-the-list")}
              onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join footer" })}
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#3dcea0] px-6 text-[15px] font-medium text-[#061018]"
            >
              Join the list
            </Link>
            <Link
              href={withUtm("/land/look-familiar")}
              onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Print ads" })}
              className="inline-flex h-12 items-center justify-center text-sm text-[#f5f6f8]/75 hover:text-[#f5f6f8]"
            >
              Classic print ads →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
