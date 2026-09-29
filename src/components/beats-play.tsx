"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Glyph, Locations, MacWindow } from "@/components/mac-window";
import { Kicker } from "@/components/section";
import { cn } from "cn";

const presets = [
  {
    name: "Family",
    files: [
      { name: "Summer holiday", meta: "1,204 photos", kind: "folder" },
      { name: "School play.mov", meta: "4.6 GB", kind: "film" },
      { name: "Favourites", meta: "40 photos", kind: "folder" },
    ],
  },
  {
    name: "Spring campaign",
    files: [
      { name: "Brief", meta: "2.4 MB", kind: "doc" },
      { name: "The cut", meta: "186 MB", kind: "cut" },
      { name: "Masters", meta: "Ready", kind: "folder" },
    ],
  },
  {
    name: "florist-shop",
    files: [
      { name: "The repo", meta: "Repo", kind: "folder" },
      { name: "Notes", meta: "Today", kind: "doc" },
      { name: "Transcripts", meta: "12 MB", kind: "code" },
    ],
  },
];

export function BeatsPlay() {
  const [index, setIndex] = useState(0);
  const [preset, setPreset] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const drive = presets[preset];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Kicker>In plain words</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-6xl">
        A cloud drive that shows up on your Mac.
      </h2>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
        <div>
          {site.beats.map((beat, beatIndex) => {
            const active = beatIndex === index;
            return (
              <button
                key={beat.title}
                type="button"
                onClick={() => setIndex(beatIndex)}
                aria-pressed={active}
                className={cn(
                  "block w-full border-l-2 py-4 pl-4 text-left",
                  active ? "border-cove" : "border-foreground/15",
                )}
              >
                <span
                  className={cn(
                    "block font-serif text-3xl tracking-[-0.03em] sm:text-4xl",
                    active ? "text-foreground" : "text-foreground/40",
                  )}
                >
                  {beat.title}
                </span>
                <span className="mt-2 block max-w-md text-base leading-relaxed text-muted-foreground">{beat.body}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
          >
            {index === 0 ? (
              <NameStage name={drive.name} onPick={setPreset} active={preset} />
            ) : null}
            {index === 1 ? <CloudStage name={drive.name} files={drive.files} /> : null}
            {index === 2 ? (
              <MacStage name={drive.name} mounted={mounted} onShow={() => setMounted(true)} onHide={() => setMounted(false)} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function NameStage({
  name,
  active,
  onPick,
}: {
  name: string;
  active: number;
  onPick: (index: number) => void;
}) {
  return (
    <MacWindow title="Name your drive">
      <div className="grid justify-items-center px-4 py-8">
        <CoveMark className="size-[74px] text-cove" />
        <p className="mt-3 font-serif text-3xl tracking-[-0.03em]">{name}</p>
        <p className="mt-1 text-[12px] text-[#6e6e73]">Your cloud drive</p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-black/10 px-3 py-3" role="group" aria-label="Name the drive">
        {presets.map((item, itemIndex) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onPick(itemIndex)}
            aria-pressed={itemIndex === active}
            className={cn(
              "border-b-2 px-1 py-1 text-[13px]",
              itemIndex === active ? "border-[#0e6b56] text-[#1d1d1f]" : "border-transparent text-[#6e6e73]",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </MacWindow>
  );
}

function CloudStage({
  name,
  files,
}: {
  name: string;
  files: { name: string; meta: string; kind: string }[];
}) {
  return (
    <MacWindow title={`${name} · in the cloud`}>
      <div className="flex items-center gap-2 px-3 py-3 text-[13px]">
        <CloudGlyph />
        <span>Held for {name}</span>
        <span className="ml-auto text-[12px] text-[#6e6e73]">Not on this Mac</span>
      </div>
      <ul>
        {files.map((file, fileIndex) => (
          <li key={file.name} className="flex items-center gap-3 border-t border-black/10 px-3 py-2.5">
            <Glyph kind={file.kind} name={file.name} variant={fileIndex} className="size-8" />
            <span className="min-w-0 flex-1 truncate text-[13px]">{file.name}</span>
            <span className="shrink-0 text-[12px] tabular-nums text-[#6e6e73]">{file.meta}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-black/10 px-3 py-2.5 text-[12px] text-[#6e6e73]">
        The photos, films, and projects live here. The laptop does not have to hold them.
      </p>
    </MacWindow>
  );
}

function MacStage({
  name,
  mounted,
  onShow,
  onHide,
}: {
  name: string;
  mounted: boolean;
  onShow: () => void;
  onHide: () => void;
}) {
  return (
    <MacWindow title={mounted ? name : "Finder"}>
      <Locations volume={name} mounted={mounted} onShow={onShow} action={`One click: show ${name}`} />
      <div className="flex items-center justify-between border-t border-black/10 px-3 py-2.5 text-[12px] text-[#6e6e73]">
        <span>{mounted ? "Ready to open. Like a drive you plugged in." : "Beside Macintosh HD, once you click."}</span>
        {mounted ? (
          <button type="button" onClick={onHide} className="text-[#0e6b56]">
            Remove
          </button>
        ) : null}
      </div>
    </MacWindow>
  );
}

function CloudGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="size-5 text-[#0e6b56]" aria-hidden>
      <path
        d="M10.2 22.5h12.2a4.8 4.8 0 0 0 .3-9.6 6.6 6.6 0 0 0-12.6 1.7 4 4 0 0 0 .1 7.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
