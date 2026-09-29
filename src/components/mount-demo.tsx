"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { CoveMark } from "@/components/brand";
import { FileArt, SidebarGlyph, ViewIcon } from "@/components/finder-icons";
import { cn } from "cn";

type ViewMode = "icon" | "list" | "column" | "gallery";
type Place = "hd" | "volume";

type Item = { name: string; meta: string; kind: string };

const hdItems: Item[] = [
  { name: "Applications", meta: "Folder", kind: "folder" },
  { name: "Users", meta: "Folder", kind: "folder" },
  { name: "System", meta: "Folder", kind: "folder" },
  { name: "Library", meta: "Folder", kind: "folder" },
];

const views: ViewMode[] = ["icon", "list", "column", "gallery"];

function kindLabel(item: Item) {
  if (item.kind === "folder") return "Folder";
  if (item.kind === "photo") return item.name.endsWith(".png") ? "PNG image" : "JPEG image";
  if (item.kind === "film") return "QuickTime movie";
  if (item.kind === "cut") return "Premiere project";
  if (item.kind === "code") {
    if (item.name.endsWith(".json")) return "JSON";
    if (item.name.endsWith(".tsx")) return "TypeScript";
    return "Source code";
  }
  if (item.name.endsWith(".md")) return "Markdown";
  if (item.name.endsWith(".pdf")) return "PDF document";
  return "Document";
}

export function MountDemo() {
  const desks = site.desks;
  const [deskId, setDeskId] = useState(desks[0].id);
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [place, setPlace] = useState<Place>("hd");
  const [view, setView] = useState<ViewMode>("icon");
  const [selected, setSelected] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const desk = desks.find((item) => item.id === deskId) ?? desks[0];
  const items = place === "volume" && mounted ? desk.files : hdItems;
  const current = items.find((item) => item.name === selected) ?? null;
  const title = place === "volume" && mounted ? desk.volume : "Macintosh HD";

  function showOnMac() {
    if (mounted) {
      setMounted(false);
      setPlace("hd");
      setSelected(null);
      return;
    }
    const finish = () => {
      setBusy(false);
      setMounted(true);
      setPlace("volume");
      setSelected(null);
      track(site.analytics.events.mountDemo, { desk: desk.id });
    };
    if (reduce) {
      finish();
      return;
    }
    setBusy(true);
    window.setTimeout(finish, 640);
  }

  function openPlace(next: Place) {
    if (next === "volume" && !mounted) return;
    setPlace(next);
    setSelected(null);
  }

  return (
    <div id="demo">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted-foreground">Same cloud drive. Choose what’s on it, then show it in Finder.</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div role="tablist" aria-label="What’s on the drive" className="flex gap-1.5 overflow-x-auto pb-1">
            {desks.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === desk.id}
                onClick={() => {
                  setDeskId(item.id);
                  setSelected(null);
                  if (mounted) setPlace("volume");
                }}
                className={cn(
                  "shrink-0 border-b-2 px-1 py-1.5 text-sm",
                  item.id === desk.id ? "border-cove text-foreground" : "border-transparent text-muted-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          {mounted ? (
            <button
              type="button"
              onClick={showOnMac}
              className="shrink-0 rounded-md bg-mist px-3 py-1.5 text-sm font-medium text-pine"
            >
              Remove
            </button>
          ) : (
            <span className="try-mac-frame shrink-0">
              <button type="button" onClick={showOnMac} className="try-mac px-4 py-1.5 text-sm font-medium">
                {busy ? "Showing…" : "Try on this Mac"}
              </button>
            </span>
          )}
        </div>
      </div>

      <div
        className="overflow-hidden rounded-xl shadow-[0_30px_70px_-28px_rgba(14,19,32,0.45)] ring-1 ring-black/10"
        style={{
          background:
            "radial-gradient(90% 70% at 80% 110%, rgba(14,107,86,0.55), transparent 55%), radial-gradient(70% 50% at 10% 0%, rgba(232,214,186,0.9), transparent 50%), linear-gradient(165deg, #9eb0c2 0%, #d9c7ae 42%, #6e9084 100%)",
        }}
      >
        <div className="hidden h-7 items-center gap-4 px-3 text-[12px] text-white/90 sm:flex">
          <span className="font-semibold">Finder</span>
          <span className="text-white/75">File</span>
          <span className="text-white/75">Edit</span>
          <span className="text-white/75">View</span>
          <span className="text-white/75">Go</span>
          <span className="text-white/75">Window</span>
          <span className="ml-auto tabular-nums">Mon 9:41</span>
        </div>

        <div className="grid items-start gap-3 px-2 pt-2 pb-3 sm:px-4 sm:pt-3 sm:pb-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <section
            aria-label="Finder"
            className="overflow-hidden rounded-[10px] bg-[#f6f6f6] text-[#1d1d1f] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.65),0_0_0_1px_rgba(0,0,0,0.18)]"
          >
            <div className="flex h-12 items-center gap-2 border-b border-black/10 px-3">
              <span className="flex gap-[7px]" aria-hidden>
                <i className="size-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]" />
                <i className="size-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
                <i className="size-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
              </span>
              <div className="ml-1 hidden items-center gap-0.5 sm:flex">
                <button
                  type="button"
                  aria-label="Back"
                  disabled={place === "hd"}
                  onClick={() => openPlace("hd")}
                  className="grid size-7 place-items-center rounded-md text-[#3a3a3c] disabled:text-black/20"
                >
                  <Chevron dir="left" />
                </button>
                <button type="button" aria-label="Forward" disabled className="grid size-7 place-items-center rounded-md text-black/20">
                  <Chevron dir="right" />
                </button>
              </div>
              <div className="flex min-w-0 flex-1 justify-center px-2">
                <p className="flex max-w-full items-center gap-1.5 truncate text-[13px] font-semibold">
                  {place === "volume" && mounted ? (
                    <CoveMark className="size-[18px] shrink-0 text-cove" />
                  ) : (
                    <span className="relative block size-4 shrink-0">
                      <Image src="/media/hdd.png" alt="" fill sizes="16px" className="object-contain" />
                    </span>
                  )}
                  <span className="truncate">{busy ? "Connecting…" : title}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-md bg-black/5 p-0.5" role="tablist" aria-label="Finder view">
                  {views.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      role="tab"
                      aria-selected={view === mode}
                      aria-label={`${mode} view`}
                      onClick={() => setView(mode)}
                      className={cn(
                        "grid size-6 place-items-center rounded-[5px]",
                        view === mode ? "bg-white text-[#1d1d1f] shadow-sm" : "text-[#6e6e73]",
                      )}
                    >
                      <ViewIcon mode={mode} />
                    </button>
                  ))}
                </div>
                <div className="hidden h-6 items-center rounded-md bg-black/[0.06] px-2 text-[11px] text-[#6e6e73] md:flex">
                  Search
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-[188px_1fr]">
              <aside className="border-b border-black/10 px-2 py-2 md:border-r md:border-b-0 md:py-3">
                <div className="flex gap-1 overflow-x-auto md:grid md:gap-0.5">
                  <div className="hidden md:contents">
                    <SidebarLabel>Favourites</SidebarLabel>
                    <SidebarRow icon="recents" label="Recents" />
                    <SidebarRow icon="apps" label="Applications" />
                    <SidebarRow icon="desktop" label="Desktop" />
                    <SidebarRow icon="documents" label="Documents" />
                    <SidebarRow icon="downloads" label="Downloads" />
                  </div>
                  <SidebarLabel>Locations</SidebarLabel>
                  <SidebarRow icon="hd" label="Macintosh HD" selected={place === "hd"} onClick={() => openPlace("hd")} />
                  <AnimatePresence>
                    {mounted ? (
                      <motion.div
                        key="volume"
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <SidebarRow
                          icon="volume"
                          label={desk.volume}
                          selected={place === "volume"}
                          onClick={() => openPlace("volume")}
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  {busy ? <p className="px-2 py-1 text-[12px] text-[#6e6e73]">Connecting…</p> : null}
                </div>
              </aside>

              <div className="min-h-[300px] bg-white sm:min-h-[340px]" aria-live="polite">
                <FinderBody
                  view={view}
                  items={items}
                  selected={selected}
                  onSelect={setSelected}
                  volume={place === "volume" && mounted}
                />
              </div>
            </div>

            <div className="flex h-7 items-center border-t border-black/10 bg-[#f6f6f6] px-3 text-[11px] text-[#6e6e73]">
              {place === "volume" && mounted ? (
                <span>
                  {desk.files.length} items | {desk.cloudSize}. Zero KB on this Mac.
                </span>
              ) : (
                <span>{hdItems.length} items | 11 GB available of 256 GB.</span>
              )}
            </div>
          </section>

          <GetInfo
            onVolume={place === "volume" && mounted}
            volume={desk.volume}
            cloudSize={desk.cloudSize}
            onMac={desk.onMac}
            item={current}
          />
        </div>

        <div className="mx-auto mb-3 hidden w-fit items-end gap-1.5 rounded-2xl bg-white/20 px-2.5 py-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)] backdrop-blur-md md:flex">
          <DockTile active label="Finder" src="/media/finder.png" />
          <DockTile label="Photos" src="/media/photos.png" />
          <DockTile label="Premiere" src="/media/premiere.png" />
          <DockTile label="Logic" src="/media/logic.png" />
          <DockTile label="Figma" src="/media/figma.png" />
          <DockTile label="Copilot" src="/media/copilot.png" />
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        A Finder window in the browser. Show the drive, switch the view, and click a file. Get Info is the storage: the size is real, and this Mac is holding none of it.
      </p>
    </div>
  );
}

function SidebarLabel({ children }: { children: string }) {
  return (
    <p className="hidden px-2 pt-3 pb-1 text-[11px] font-semibold text-[#8e8e93] md:block">{children}</p>
  );
}

function SidebarRow({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: "recents" | "apps" | "desktop" | "documents" | "downloads" | "hd" | "volume";
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  const className = cn(
    "flex w-full shrink-0 items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px]",
    selected ? "bg-[#0a84ff] text-white" : "text-[#1d1d1f] hover:bg-black/5",
    !onClick && "text-[#1d1d1f]/80",
  );
  const body = (
    <>
      {icon === "volume" ? (
        <CoveMark className={cn("size-[21px] shrink-0", selected ? "text-white" : "text-cove")} />
      ) : (
        <SidebarGlyph name={icon} />
      )}
      <span className="truncate">{label}</span>
    </>
  );
  if (!onClick) {
    return <div className={className}>{body}</div>;
  }
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={className}>
      {body}
    </button>
  );
}

function FinderBody({
  view,
  items,
  selected,
  onSelect,
  volume,
}: {
  view: ViewMode;
  items: Item[];
  selected: string | null;
  onSelect: (name: string) => void;
  volume: boolean;
}) {
  if (view === "list") {
    return (
      <div className="min-h-[300px] text-[12px] sm:min-h-[340px]">
        <div className="grid grid-cols-[1fr_5.5rem_6.5rem] gap-2 border-b border-black/10 px-3 py-1.5 text-[11px] font-medium text-[#6e6e73] sm:grid-cols-[1fr_6rem_8rem_6.5rem]">
          <span>Name</span>
          <span>Size</span>
          <span className="hidden sm:block">Kind</span>
          <span>On this Mac</span>
        </div>
        {items.map((item) => {
          const on = selected === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(item.name)}
              aria-pressed={on}
              className={cn(
                "grid w-full grid-cols-[1fr_5.5rem_6.5rem] items-center gap-2 px-3 py-1.5 text-left sm:grid-cols-[1fr_6rem_8rem_6.5rem]",
                on ? "bg-[#0a84ff] text-white" : "hover:bg-black/[0.04]",
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileArt kind={item.kind} name={item.name} className="size-5 shrink-0" />
                <span className="truncate">{item.name}</span>
              </span>
              <span className={cn("truncate tabular-nums", on ? "text-white/90" : "text-[#6e6e73]")}>{item.meta}</span>
              <span className={cn("hidden truncate sm:block", on ? "text-white/90" : "text-[#6e6e73]")}>{kindLabel(item)}</span>
              <span className={cn("font-medium tabular-nums", on ? "text-white" : volume ? "text-[#0e6b56]" : "text-[#6e6e73]")}>
                {volume ? "Zero KB" : "·"}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (view === "gallery") {
    const active = items.find((item) => item.name === selected) ?? items[0];
    return (
      <div className="flex min-h-[300px] flex-col sm:min-h-[340px]">
        <div className="grid flex-1 place-items-center bg-[#f3f3f4] px-4 py-6">
          {active ? (
            <div className="text-center">
              <FileArt kind={active.kind} name={active.name} className="mx-auto size-28" />
              <p className="mt-3 text-[13px] font-medium">{active.name}</p>
              <p className="text-[12px] text-[#6e6e73]">
                {kindLabel(active)} · {active.meta}
                {volume ? " · Zero KB on this Mac" : ""}
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2 overflow-x-auto border-t border-black/10 px-3 py-2">
          {items.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(item.name)}
              aria-pressed={active?.name === item.name}
              className={cn(
                "grid w-16 shrink-0 justify-items-center gap-1 rounded-md p-1",
                active?.name === item.name && "bg-[#0a84ff]/10",
              )}
            >
              <FileArt kind={item.kind} name={item.name} className="size-8" />
              <span className="w-full truncate text-center text-[10px]">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "column") {
    const active = items.find((item) => item.name === selected) ?? null;
    return (
      <div className="grid min-h-[300px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:min-h-[340px]">
        <div className="border-r border-black/10 py-1">
          {items.map((item) => {
            const on = selected === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onSelect(item.name)}
                aria-pressed={on}
                className={cn(
                  "flex w-full items-center gap-2 px-2 py-1 text-left text-[13px]",
                  on ? "bg-[#0a84ff] text-white" : "hover:bg-black/[0.04]",
                )}
              >
                <FileArt kind={item.kind} name={item.name} className="size-5 shrink-0" />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </div>
        <div className="grid place-items-center bg-[#f7f7f8] p-4 text-center">
          {active ? (
            <div>
              <FileArt kind={active.kind} name={active.name} className="mx-auto size-20" />
              <p className="mt-3 text-[13px] font-medium">{active.name}</p>
              <p className="text-[12px] text-[#6e6e73]">{kindLabel(active)}</p>
              <p className="mt-1 text-[12px] text-[#6e6e73]">{volume ? "Zero KB on this Mac" : active.meta}</p>
            </div>
          ) : (
            <p className="max-w-[12rem] text-[12px] text-[#6e6e73]">Select a file to preview it.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 content-start gap-x-2 gap-y-4 p-4 sm:grid-cols-4">
      {items.map((item) => {
        const on = selected === item.name;
        return (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelect(item.name)}
            aria-pressed={on}
            className="grid justify-items-center gap-1.5"
          >
            <span className={cn("grid size-16 place-items-center rounded-lg", on && "bg-[#0a84ff]/10")}>
              <FileArt kind={item.kind} name={item.name} className="size-14" />
            </span>
            <span
              className={cn(
                "line-clamp-2 max-w-[5.8rem] rounded px-1 py-0.5 text-center text-[11px] leading-tight",
                on ? "bg-[#0a84ff] text-white" : "text-[#1d1d1f]",
              )}
            >
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GetInfo({
  onVolume,
  volume,
  cloudSize,
  onMac,
  item,
}: {
  onVolume: boolean;
  volume: string;
  cloudSize: string;
  onMac: string;
  item: Item | null;
}) {
  const file = item;
  const title = file ? file.name : onVolume ? volume : "Macintosh HD";
  const showingVolume = !file && onVolume;
  const showingHd = !file && !onVolume;

  return (
    <aside
      aria-label="Get Info"
      className="overflow-hidden rounded-[10px] bg-[#f6f6f6]/95 text-[#1d1d1f] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.16)] backdrop-blur-md"
    >
      <div className="flex h-9 items-center gap-2 border-b border-black/10 px-3">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <p className="truncate text-[12px] font-semibold">{title} Info</p>
      </div>
      <div className="bg-white px-4 py-4">
        <div className="grid justify-items-center text-center">
          {showingVolume ? (
            <CoveMark className="size-[74px] text-cove" />
          ) : !file ? (
            <span className="relative block size-16">
              <Image src="/media/hdd.png" alt="" fill sizes="64px" className="object-contain" />
            </span>
          ) : (
            <FileArt kind={file.kind} name={file.name} className="size-16" />
          )}
          <p className="mt-2 max-w-full truncate text-[13px] font-medium">{title}</p>
          <p className="text-[11px] text-[#6e6e73]">
            {file ? kindLabel(file) : showingVolume ? "Volume" : "APFS volume"}
          </p>
        </div>

        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[12px]">
          <dt className="text-right text-[#6e6e73]">Kind</dt>
          <dd>{file ? kindLabel(file) : showingVolume ? "Volume" : "APFS"}</dd>
          <dt className="text-right text-[#6e6e73]">Where</dt>
          <dd className="truncate font-mono text-[11px]">
            {onVolume ? `/Volumes/${volume}${file ? `/${file.name}` : ""}` : file ? `/${file.name}` : "/"}
          </dd>
          <dt className="text-right text-[#6e6e73]">Size</dt>
          <dd>{file ? file.meta : showingVolume ? cloudSize : "256 GB"}</dd>
          <dt className="text-right text-[#6e6e73]">On this Mac</dt>
          <dd className="font-medium">{onVolume ? "Zero KB" : showingHd ? "244 GB" : "On disk"}</dd>
        </dl>

        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[11px] text-[#6e6e73]">
            <span>{onVolume ? "Used here" : "This disk"}</span>
            <span>{onVolume ? "Empty" : "Nearly full"}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e5e5ea]">
            <div className={cn("h-full rounded-full", onVolume ? "w-[2%] bg-[#8e8e93]" : "w-[95%] bg-[#ff9f0a]")} />
          </div>
          {onVolume ? (
            <>
              <div className="mt-3 mb-1 flex justify-between text-[11px] text-[#6e6e73]">
                <span>In the cloud</span>
                <span className="truncate pl-2">{cloudSize}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#e5e5ea]">
                <div className="h-full w-full rounded-full bg-[#0e6b56]" />
              </div>
              <p className="mt-2 text-[11px] leading-snug text-[#6e6e73]">{onMac}. The files stay in the cloud.</p>
            </>
          ) : (
            <p className="mt-2 text-[11px] leading-snug text-[#6e6e73]">
              The laptop disk is nearly full. Show the cloud drive and the heavy files leave it.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

function DockTile({ src, active, label }: { src: string; active?: boolean; label: string }) {
  return (
    <div className="grid w-12 justify-items-center" title={label}>
      <span className="relative block size-11 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
        <Image src={src} alt="" fill sizes="44px" className="object-contain" />
      </span>
      <span className={cn("mt-1 size-1 rounded-full", active ? "bg-white" : "bg-transparent")} />
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path
        d={dir === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
