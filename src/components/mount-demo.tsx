"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { CoveMark } from "@/components/brand";
import { cn } from "cn";

export function MountDemo() {
  const desks = site.desks;
  const [deskId, setDeskId] = useState(desks[0].id);
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const reduce = useReducedMotion();
  const desk = desks.find((item) => item.id === deskId) ?? desks[0];

  function showOnMac() {
    if (mounted) {
      setMounted(false);
      return;
    }
    const finish = () => {
      setBusy(false);
      setMounted(true);
      track(site.analytics.events.mountDemo, { desk: desk.id });
    };
    if (reduce) {
      finish();
      return;
    }
    setBusy(true);
    window.setTimeout(finish, 680);
  }

  return (
    <div id="demo">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted-foreground">Same cloud drive. Choose what’s on it.</p>
        <div role="tablist" aria-label="What’s on the drive" className="flex gap-1.5 overflow-x-auto pb-1">
          {desks.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === desk.id}
              onClick={() => setDeskId(item.id)}
              className={cn(
                "shrink-0 border-b-2 px-1 py-1.5 text-sm",
                item.id === desk.id ? "border-cove text-foreground" : "border-transparent text-muted-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(26,154,120,0.28),transparent)] blur-2xl"
        />
        <div className="overflow-hidden rounded-md bg-white/75 shadow-[0_30px_80px_-36px_rgba(18,36,29,0.5)] ring-1 ring-white/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-black/5 px-3 py-3 sm:px-4">
            <span className="flex gap-1.5" aria-hidden>
              <i className="size-2.5 rounded-full bg-[#ff5f57]" />
              <i className="size-2.5 rounded-full bg-[#febc2e]" />
              <i className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <p className="truncate text-sm text-muted-foreground">{desk.volume}</p>
            <button
              type="button"
              onClick={showOnMac}
              className={cn(
                "ml-auto shrink-0 rounded-md px-3 py-1.5 text-sm font-medium",
                mounted ? "bg-mist text-pine" : "bg-cove text-paper",
              )}
            >
              {busy ? "Showing…" : mounted ? "Remove" : "Show on this Mac"}
            </button>
          </div>

          <div className="grid md:grid-cols-[190px_1fr]">
            <aside className="border-b border-black/5 p-3 md:border-r md:border-b-0">
              <p className="px-2 text-[11px] tracking-[0.16em] text-muted-foreground uppercase">Locations</p>
              <div className="mt-2 grid gap-1">
                <div className="rounded-xl px-2 py-2 text-sm text-muted-foreground">Macintosh HD</div>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-2 py-2 text-sm",
                    mounted ? "bg-mist text-pine" : "text-muted-foreground",
                  )}
                >
                  <CoveMark className="size-4" />
                  <span className="truncate">{desk.volume}</span>
                  <span
                    className={cn(
                      "ml-auto size-1.5 rounded-full",
                      mounted ? "bg-cove" : "bg-foreground/20",
                    )}
                  />
                </div>
              </div>
            </aside>

            <div className="min-h-[280px] p-3 sm:min-h-[320px] sm:p-4" aria-live="polite">
              <AnimatePresence mode="wait">
                {!mounted ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full min-h-[250px] flex-col items-start justify-center px-2"
                  >
                    <CoveMark className="size-10 text-cove" />
                    <p className="mt-4 max-w-sm font-serif text-3xl leading-none tracking-tight">
                      {busy ? "Asking your Mac to show it." : "This drive lives in the cloud."}
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {busy
                        ? "One moment."
                        : `Show ${desk.volume} and it appears on your Mac, like a drive you plugged in.`}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key={desk.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-1">
                    {desk.files.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-black/[0.03]"
                      >
                        <FileGlyph kind={item.kind} />
                        <span className="min-w-0 flex-1 truncate text-sm">{item.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{item.meta}</span>
                      </motion.div>
                    ))}
                    <div className="mt-3 rounded-2xl bg-mist/80 px-4 py-3 text-sm">
                      <p className="font-medium text-pine">{desk.cloudSize}</p>
                      <p className="text-muted-foreground">Kept in the cloud. {desk.onMac}.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground sm:text-left">
        A preview of the drive. The Mac app is what puts the real one on your computer.
      </p>
    </div>
  );
}

function FileGlyph({ kind }: { kind: string }) {
  const tone =
    kind === "photo" || kind === "film"
      ? "bg-[#d7efe4] text-cove"
      : kind === "code"
        ? "bg-[#e7eef8] text-[#1d4e89]"
        : kind === "cut"
          ? "bg-[#f3e6d4] text-[#8a5a22]"
          : "bg-white text-pine ring-1 ring-black/5";
  return (
    <span className={cn("grid size-8 place-items-center rounded-lg text-[10px] font-medium", tone)}>
      {kind === "folder" ? "Fld" : kind === "photo" ? "Img" : kind === "film" ? "Mov" : kind === "code" ? "Dev" : "Doc"}
    </span>
  );
}
