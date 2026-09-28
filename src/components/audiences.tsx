"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Glyph, HdIcon, MacWindow } from "@/components/mac-window";
import { Kicker } from "@/components/section";
import { cn } from "cn";

type Desk = (typeof site.desks)[number];

const focusFor: Record<string, Record<string, string>> = {
  home: { Drive: "volume", "In the cloud": "cloud", Album: "Summer holiday" },
  marketing: { Mount: "volume", Campaign: "volume", Masters: "masters" },
  studio: { Selects: "selects", Session: "album-two", Cut: "hero-cut.prproj" },
  agents: { Mount: "volume", Repo: "florist", Agent: "transcript.json" },
};

export function Audiences() {
  const desks = site.desks;
  const [id, setId] = useState("marketing");
  const reduce = useReducedMotion();
  const desk = desks.find((item) => item.id === id) ?? desks[1];

  return (
    <section id={site.audiences.id} className="scroll-mt-24 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Kicker>{site.audiences.kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl">
        {site.audiences.title}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{site.audiences.intro}</p>

      <div className="mt-10 grid gap-8 border-t border-foreground/10 pt-8 sm:grid-cols-2">
        <Compare label="At home" text="Years of family photos and videos, open on the Mac, without filling it." />
        <Compare
          label="With an AI agent"
          text="The same cloud drive, mounted on the Mac, holding the repo and the agent’s notes."
        />
      </div>

      <div role="tablist" aria-label="Choose a desk" className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {desks.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === desk.id}
            onClick={() => setId(item.id)}
            className={cn(
              "shrink-0 border-b-2 px-1 py-2 text-sm",
              item.id === desk.id ? "border-cove text-foreground" : "border-transparent text-muted-foreground",
            )}
          >
            {item.label}
            {item.badge ? (
              <span className="ml-2 text-[10px] tracking-[0.14em] uppercase opacity-70">{item.badge}</span>
            ) : null}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={desk.id}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-8"
        >
          <DeskPanel desk={desk} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function DeskPanel({ desk }: { desk: Desk }) {
  const [word, setWord] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [opened, setOpened] = useState<string[]>([]);
  const focus = fileName;
  const selected = desk.files.find((item) => item.name === focus) ?? null;

  function chooseWord(next: string) {
    const target = focusFor[desk.id]?.[next] ?? null;
    setWord(next);
    setFileName(target);
    if (target && target !== "volume" && target !== "cloud") {
      setOpened((current) => (current.includes(target) ? current : [...current, target]));
    }
  }

  function chooseFile(name: string) {
    setWord(null);
    setFileName(name);
    setOpened((current) => (current.includes(name) ? current : [...current, name]));
  }

  function chooseVolume() {
    setWord((current) => (current && focusFor[desk.id]?.[current] === "volume" ? current : null));
    setFileName("volume");
  }

  function chooseCloud() {
    const match = desk.terms.find((term) => focusFor[desk.id]?.[term.word] === "cloud");
    setWord(match?.word ?? null);
    setFileName("cloud");
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <article>
        <p className="text-xs tracking-[0.18em] text-cove uppercase">In plain words, still</p>
        <h3 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">{desk.title}</h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{desk.body}</p>
        <p className="mt-6 max-w-xl font-serif text-2xl leading-snug italic">{desk.say}</p>
        <ul className="mt-8 grid gap-1 border-t border-foreground/10 pt-4">
          {desk.terms.map((term) => {
            const active = word === term.word;
            return (
              <li key={term.word}>
                <button
                  type="button"
                  onClick={() => chooseWord(term.word)}
                  aria-pressed={active}
                  className={cn("w-full border-l-2 py-3 pl-4 text-left", active ? "border-cove" : "border-transparent")}
                >
                  <span className="block font-serif text-xl">{term.word}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{term.means}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </article>

      <MacWindow title={desk.volume}>
          <div className="grid sm:grid-cols-[12.5rem_1fr]">
          <div className="border-b border-black/10 px-2 py-2 text-[13px] sm:border-r sm:border-b-0">
            <p className="px-2 pt-1 text-[11px] font-semibold text-[#6e6e73]">Locations</p>
            <div className="mt-1 flex items-center gap-2 px-2 py-1.5 text-[#6e6e73]">
              <HdIcon />
              Macintosh HD
            </div>
            <button
              type="button"
              onClick={chooseVolume}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left",
                focus === "volume" ? "bg-[#0a84ff] text-white" : "hover:bg-black/5",
              )}
            >
              <CoveMark className={cn("size-[18px] shrink-0", focus === "volume" ? "text-white" : "text-cove")} />
              <span className="min-w-0 leading-tight">{desk.volume}</span>
            </button>
          </div>
          <ul className="py-1">
            {desk.files.map((item, itemIndex) => {
              const on = focus === item.name;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => chooseFile(item.name)}
                    aria-pressed={on}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px]",
                      on ? "bg-[#0a84ff] text-white" : "hover:bg-black/5",
                    )}
                  >
                    <Glyph kind={item.kind} name={item.name} variant={itemIndex} className="size-5" />
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                    <span className={cn("shrink-0 text-[11px] tabular-nums", on ? "text-white/80" : "text-[#6e6e73]")}>
                      {item.meta}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {selected ? (
          <div className="flex items-center gap-3 border-t border-black/10 px-3 py-3">
            <Glyph kind={selected.kind} name={selected.name} className="size-10" />
            <p className="min-w-0 text-[13px]">
              <span className="block truncate font-medium">{selected.name}</span>
              <span className="block text-[11px] text-[#6e6e73]">From the cloud. Zero KB on this Mac.</span>
            </p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={chooseCloud}
          className={cn(
            "flex w-full items-center justify-between gap-3 border-t border-black/10 px-3 py-2.5 text-left text-[12px]",
            focus === "cloud" && "bg-[#e7f3ee]",
          )}
        >
          <span>
            {desk.cloudSize}
            <span className="mt-0.5 block text-[#6e6e73]">
              {opened.length
                ? `Opened ${opened.length}. Still almost nothing on this Mac.`
                : desk.onMac}
            </span>
          </span>
          <span className="shrink-0 text-[#6e6e73]">
            {opened.length ? `${opened.length} open` : focus ? "On the drive" : "Tap a word"}
          </span>
        </button>
      </MacWindow>
    </div>
  );
}

function Compare({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.18em] text-cove uppercase">{label}</p>
      <p className="mt-2 text-lg leading-relaxed">{text}</p>
    </div>
  );
}
