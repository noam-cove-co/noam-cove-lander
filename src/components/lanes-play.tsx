"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { Glyph, MacWindow } from "@/components/mac-window";
import { Kicker } from "@/components/section";
import { cn } from "cn";

const lanes = [
  {
    desk: site.workflow.lanes[0].desk,
    volume: "Family",
    items: [
      { name: site.workflow.lanes[0].items[0], meta: "1,204 photos", kind: "folder" },
      { name: site.workflow.lanes[0].items[1], meta: "4.6 GB", kind: "film" },
      { name: site.workflow.lanes[0].items[2], meta: "40 photos", kind: "folder" },
    ],
  },
  {
    desk: site.workflow.lanes[1].desk,
    volume: "Spring campaign",
    items: [
      { name: site.workflow.lanes[1].items[0], meta: "2.4 MB", kind: "doc" },
      { name: site.workflow.lanes[1].items[1], meta: "186 MB", kind: "cut" },
      { name: site.workflow.lanes[1].items[2], meta: "Ready", kind: "folder" },
    ],
  },
  {
    desk: site.workflow.lanes[2].desk,
    volume: "florist-shop",
    items: [
      { name: site.workflow.lanes[2].items[0], meta: "Repo", kind: "folder" },
      { name: site.workflow.lanes[2].items[1], meta: "Today", kind: "doc" },
      { name: site.workflow.lanes[2].items[2], meta: "12 MB", kind: "code" },
    ],
  },
];

export function LanesPlay({ className }: { className?: string }) {
  const [laneIndex, setLaneIndex] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const lane = lanes[laneIndex];
  const file = lane.items.find((item) => item.name === open) ?? null;
  const desks = new Set(seen.map((key) => key.split(":")[0]));

  function chooseLane(next: number) {
    setLaneIndex(next);
    setOpen(null);
  }

  function chooseFile(name: string) {
    setOpen(name);
    const key = `${lane.desk}:${name}`;
    setSeen((current) => (current.includes(key) ? current : [...current, key]));
  }

  return (
    <section className={cn("mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28", className)}>
      <Kicker>{site.workflow.kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-6xl">
        {site.workflow.title}
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.workflow.caption}</p>

      <div role="tablist" aria-label="Folders on the drive" className="mt-8 flex gap-4 overflow-x-auto">
        {lanes.map((item, itemIndex) => (
          <button
            key={item.desk}
            type="button"
            role="tab"
            aria-selected={itemIndex === laneIndex}
            onClick={() => chooseLane(itemIndex)}
            className={cn(
              "shrink-0 border-b-2 py-2 text-sm",
              itemIndex === laneIndex ? "border-cove text-foreground" : "border-transparent text-muted-foreground",
            )}
          >
            {item.desk}
            {desks.has(item.desk) ? (
              <span className="ml-2 inline-block size-1.5 rounded-full bg-cove align-middle" aria-hidden />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        <MacWindow title={lane.volume}>
          <div className="grid grid-cols-3 gap-2 px-3 py-5 sm:px-6">
            {lane.items.map((item, itemIndex) => {
              const selected = item.name === open;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => chooseFile(item.name)}
                  aria-pressed={selected}
                  className={cn("grid justify-items-center gap-2 rounded-md px-1 py-2", selected && "bg-[#0a84ff] text-white")}
                >
                  <Glyph kind={item.kind} name={item.name} variant={itemIndex} className="size-14" />
                  <span className="max-w-full truncate text-center text-[12px] leading-tight">{item.name}</span>
                </button>
              );
            })}
          </div>
          <div className="flex min-h-14 items-center justify-between gap-3 border-t border-black/10 px-3 py-2.5 text-[12px]">
            {file ? (
              <p className="min-w-0">
                <span className="block truncate font-mono text-[11px] text-[#3a3a3c]">
                  /Volumes/{lane.volume}/{file.name}
                </span>
                <span className="block text-[#6e6e73]">
                  {file.meta} · Opened from the cloud. Zero KB on this Mac.
                </span>
              </p>
            ) : (
              <p className="text-[#6e6e73]">Open a folder. The drive does not care what you call it.</p>
            )}
          </div>
        </MacWindow>
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
          {desks.size === lanes.length
            ? "Home, a campaign, and an agent. One click either way."
            : `Open a folder on each desk. ${desks.size} of ${lanes.length} so far.`}
        </p>
      </div>
    </section>
  );
}
