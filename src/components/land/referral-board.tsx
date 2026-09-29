"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { readStoredInvite } from "@/components/invite-gift";
import { cn } from "cn";

type Row = { rank: number; name: string; invites: number; you?: boolean };

export function ReferralBoard({
  dark = false,
  land = "join-the-list",
}: {
  dark?: boolean;
  land?: string;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const you = readStoredInvite()?.code;
    track(site.analytics.events.leaderboardViewed, { land });
    void fetch(`/api/waitlist/leaderboard?limit=5${you ? `&you=${encodeURIComponent(you)}` : ""}`, {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then((data: { ok?: boolean; rows?: Row[] }) => {
        if (data.ok && Array.isArray(data.rows)) setRows(data.rows);
      })
      .finally(() => setLoading(false));
  }, [land]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px]",
        dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-foreground/10 shadow-[0_22px_50px_-36px_rgba(14,19,32,0.4)]",
      )}
    >
      <div className="px-5 pt-5 pb-3 sm:px-6">
        <p className={cn("text-[0.72rem] font-medium tracking-[0.18em] uppercase", dark ? "text-[#3dcea0]" : "text-cove")}>
          The ladder
        </p>
        <h3 className={cn("mt-2 font-serif text-2xl tracking-[-0.03em] sm:text-3xl", dark ? "text-white" : "text-foreground")}>
          Invite someone. Climb the list.
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/60" : "text-muted-foreground")}>
          Seats open from the top. Each invite moves you up.
        </p>
      </div>
      <div
        className="grid grid-cols-[64px_1fr_72px] gap-2 border-y px-5 py-2.5 font-sans text-[11px] tracking-[0.14em] uppercase sm:px-6"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(14,19,32,0.08)",
          color: dark ? "rgba(255,255,255,0.45)" : "#6e6e73",
        }}
      >
        <span>Rank</span>
        <span>On the list</span>
        <span className="text-right">Invites</span>
      </div>
      {loading ? (
        <p className={cn("px-5 py-8 text-sm sm:px-6", dark ? "text-white/50" : "text-muted-foreground")}>Loading the ladder…</p>
      ) : (
        rows.map((row) => (
          <div
            key={`${row.rank}-${row.name}`}
            className="grid grid-cols-[64px_1fr_72px] items-center gap-2 px-5 sm:px-6"
            style={{
              minHeight: 56,
              background: row.you ? (dark ? "rgba(61,206,160,0.12)" : "rgba(14,107,86,0.08)") : "transparent",
              borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(14,19,32,0.06)"}`,
              color: dark ? "#f7f8fa" : "#0e1320",
            }}
          >
            <span
              className="font-serif text-[1.65rem] tabular-nums tracking-[-0.03em]"
              style={{ color: row.you ? (dark ? "#3dcea0" : "#0e6b56") : undefined }}
            >
              {String(row.rank).padStart(2, "0")}
            </span>
            <span className="text-[15px]" style={{ fontWeight: row.you ? 600 : 400 }}>
              {row.name}
              {row.you ? (
                <span className="ml-2 text-[11px] tracking-[0.14em] uppercase" style={{ color: dark ? "#3dcea0" : "#0e6b56" }}>
                  You
                </span>
              ) : null}
            </span>
            <span className={cn("text-right tabular-nums text-[15px]", dark ? "text-white/55" : "text-muted-foreground")}>
              {row.invites}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
