"use client";

import { useId } from "react";
import { cn } from "cn";

function gid(raw: string) {
  return raw.replace(/:/g, "");
}

export function MacFolder({ className }: { className?: string }) {
  const id = gid(useId());
  return (
    <svg viewBox="0 0 64 52" className={cn("drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]", className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3ff" />
          <stop offset="1" stopColor="#4aa6ea" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ec4fb" />
          <stop offset="0.45" stopColor="#3aa0f0" />
          <stop offset="1" stopColor="#1b7ed6" />
        </linearGradient>
      </defs>
      <path d="M4 16c0-3.2 2.4-5.4 5.6-5.4h16.2l4.4 5.2H54c3.2 0 6 2.4 6 5.6V20H4V16Z" fill={`url(#${id}-back)`} />
      <path d="M4 19.5h56v24.2c0 3.6-2.8 6.3-6.4 6.3H10.4C6.8 50 4 47.3 4 43.7V19.5Z" fill={`url(#${id}-front)`} />
      <path d="M4 26h56" stroke="#fff" strokeOpacity="0.28" />
    </svg>
  );
}

export function InternalDrive({ className }: { className?: string }) {
  const id = gid(useId());
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7f7f8" />
          <stop offset="0.5" stopColor="#d9dbe0" />
          <stop offset="1" stopColor="#b7bcc6" />
        </linearGradient>
      </defs>
      <rect x="10" y="8" width="44" height="48" rx="8" fill={`url(#${id}-body)`} stroke="#8d939e" strokeWidth="1" />
      <rect x="16" y="14" width="32" height="22" rx="3" fill="#eef1f4" stroke="#c5c9d1" />
      <circle cx="32" cy="46" r="3.2" fill="#9aa1ab" />
      <circle cx="32" cy="46" r="1.3" fill="#e8eaee" />
    </svg>
  );
}

export function CoveVolume({ className }: { className?: string }) {
  const id = gid(useId());
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f7f6" />
          <stop offset="1" stopColor="#c5d0cb" />
        </linearGradient>
      </defs>
      <rect x="8" y="14" width="48" height="36" rx="7" fill={`url(#${id}-body)`} stroke="#8ea097" />
      <path d="M34 24.8a7.6 7.6 0 1 0 .2 14.2" fill="none" stroke="#0e6b56" strokeWidth="2.15" strokeLinecap="round" />
      <circle cx="29.2" cy="32" r="1.55" fill="#0e6b56" />
      <rect x="14" y="42" width="36" height="3" rx="1.5" fill="#9aaba3" />
    </svg>
  );
}

export function PhotoPreview({ className, variant = 0 }: { className?: string; variant?: number }) {
  const id = gid(useId());
  const sky = variant % 2 === 0 ? ["#f6d7a8", "#f08a5d", "#2f6f8f"] : ["#d7e6f5", "#8fb4d6", "#245c4a"];
  return (
    <svg viewBox="0 0 64 64" className={cn("drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]", className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="0.55" stopColor={sky[1]} />
          <stop offset="1" stopColor={sky[2]} />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="56" height="52" rx="4" fill="#fff" />
      <rect x="7" y="9" width="50" height="46" rx="2" fill={`url(#${id}-sky)`} />
      <circle cx={variant % 2 === 0 ? 44 : 18} cy="20" r="5" fill="#fff4d2" />
      <path d="M7 40l12-10 10 8 8-6 20 16v7H7V40Z" fill={variant % 2 === 0 ? "#1d4c46" : "#16382e"} />
      <path d="M7 46l14-8 8 6 22-12v23H7V46Z" fill="#0e1320" fillOpacity="0.55" />
    </svg>
  );
}

export function MoviePreview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]", className)} aria-hidden>
      <rect x="4" y="8" width="56" height="48" rx="4" fill="#1a1c22" />
      <rect x="4" y="8" width="56" height="8" fill="#2a2e38" />
      <rect x="4" y="48" width="56" height="8" fill="#2a2e38" />
      {[10, 20, 30, 40, 50].map((x) => (
        <rect key={x} x={x} y="10" width="5" height="4" rx="0.6" fill="#f3f5f7" fillOpacity="0.85" />
      ))}
      {[10, 20, 30, 40, 50].map((x) => (
        <rect key={`b-${x}`} x={x} y="50" width="5" height="4" rx="0.6" fill="#f3f5f7" fillOpacity="0.85" />
      ))}
      <circle cx="32" cy="32" r="8" fill="#f3f5f7" fillOpacity="0.92" />
      <path d="M30 27.5v9l8-4.5-8-4.5Z" fill="#1a1c22" />
    </svg>
  );
}

export function DocPreview({ className, label = "PDF" }: { className?: string; label?: string }) {
  const red = label === "PDF";
  return (
    <svg viewBox="0 0 64 64" className={cn("drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)]", className)} aria-hidden>
      <path d="M16 6h22l12 12v40a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z" fill="#fff" stroke="#d0d4dc" />
      <path d="M38 6v10a2 2 0 0 0 2 2h10" fill="#e6e9ef" />
      <rect x="14" y="40" width="36" height="14" rx="2" fill={red ? "#e24b3b" : "#3d6b9a"} />
      <text x="32" y="50.5" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="ui-sans-serif, system-ui, sans-serif" fontWeight="700">
        {label}
      </text>
    </svg>
  );
}

export function CodePreview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]", className)} aria-hidden>
      <rect x="6" y="8" width="52" height="48" rx="4" fill="#1c2430" />
      <rect x="6" y="8" width="52" height="8" rx="4" fill="#2a3544" />
      <circle cx="12" cy="12" r="1.3" fill="#ff5f57" />
      <circle cx="17" cy="12" r="1.3" fill="#febc2e" />
      <circle cx="22" cy="12" r="1.3" fill="#28c840" />
      <path d="M14 28l-4 4 4 4M22 24l6 12M28 28l4 4-4 4" fill="none" stroke="#7dcea0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 30h12M36 36h8" stroke="#9bb0c9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TimelinePreview({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]", className)} aria-hidden>
      <rect x="5" y="8" width="54" height="48" rx="4" fill="#241c28" />
      <rect x="10" y="18" width="28" height="6" rx="1.5" fill="#e37b54" />
      <rect x="18" y="28" width="34" height="6" rx="1.5" fill="#d4b15a" />
      <rect x="12" y="38" width="22" height="6" rx="1.5" fill="#6aa8c9" />
      <path d="M40 8v48" stroke="#fff" strokeOpacity="0.35" />
    </svg>
  );
}

export function FileArt({
  kind,
  name,
  className,
}: {
  kind: string;
  name?: string;
  className?: string;
}) {
  if (kind === "folder") return <MacFolder className={className} />;
  if (kind === "photo") return <PhotoPreview className={className} variant={name?.includes("banner") || name?.includes("contact") ? 1 : 0} />;
  if (kind === "film") return <MoviePreview className={className} />;
  if (kind === "code") return <CodePreview className={className} />;
  if (kind === "cut") return <TimelinePreview className={className} />;
  const label = name?.endsWith(".md") ? "MD" : name?.endsWith(".pdf") ? "PDF" : "DOC";
  return <DocPreview className={className} label={label} />;
}

export function SidebarGlyph({ name }: { name: "recents" | "apps" | "desktop" | "documents" | "downloads" | "hd" | "volume" }) {
  const common = "size-[18px] shrink-0";
  if (name === "recents") {
    return (
      <svg viewBox="0 0 18 18" className={common} aria-hidden>
        <circle cx="9" cy="9" r="7" fill="#8e8e93" />
        <path d="M9 5.2V9l2.6 1.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "apps") {
    return (
      <svg viewBox="0 0 18 18" className={common} aria-hidden>
        <rect x="2" y="2" width="6" height="6" rx="1.4" fill="#ff5f57" />
        <rect x="10" y="2" width="6" height="6" rx="1.4" fill="#febc2e" />
        <rect x="2" y="10" width="6" height="6" rx="1.4" fill="#28c840" />
        <rect x="10" y="10" width="6" height="6" rx="1.4" fill="#0a84ff" />
      </svg>
    );
  }
  if (name === "desktop") {
    return (
      <svg viewBox="0 0 18 18" className={common} aria-hidden>
        <rect x="2" y="3" width="14" height="9" rx="1.4" fill="#5ac8fa" />
        <path d="M7 14.5h4M9 12v2.5" stroke="#8e8e93" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "documents") {
    return <MacFolder className={common} />;
  }
  if (name === "downloads") {
    return (
      <svg viewBox="0 0 18 18" className={common} aria-hidden>
        <circle cx="9" cy="9" r="7" fill="#32ade6" />
        <path d="M9 5.2v5.2M6.8 8.6 9 11.2l2.2-2.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "volume") return <CoveVolume className={common} />;
  return <InternalDrive className={common} />;
}

export function ViewIcon({ mode }: { mode: "icon" | "list" | "column" | "gallery" }) {
  if (mode === "list") {
    return (
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (mode === "column") {
    return (
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <rect x="1.5" y="2.5" width="3.5" height="11" rx="0.6" fill="currentColor" />
        <rect x="6.2" y="2.5" width="3.5" height="11" rx="0.6" fill="currentColor" />
        <rect x="11" y="2.5" width="3.5" height="11" rx="0.6" fill="currentColor" />
      </svg>
    );
  }
  if (mode === "gallery") {
    return (
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <rect x="1.5" y="2" width="13" height="8" rx="1" fill="currentColor" />
        <path d="M2 13h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
      <rect x="2" y="2" width="5" height="5" rx="0.8" fill="currentColor" />
      <rect x="9" y="2" width="5" height="5" rx="0.8" fill="currentColor" />
      <rect x="2" y="9" width="5" height="5" rx="0.8" fill="currentColor" />
      <rect x="9" y="9" width="5" height="5" rx="0.8" fill="currentColor" />
    </svg>
  );
}
