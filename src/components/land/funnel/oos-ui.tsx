"use client";

import { motion } from "motion/react";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Glyph, HdIcon, MacWindow } from "@/components/mac-window";

export function StorageMeter({ used = 0.94, label = "Nearly full" }: { used?: number; label?: string }) {
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

export function MacDesktopShell({ children, menu = "Finder" }: { children: React.ReactNode; menu?: string }) {
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

export function StorageSettingsPanel() {
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
                background: "conic-gradient(#5ac8fa 0 15%, #af52de 15% 35%, #ff9f0a 35% 94%, #e5e5ea 94% 100%)",
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
              <div
                key={row.name}
                className="flex items-center justify-between border-b border-black/6 px-3 py-2 last:border-0"
              >
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

export function CoveFinderPreview({
  mounted,
  onMount,
  volume = "Family",
  files = site.desks[0].files.slice(0, 6),
}: {
  mounted: boolean;
  onMount: () => void;
  volume?: string;
  files?: { name: string; meta: string; kind: string }[];
}) {
  return (
    <MacDesktopShell menu={mounted ? "Cove" : "Finder"}>
      <MacWindow title={mounted ? volume : "Macintosh HD"} className="shadow-none">
        <div className="grid min-h-[280px] sm:grid-cols-[168px_minmax(0,1fr)]">
          <aside className="border-b border-black/8 bg-[#ececec] px-2 py-2 text-[13px] sm:border-r sm:border-b-0">
            <p className="px-2 pt-1 pb-1 text-[11px] font-semibold tracking-wide text-[#6e6e73]">Locations</p>
            <div
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${mounted ? "" : "bg-[#0a84ff] text-white"}`}
            >
              <HdIcon />
              Macintosh HD
            </div>
            {mounted ? (
              <div className="mt-0.5 flex items-center gap-2 rounded-md bg-[#0a84ff] px-2 py-1.5 text-white">
                <CoveMark className="size-[21px] shrink-0 text-white" />
                <span className="truncate">{volume}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onMount}
                className="mt-2 w-full rounded-md bg-[#0e6b56] px-3 py-2.5 text-left text-[13px] font-medium text-white"
              >
                One click: show {volume}
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
                    Show {volume} on this Mac
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

export function DeskFinderCard({
  volume,
  files,
}: {
  volume: string;
  files: { name: string; kind: string }[];
}) {
  return (
    <MacWindow title={volume} className="shadow-[0_16px_40px_-28px_rgba(14,19,32,0.4)]">
      <div className="flex items-center gap-2 border-b border-black/8 bg-[#ececec] px-3 py-2 text-[12px]">
        <CoveMark className="size-4 text-cove" />
        <span className="font-medium">{volume}</span>
        <span className="ml-auto text-[#6e6e73]">On this Mac</span>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3">
        {files.map((file, index) => (
          <div key={file.name} className="flex flex-col items-center gap-1 text-center">
            <Glyph kind={file.kind} name={file.name} variant={index % 3} className="size-10" />
            <span className="line-clamp-2 text-[10px] leading-tight text-[#3c4654]">{file.name}</span>
          </div>
        ))}
      </div>
    </MacWindow>
  );
}
