"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Glyph, Locations, MacWindow } from "@/components/mac-window";
import { Kicker } from "@/components/section";
import { cn } from "cn";

const sizes = ["256 GB", "1 TB", "2 TB", "8 TB", "20 TB"];

const apps = [
  { id: "photos", name: "Photos", icon: "/media/photos.png", file: "School play.mov", kind: "film" },
  { id: "finder", name: "Finder", icon: "/media/finder.png", file: "Summer holiday", kind: "folder" },
  { id: "premiere", name: "Premiere", icon: "/media/premiere.png", file: "The cut", kind: "cut" },
  { id: "logic", name: "Logic", icon: "/media/logic.png", file: "album-two", kind: "folder" },
  { id: "cursor", name: "Cursor", icon: "/media/cursor.png", file: "page.tsx", kind: "code" },
];

export function JourneyPlay() {
  const steps = site.journey.steps;
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("Family");
  const [sizeIndex, setSizeIndex] = useState(2);
  const [shown, setShown] = useState(false);
  const [opened, setOpened] = useState<string[]>([]);
  const [keep, setKeep] = useState(false);
  const volume = name.trim() || "Untitled";
  const step = steps[index];

  function openApp(id: string) {
    if (!shown) return;
    setOpened((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <section id={site.journey.id} className="scroll-mt-24 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Kicker>{site.journey.kicker}</Kicker>
          <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl">
            {site.journey.title}
          </h2>
          <ol className="mt-8 grid gap-1">
            {steps.map((item, stepIndex) => {
              const active = stepIndex === index;
              return (
                <li key={item.index}>
                  <button
                    type="button"
                    onClick={() => setIndex(stepIndex)}
                    aria-current={active ? "step" : undefined}
                    className={cn("w-full border-l-2 py-3 pl-4 text-left", active ? "border-cove" : "border-foreground/15")}
                  >
                    <span className="text-sm text-cove">{item.index}</span>
                    <span className="mt-1 block font-serif text-2xl tracking-[-0.03em]">{item.title}</span>
                    {active ? (
                      <span className="mt-2 block max-w-md text-base leading-relaxed text-muted-foreground">{item.body}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div>
          <p className="mb-3 text-sm text-muted-foreground">
            Step {step.index}. {progressLine(index, shown, opened.length, keep)}
          </p>
          {index === 0 ? (
            <MacWindow title="Name your drive">
              <div className="grid justify-items-center px-4 pt-8 pb-4">
                <CoveMark className="size-16 text-cove" />
                <label htmlFor="drive-name" className="mt-4 text-[11px] text-[#6e6e73]">
                  People will say this out loud
                </label>
                <input
                  id="drive-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 w-full max-w-xs border-b border-black/15 bg-transparent text-center font-serif text-3xl tracking-[-0.03em] outline-none"
                />
              </div>
              <div className="px-4 pt-2 pb-5">
                <div className="flex items-baseline justify-between text-[12px]">
                  <span>A size you can grow</span>
                  <span className="font-medium tabular-nums">{sizes[sizeIndex]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={sizes.length - 1}
                  value={sizeIndex}
                  onChange={(event) => setSizeIndex(Number(event.target.value))}
                  aria-valuetext={sizes[sizeIndex]}
                  aria-label="Size you can grow"
                  className="mt-2 w-full accent-[#0e6b56]"
                />
              </div>
            </MacWindow>
          ) : null}

          {index === 1 ? (
            <MacWindow title={shown ? volume : "Finder"}>
              <Locations volume={volume} mounted={shown} onShow={() => setShown(true)} action="One click" />
              <p className="border-t border-black/10 px-3 py-2.5 text-[12px] leading-relaxed text-[#6e6e73]">
                {shown
                  ? `${volume} is under Locations, beside Macintosh HD.`
                  : "People who build software call the click mounting. On the Mac, it simply shows up."}
              </p>
            </MacWindow>
          ) : null}

          {index === 2 ? (
            <MacWindow title={shown ? volume : "Finder"}>
              {shown ? (
                <>
                  <div className="grid grid-cols-5 gap-1 px-2 py-4">
                    {apps.map((app) => {
                      const on = opened.includes(app.id);
                      return (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => openApp(app.id)}
                          aria-pressed={on}
                          className={cn("grid justify-items-center gap-1 rounded-md px-1 py-1.5", on && "bg-[#dbeafe]")}
                        >
                          <span className="relative block size-10">
                            <Image src={app.icon} alt="" fill sizes="40px" className="object-contain" />
                          </span>
                          <span className="text-[10px] leading-none">{app.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="min-h-16 border-t border-black/10 px-3 py-3">
                    {opened.length ? (
                      <OpenedFile appId={opened[opened.length - 1]} />
                    ) : (
                      <p className="text-[12px] text-[#6e6e73]">Open one. It sees a normal drive.</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="px-3 py-4">
                  <p className="text-[13px] text-[#3a3a3c]">The apps are waiting. The drive is not on this Mac yet.</p>
                  <button
                    type="button"
                    onClick={() => setShown(true)}
                    className="mt-3 rounded-md bg-[#0e6b56] px-3 py-2 text-[13px] font-medium text-white"
                  >
                    One click
                  </button>
                </div>
              )}
            </MacWindow>
          ) : null}

          {index === 3 ? (
            <MacWindow title={`${volume} Info`}>
              {shown ? (
                <div className="bg-white px-4 py-4">
                  <div className="grid justify-items-center text-center">
                    <CoveMark className="size-16 text-cove" />
                    <p className="mt-2 font-medium">{volume}</p>
                    <p className="text-[11px] text-[#6e6e73]">Volume</p>
                  </div>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[12px]">
                    <dt className="text-right text-[#6e6e73]">Where</dt>
                    <dd className="truncate font-mono text-[11px]">/Volumes/{volume}</dd>
                    <dt className="text-right text-[#6e6e73]">Size</dt>
                    <dd>{sizes[sizeIndex]} in the cloud</dd>
                    <dt className="text-right text-[#6e6e73]">On this Mac</dt>
                    <dd className="font-medium">{keep ? "A copy, close" : "Zero KB"}</dd>
                  </dl>
                  <button
                    type="button"
                    onClick={() => setKeep((value) => !value)}
                    aria-pressed={keep}
                    className="mt-4 flex w-full items-center justify-between border-t border-black/10 pt-3 text-left text-[13px]"
                  >
                    <span>Keep a copy of something close</span>
                    <span className={cn("text-[12px]", keep ? "text-[#0e6b56]" : "text-[#6e6e73]")}>{keep ? "On" : "Off"}</span>
                  </button>
                </div>
              ) : (
                <div className="px-3 py-4">
                  <p className="text-[13px]">Get Info is waiting on the drive.</p>
                  <button
                    type="button"
                    onClick={() => setShown(true)}
                    className="mt-3 rounded-md bg-[#0e6b56] px-3 py-2 text-[13px] font-medium text-white"
                  >
                    One click
                  </button>
                </div>
              )}
            </MacWindow>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function OpenedFile({ appId }: { appId: string }) {
  const app = apps.find((item) => item.id === appId) ?? apps[0];
  return (
    <div className="flex items-center gap-3">
      <Glyph kind={app.kind} name={app.file} className="size-9" />
      <p className="min-w-0 text-[13px]">
        <span className="block truncate font-medium">
          {app.file}
          <span className="font-normal text-[#6e6e73]"> · {app.name}</span>
        </span>
        <span className="block text-[11px] text-[#6e6e73]">From the cloud. Zero KB on this Mac.</span>
      </p>
    </div>
  );
}

function progressLine(index: number, shown: boolean, opened: number, keep: boolean) {
  if (index === 0) return "Give it a name, then a size.";
  if (index === 1) return shown ? "It is on this Mac." : "Click once.";
  if (index === 2) return shown ? `${opened} of ${apps.length} apps have opened it.` : "Show it, then open an app.";
  if (!shown) return "Show the drive to read Get Info.";
  return keep ? "A copy is close, because you asked." : "The heavy files stay in the cloud.";
}
