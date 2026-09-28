"use client";

import Image from "next/image";
import { CoveMark } from "@/components/brand";
import {
  CodePreview,
  DocPreview,
  MacFolder,
  MoviePreview,
  PhotoPreview,
  TimelinePreview,
} from "@/components/finder-icons";
import { cn } from "cn";

export function MacWindow({
  title,
  children,
  className,
  bodyClassName,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] bg-[#f6f6f6] text-[#1d1d1f] shadow-[0_22px_50px_-28px_rgba(14,19,32,0.5)] ring-1 ring-black/10",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-2 border-b border-black/10 bg-[#f3f3f4] px-3">
        <span className="flex gap-[6px]" aria-hidden>
          <i className="size-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.18)]" />
          <i className="size-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
          <i className="size-2.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12)]" />
        </span>
        <div className="flex min-w-0 flex-1 justify-center pr-8 text-[12px] font-medium">
          <span className="truncate">{title}</span>
        </div>
      </div>
      <div className={cn("bg-[#f6f6f6]", bodyClassName)}>{children}</div>
    </div>
  );
}

export function Glyph({
  kind,
  name,
  className,
  variant = 0,
}: {
  kind: string;
  name?: string;
  className?: string;
  variant?: number;
}) {
  const size = cn("size-11", className);
  if (kind === "folder") return <MacFolder className={size} />;
  if (kind === "photo") return <PhotoPreview className={size} variant={variant} />;
  if (kind === "film") return <MoviePreview className={size} />;
  if (kind === "cut") return <TimelinePreview className={size} />;
  if (kind === "code") return <CodePreview className={size} />;
  const label = name?.endsWith(".md")
    ? "MD"
    : name?.endsWith(".pdf")
      ? "PDF"
      : name === "Notes"
        ? "NOTE"
        : kind === "doc"
          ? "PDF"
          : "DOC";
  return <DocPreview className={size} label={label} />;
}

export function HdIcon() {
  return (
    <span className="relative block size-[18px] shrink-0">
      <Image src="/media/hdd.png" alt="" fill sizes="18px" className="object-contain" />
    </span>
  );
}

export function Locations({
  volume,
  mounted,
  onShow,
  action = "One click",
}: {
  volume: string;
  mounted: boolean;
  onShow?: () => void;
  action?: string;
}) {
  return (
    <div className="px-2 py-2 text-[13px]">
      <p className="px-2 pt-1 pb-1 text-[11px] font-semibold tracking-wide text-[#6e6e73]">Locations</p>
      <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
        <HdIcon />
        Macintosh HD
      </div>
      {mounted ? (
        <div className="flex items-center gap-2 rounded-md bg-[#0a84ff] px-2 py-1.5 text-white">
          <CoveMark className="size-[21px] shrink-0 text-white" />
          <span className="truncate">{volume}</span>
        </div>
      ) : onShow ? (
        <button
          type="button"
          onClick={onShow}
          className="mt-2 w-full rounded-md bg-[#0e6b56] px-3 py-2.5 text-left text-[13px] font-medium text-white"
        >
          {action}
        </button>
      ) : (
        <p className="px-2 py-1.5 text-[#6e6e73]">Nothing else plugged in.</p>
      )}
    </div>
  );
}
