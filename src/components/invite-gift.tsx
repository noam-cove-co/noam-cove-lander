"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { cn } from "cn";

const { gift } = site.join;
const storageKey = "cove_invite";

export type SavedInvite = {
  code: string;
  invited: number;
};

function asInvite(value: unknown): SavedInvite | null {
  if (!value || typeof value !== "object") return null;
  const parsed = value as { code?: unknown; invited?: unknown };
  if (typeof parsed.code !== "string" || !/^[a-z0-9]{4,16}$/.test(parsed.code)) return null;
  const invited =
    typeof parsed.invited === "number" && Number.isFinite(parsed.invited) && parsed.invited > 0
      ? Math.floor(parsed.invited)
      : 0;
  return { code: parsed.code, invited };
}

export function readStoredInvite(): SavedInvite | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    return asInvite(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function rememberInvite(invite: SavedInvite) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(invite));
  } catch {
    // The link still shows for this visit.
  }
}

function invitedLine(count: number) {
  if (count === 1) return gift.invitedOne;
  return `${count} ${gift.invitedOther}`;
}

function Present({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
      <rect x="7" y="22" width="34" height="20" rx="2" fill="#f5f6f8" stroke="#0e1320" strokeWidth="1.4" />
      <path d="M8 31h32" stroke="#0e6b56" strokeWidth="2.4" />
      <g className={cn("transition-transform duration-300", open && "-translate-y-1")}>
        <rect x="5" y="16" width="38" height="8" rx="2" fill="#f5f6f8" stroke="#0e1320" strokeWidth="1.4" />
        <path d="M24 16c-2.2-7.2-12-8.2-14-3.4-1.5 3.6 5.2 5.2 14 3.4z" fill="#0e6b56" />
        <path d="M24 16c2.2-7.2 12-8.2 14-3.4 1.5 3.6-5.2 5.2-14 3.4z" fill="#0e6b56" />
      </g>
      <path d="M24 16.6v24.4" stroke="#0e6b56" strokeWidth="2.4" />
    </svg>
  );
}

export function InviteGift({ invite }: { invite: SavedInvite | null }) {
  const [open, setOpen] = useState(false);
  const [stored, setStored] = useState<SavedInvite | null>(null);
  const [countFor, setCountFor] = useState<SavedInvite | null>(null);
  const [copied, setCopied] = useState(false);
  const linkRef = useRef<HTMLParagraphElement>(null);
  const copiedTimer = useRef<number | null>(null);
  const request = useRef(0);
  const shown = invite ?? stored;
  const invited = Math.max(shown?.invited ?? 0, countFor && shown && countFor.code === shown.code ? countFor.invited : 0);

  async function refresh(code: string) {
    const ticket = request.current + 1;
    request.current = ticket;
    try {
      const response = await fetch(`/api/waitlist?ref=${encodeURIComponent(code)}`, { cache: "no-store" });
      if (!response.ok || ticket !== request.current) return;
      const data = (await response.json()) as { ok?: boolean; invited?: number };
      if (ticket !== request.current || !data.ok || typeof data.invited !== "number" || !Number.isFinite(data.invited)) return;
      const next = { code, invited: data.invited > 0 ? Math.floor(data.invited) : 0 };
      setCountFor(next);
      const saved = readStoredInvite();
      if (saved?.code === code) rememberInvite({ code, invited: Math.max(saved.invited, next.invited) });
    } catch {
      // Keep the count already on the note.
    }
  }

  function onToggle() {
    const next = !open;
    if (next) {
      const fromDisk = readStoredInvite();
      setStored(fromDisk);
      const code = invite?.code ?? fromDisk?.code;
      if (code) void refresh(code);
    }
    setOpen(next);
  }

  async function onCopy() {
    const text = linkRef.current?.textContent?.trim() ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  const link = shown && open ? `${window.location.origin}/?ref=${shown.code}#join` : "";

  return (
    <div className="mt-14">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="invite-gift"
        onClick={onToggle}
        className="flex items-center gap-3 rounded-[0.375rem] text-left"
      >
        <Present open={open} />
        <span>
          <span className="block font-serif text-[1.35rem] leading-none tracking-[-0.03em] text-[#0e1320]">{gift.title}</span>
          <span className="mt-1 block text-xs text-[#5c6570]">{open ? gift.close : gift.unwrap}</span>
        </span>
      </button>
      {open ? (
        <div
          id="invite-gift"
          className="mt-4 max-w-sm animate-in fade-in slide-in-from-top-1 rounded-[0.375rem] border border-[#0e1320]/10 bg-[#f5f6f8] px-4 py-3.5 duration-300"
        >
          <p className="text-sm leading-relaxed text-[#3c4654]">{gift.body}</p>
          {shown ? (
            <div className="mt-3">
              <p className="text-xs text-[#5c6570]">{gift.linkLabel}</p>
              <p ref={linkRef} className="mt-1 break-all text-[13px] leading-snug text-[#0e1320]">
                {link}
              </p>
              <button
                type="button"
                onClick={onCopy}
                className="mt-3 inline-flex h-9 items-center rounded-[0.375rem] bg-[#0e6b56] px-3 text-sm font-medium text-white"
              >
                {copied ? gift.copied : gift.copy}
              </button>
              {invited > 0 ? <p className="mt-3 text-sm text-[#0e6b56]">{invitedLine(invited)}</p> : null}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-[#0e1320]">{gift.waiting}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
