"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Glyph, MacWindow } from "@/components/mac-window";
import { Kicker } from "@/components/section";
import { cn } from "cn";

const sticks = [
  { id: "holiday", label: "Holiday videos", place: "In a bag" },
  { id: "client", label: "Client files", place: "On somebody else’s desk" },
  { id: "christmas", label: "The Christmas film", place: "Kitchen drawer" },
];

const loads = [
  { id: "films", label: "Family films", gb: 140 },
  { id: "campaign", label: "A campaign", gb: 80 },
  { id: "project", label: "A project", gb: 50 },
];

const SYSTEM_GB = 46;
const DISK_GB = 256;

export function ProblemPlays() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Kicker>{site.problem.kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-6xl">
        {site.problem.title}
      </h2>
      <div className="mt-12 grid gap-y-16 lg:grid-cols-3 lg:gap-x-8">
        <Play title={site.problem.items[0].title} body={site.problem.items[0].body}>
          <DrawerPlay />
        </Play>
        <Play title={site.problem.items[1].title} body={site.problem.items[1].body}>
          <LinkPlay />
        </Play>
        <Play title={site.problem.items[2].title} body={site.problem.items[2].body}>
          <DiskPlay />
        </Play>
      </div>
    </section>
  );
}

function Play({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="font-serif text-3xl tracking-[-0.03em]">{title}</h3>
      <p className="mt-2 max-w-sm text-base leading-relaxed text-muted-foreground">{body}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function DrawerPlay() {
  const reduce = useReducedMotion();
  const [held, setHeld] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [hint, setHint] = useState("");
  const loose = sticks.filter((stick) => !saved.includes(stick.id));
  const done = saved.length === sticks.length;

  function toggle(id: string) {
    setHint("");
    setHeld((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function collect() {
    if (!held.length) {
      setHint("Pick up a drive first.");
      return;
    }
    setSaved((current) => [...current, ...held]);
    setHeld([]);
    setHint("");
  }

  return (
    <MacWindow title={done ? "Family" : "External drives"}>
      <div className="flex min-h-36 flex-wrap items-end justify-center gap-3 px-3 py-4">
        <AnimatePresence>
          {loose.map((stick) => {
            const up = held.includes(stick.id);
            return (
              <motion.button
                key={stick.id}
                type="button"
                onClick={() => toggle(stick.id)}
                aria-pressed={up}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: up ? -8 : 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 16 }}
                className="flex w-[5.6rem] flex-col items-center gap-1 text-center"
              >
                <StickGraphic lifted={up} />
                <span className="text-[12px] leading-tight font-medium">{stick.label}</span>
                <span className="text-[10px] leading-tight text-[#6e6e73]">{up ? "In hand" : stick.place}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
        {done ? (
          <p className="px-2 py-6 text-center text-[13px] text-[#3a3a3c]">One drive. The drawer can stay shut.</p>
        ) : null}
      </div>
      {saved.length && !done ? (
        <ul className="border-t border-black/10">
          {sticks
            .filter((stick) => saved.includes(stick.id))
            .map((stick) => (
              <li key={stick.id} className="flex items-center gap-2 px-3 py-1.5 text-[12px]">
                <CoveMark className="size-4 text-cove" />
                {stick.label}
                <span className="ml-auto text-[#6e6e73]">On Cove</span>
              </li>
            ))}
        </ul>
      ) : null}
      <div className="border-t border-black/10 px-3 py-2.5">
        {done ? (
          <button
            type="button"
            onClick={() => {
              setSaved([]);
              setHeld([]);
              setHint("");
            }}
            className="text-[13px] text-[#0e6b56]"
          >
            Scatter them again
          </button>
        ) : (
          <button type="button" onClick={collect} className="flex w-full items-center gap-2 text-left text-[13px]">
            <CoveMark className="size-[23px] shrink-0 text-cove" />
            <span>
              <span className="block font-medium">Give them one drive</span>
              <span className="block text-[11px] text-[#6e6e73]">
                {hint || `${saved.length} of ${sticks.length} on Cove`}
              </span>
            </span>
          </button>
        )}
      </div>
    </MacWindow>
  );
}

function StickGraphic({ lifted }: { lifted: boolean }) {
  return (
    <svg viewBox="0 0 48 64" className="h-14 w-10" aria-hidden>
      <rect x="14" y="2" width="20" height="10" rx="1.5" fill={lifted ? "#0e6b56" : "#c5c9d1"} />
      <rect x="17" y="5" width="4" height="4" rx="0.6" fill="#f6f6f6" />
      <rect x="27" y="5" width="4" height="4" rx="0.6" fill="#f6f6f6" />
      <rect x="8" y="11" width="32" height="48" rx="5" fill={lifted ? "#e7f3ee" : "#f7f7f8"} stroke="#8d939e" />
      <circle cx="24" cy="40" r="5" fill="none" stroke="#0e6b56" strokeWidth="1.4" />
    </svg>
  );
}

function LinkPlay() {
  const [note, setNote] = useState("");
  const [friday, setFriday] = useState(false);
  const [masters, setMasters] = useState(false);
  const written = note.trim().length > 0;
  const edge = site.problem.items[1];

  return (
    <div>
      <ol className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-wide text-[#6e6e73] uppercase">
        <li className={cn(!friday && !masters && "text-cove")}>Sent</li>
        <li aria-hidden>·</li>
        <li className={cn(written && !friday && !masters && "text-cove")}>Notes</li>
        <li aria-hidden>·</li>
        <li className={cn(friday && !masters && "text-[#ff3b30]")}>Friday</li>
        <li aria-hidden>·</li>
        <li className={cn(masters && "text-cove")}>On Cove</li>
      </ol>
      <div className="relative pb-16 sm:pb-8">
        <MacWindow title={masters ? "masters" : "review.link"}>
          <div className="px-3 py-2">
            <p
              className={cn(
                "truncate rounded-md bg-white px-2 py-1 font-mono text-[11px] ring-1 ring-black/10",
                friday && !masters && "text-[#ff3b30] line-through",
              )}
            >
              {masters ? "/Volumes/Spring campaign/masters" : "https://review.link/spring-cut"}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#6e6e73]">
              {masters ? "Same cut. On the drive. Friday cannot take it." : "Live review for the spring cut."}
            </p>
          </div>
          <div className="px-3 pb-3">
            <p className={cn("text-[12px] font-medium", friday && !masters ? "text-[#ff3b30]" : "text-[#0e6b56]")}>
              {masters ? "On the drive" : friday ? "This link died on Friday." : "Live until Friday, 16:12"}
            </p>
            <label className="mt-3 block text-[11px] text-[#6e6e73]" htmlFor="review-notes">
              Notes
            </label>
            <textarea
              id="review-notes"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              placeholder="Still being written."
              className="mt-1 w-full resize-none bg-transparent text-[13px] leading-relaxed outline-none placeholder:text-[#a1a1a6]"
            />
            {friday && !masters ? (
              <p className="text-[12px] leading-relaxed text-[#3a3a3c]">
                {written
                  ? "The notes are still here. The cut is not. Ask for another link, or open the masters on Cove."
                  : "It went before the notes were written. The client still has questions."}
              </p>
            ) : null}
            {masters ? (
              <div className="mt-2 flex items-center gap-2 border-t border-black/10 pt-2">
                <Glyph kind="folder" className="size-8" />
                <span className="text-[13px]">
                  Masters
                  <span className="mt-0.5 block text-[11px] text-[#6e6e73]">Friday cannot take them.</span>
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between border-t border-black/10 px-3 py-2.5">
            {masters ? (
              <button
                type="button"
                onClick={() => {
                  setFriday(false);
                  setMasters(false);
                }}
                className="text-[13px] text-[#0e6b56]"
              >
                Send the link again
              </button>
            ) : friday ? (
              <button type="button" onClick={() => setMasters(true)} className="text-[13px] font-medium text-[#0e6b56]">
                Open the masters
              </button>
            ) : (
              <button type="button" onClick={() => setFriday(true)} className="text-[13px] font-medium text-[#1d1d1f]">
                Skip to Friday
              </button>
            )}
            <span className="text-[11px] text-[#6e6e73]">{written ? "Note kept" : "No note yet"}</span>
          </div>
        </MacWindow>
        {"note" in edge && typeof edge.note === "string" ? (
          <aside
            className={cn(
              "absolute right-0 -bottom-1 z-10 w-[min(100%,15.5rem)] -rotate-2 rounded-[2px] bg-[#fff4b8] px-3 py-2.5 shadow-[2px_3px_0_rgba(14,19,32,0.12),0_12px_28px_-18px_rgba(14,19,32,0.45)] ring-1 ring-black/5 transition-opacity duration-300 sm:-right-2 sm:bottom-5 sm:w-[14.5rem]",
              masters && "opacity-40",
            )}
          >
            <p className="font-marker text-[1.05rem] leading-snug text-[#3a2f12]">{edge.note}</p>
          </aside>
        ) : null}
      </div>
    </div>
  );
}

function DiskPlay() {
  const [onMac, setOnMac] = useState<string[]>([]);
  const [parked, setParked] = useState(false);
  const heavy = loads.filter((item) => onMac.includes(item.id)).reduce((sum, item) => sum + item.gb, 0);
  const used = parked ? SYSTEM_GB : SYSTEM_GB + heavy;
  const over = !parked && used > DISK_GB;
  const width = Math.min(100, (used / DISK_GB) * 100);

  function toggle(id: string) {
    if (parked) return;
    setOnMac((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <MacWindow title="Macintosh HD">
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-baseline justify-between text-[12px]">
          <span className="font-medium">{over ? "This Mac is full." : parked ? "Room again." : "256 GB disk"}</span>
          <span className="tabular-nums text-[#6e6e73]">
            {parked ? `${heavy} GB in the cloud` : over ? `${used - DISK_GB} GB over` : `${Math.max(0, DISK_GB - used)} GB left`}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e5e5ea]" aria-hidden>
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-500",
              parked || (!over && used <= 200) ? "bg-[#0e6b56]" : over ? "bg-[#ff3b30]" : "bg-[#ff9f0a]",
            )}
            style={{ width: `${width}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-[#6e6e73]">macOS and the rest hold {SYSTEM_GB} GB. The rest is the work.</p>
      </div>
      <ul>
        {loads.map((item) => {
          const on = onMac.includes(item.id);
          return (
            <li key={item.id} className="border-t border-black/10">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={on}
                disabled={parked}
                className={cn("flex w-full items-center justify-between px-3 py-2.5 text-left text-[13px]", on && !parked && "bg-[#e7f3ee]")}
              >
                <span>{item.label}</span>
                <span className="tabular-nums text-[#6e6e73]">
                  {parked && on ? "In the cloud" : on ? "On this Mac" : `${item.gb} GB`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-black/10 px-3 py-2.5">
        {parked ? (
          <button
            type="button"
            onClick={() => {
              setParked(false);
              setOnMac([]);
            }}
            className="text-[13px] text-[#0e6b56]"
          >
            Put the work back on the laptop
          </button>
        ) : (
          <button
            type="button"
            disabled={!onMac.length}
            onClick={() => setParked(true)}
            className="text-[13px] font-medium text-[#0e6b56] disabled:text-[#a1a1a6]"
          >
            {over ? "Move the heavy files to Cove" : "Move this work to Cove"}
          </button>
        )}
      </div>
    </MacWindow>
  );
}
