"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { CoveMark } from "@/components/brand";
import { cn } from "cn";

type Sprite = {
  name: string;
  src: string;
  cover: boolean;
  x: number;
  y: number;
  bx: number;
  by: number;
  rot: number;
};

const sprites: Sprite[] = [
  { name: "Beach.jpg", src: "/media/beach.jpg", cover: true, x: 34, y: 32, bx: -6, by: -18, rot: -14 },
  { name: "Christmas.mov", src: "/media/christmas.jpg", cover: true, x: 50, y: 32, bx: 18, by: -34, rot: 8 },
  { name: "School play.mov", src: "/media/stage.jpg", cover: true, x: 66, y: 32, bx: 54, by: -28, rot: -6 },
  { name: "rushes.mov", src: "/media/film.jpg", cover: true, x: 82, y: 32, bx: 108, by: -12, rot: 12 },
  { name: "contact.jpg", src: "/media/camera.jpg", cover: true, x: 34, y: 54, bx: -14, by: 8, rot: -18 },
  { name: "banner.png", src: "/media/poster.jpg", cover: true, x: 50, y: 54, bx: 112, by: 16, rot: 10 },
  { name: "repo", src: "/media/code.jpg", cover: true, x: 66, y: 54, bx: 4, by: -40, rot: 16 },
  { name: "brief.pdf", src: "/media/campaign.jpg", cover: true, x: 82, y: 54, bx: 96, by: -36, rot: -8 },
  { name: "brand-kit", src: "/media/folder.png", cover: false, x: 34, y: 76, bx: -8, by: 46, rot: -10 },
  { name: "hero.prproj", src: "/media/premiere.png", cover: false, x: 50, y: 76, bx: 114, by: 48, rot: 14 },
  { name: "masters", src: "/media/folder.png", cover: false, x: 66, y: 76, bx: 28, by: -8, rot: -4 },
  { name: "studio.jpg", src: "/media/studio.jpg", cover: true, x: 82, y: 76, bx: 78, by: -42, rot: 9 },
];

const lines = [
  "A Finder full of the heavy stuff.",
  "It leaves the laptop.",
  "Cove Mtn takes the lot.",
];

export function RangeIntake() {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [phase, setPhase] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.22 ? 0 : value < 0.56 ? 1 : 2;
    setPhase((current) => (current === next ? current : next));
  });

  if (reduce) {
    return (
      <section id="intake" className="px-4 py-16 sm:px-6">
        <IntakeCopy phase={2} />
        <FinderChrome settled />
      </section>
    );
  }

  return (
    <section id="intake" ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-x-clip px-4 pt-16 pb-24 sm:px-6">
        <IntakeCopy phase={phase} />
        <FinderChrome progress={scrollYProgress} phase={phase} />
      </div>
    </section>
  );
}

function IntakeCopy({ phase }: { phase: number }) {
  return (
    <div className="mx-auto mb-5 w-full max-w-5xl">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">Cove · Mt. Mtn.</p>
      <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em] sm:text-5xl">{lines[phase]}</h2>
    </div>
  );
}

function FinderChrome({
  progress,
  phase = 2,
  settled = false,
}: {
  progress?: MotionValue<number>;
  phase?: number;
  settled?: boolean;
}) {
  const mounted = settled || phase === 2;
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div
        className="overflow-hidden rounded-xl text-[#1d1d1f] shadow-[0_30px_80px_-28px_rgba(0,0,0,0.55)] ring-1 ring-white/20"
        style={{
          background:
            "radial-gradient(80% 80% at 80% 100%, rgba(61,206,160,0.28), transparent 55%), linear-gradient(160deg, #8ea4c4 0%, #d5c7b4 46%, #6d8f86 100%)",
        }}
      >
        <div className="hidden h-7 items-center gap-4 px-3 text-[12px] text-white/90 sm:flex">
          <span className="font-semibold">Finder</span>
          <span className="text-white/75">File</span>
          <span className="text-white/75">View</span>
          <span className="ml-auto tabular-nums">Mon 9:41</span>
        </div>
        <section aria-label="Finder" className="mx-2 mb-3 overflow-hidden rounded-[10px] bg-[#f6f6f6] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.65)] sm:mx-4">
          <div className="flex h-11 items-center gap-2 border-b border-black/10 px-3">
            <span className="flex gap-[6px]" aria-hidden>
              <i className="size-3 rounded-full bg-[#ff5f57]" />
              <i className="size-3 rounded-full bg-[#febc2e]" />
              <i className="size-3 rounded-full bg-[#28c840]" />
            </span>
            <p className="mx-auto flex items-center gap-1.5 text-[13px] font-semibold">
              {mounted ? <CoveMark className="size-[18px] text-cove" /> : <DriveGlyph />}
              {mounted ? "Cove Mtn" : "Macintosh HD"}
            </p>
          </div>
          <div className="grid md:grid-cols-[168px_1fr]">
            <aside className="hidden border-r border-black/10 px-2 py-3 md:block">
              <p className="px-2 pb-1 text-[11px] font-semibold text-[#8e8e93]">Locations</p>
              <p className={cn("flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px]", mounted ? "text-[#1d1d1f]" : "bg-[#0a84ff] text-white")}>
                <DriveGlyph />
                Macintosh HD
              </p>
              <p className={cn("mt-0.5 flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px]", mounted ? "bg-[#0a84ff] text-white" : "text-[#1d1d1f]/45")}>
                <CoveMark className={cn("size-[21px]", mounted ? "text-white" : "text-cove")} />
                Cove Mtn
              </p>
            </aside>
            <div className="relative min-h-[280px] bg-white sm:min-h-[340px]">
              {progress ? <ArrivingGrid progress={progress} /> : <SettledGrid />}
            </div>
          </div>
          <div className="flex h-7 items-center border-t border-black/10 px-3 text-[11px] text-[#6e6e73]">
            {mounted
              ? "12 items — 1.2 PB in the cloud. Zero KB on this Mac."
              : "12 items — 11 GB available of 256 GB."}
          </div>
        </section>
      </div>
      {progress && !settled ? (
        <div className="pointer-events-none absolute inset-0">
          {sprites.map((sprite, index) => (
            <FlyingFile key={sprite.name} sprite={sprite} index={index} count={sprites.length} progress={progress} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SettledGrid() {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-4 p-3 sm:p-4">
      {sprites.map((sprite) => (
        <FileTile key={sprite.name} sprite={sprite} />
      ))}
    </div>
  );
}

function ArrivingGrid({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.74, 0.9], [0, 1]);
  return (
    <motion.div style={{ opacity }} className="grid grid-cols-4 gap-x-2 gap-y-4 p-3 sm:p-4">
      {sprites.map((sprite) => (
        <FileTile key={sprite.name} sprite={sprite} />
      ))}
    </motion.div>
  );
}

function FlyingFile({
  sprite,
  index,
  count,
  progress,
}: {
  sprite: Sprite;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const burstAt = 0.14 + (index / count) * 0.18;
  const suckAt = 0.46 + (index / count) * 0.2;
  const goneAt = suckAt + 0.14;
  const left = useTransform(progress, [0, burstAt, suckAt, goneAt], [`${sprite.x}%`, `${sprite.bx}%`, "9%", "9%"]);
  const top = useTransform(progress, [0, burstAt, suckAt, goneAt], [`${sprite.y}%`, `${sprite.by}%`, "52%", "52%"]);
  const scale = useTransform(progress, [0, burstAt, suckAt, goneAt], [1, 1.12, 0.16, 0.04]);
  const opacity = useTransform(progress, [0, suckAt, goneAt], [1, 1, 0]);
  const rotate = useTransform(progress, [0, burstAt, suckAt], [0, sprite.rot, 0]);

  return (
    <motion.div style={{ left, top, scale, opacity, rotate, x: "-50%", y: "-50%" }} className="absolute w-[18%] max-w-[92px] sm:w-[15%]">
      <FileTile sprite={sprite} flying />
    </motion.div>
  );
}

function FileTile({ sprite, flying }: { sprite: Sprite; flying?: boolean }) {
  return (
    <figure className="text-center">
      <span className={cn("relative mx-auto block", flying ? "h-14 w-full sm:h-16" : "mx-auto h-14 w-14 sm:h-16 sm:w-16", sprite.cover && "overflow-hidden rounded-[3px]")}>
        <Image src={sprite.src} alt="" fill sizes="92px" className={sprite.cover ? "object-cover" : "object-contain"} />
      </span>
      <figcaption className="mt-1 truncate rounded-sm bg-white/90 px-1 text-[10px] text-[#1d1d1f] sm:text-[11px]">{sprite.name}</figcaption>
    </figure>
  );
}

function DriveGlyph() {
  return (
    <span className="relative block size-[18px] shrink-0">
      <Image src="/media/hdd.png" alt="" fill sizes="18px" className="object-contain" />
    </span>
  );
}
