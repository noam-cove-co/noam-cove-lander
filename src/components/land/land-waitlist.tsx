"use client";

import { useEffect, useState } from "react";
import { macs, roles, site } from "@/config/site";
import { identify, track } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { rememberInvite } from "@/components/invite-gift";
import { CoveMark } from "@/components/brand";
import { cn } from "cn";

type Result = {
  inviteCode: string;
  invited: number;
  rank: number | null;
  already: boolean;
};

export function LandWaitlist({
  source,
  land,
  campaign,
  dark = false,
}: {
  source: string;
  land: string;
  campaign: string;
  dark?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("home");
  const [mac, setMac] = useState("air");
  const [iosInterest, setIosInterest] = useState(false);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const attr = readAttribution();
    const deskToRole: Record<string, string> = {
      home: "home",
      marketing: "marketing",
      studio: "video",
      agents: "agents",
    };
    if (attr.desk && deskToRole[attr.desk]) setRole(deskToRole[attr.desk]);
    track(site.analytics.events.waitlistStarted, {
      source,
      land,
      campaign,
      funnel: attr.funnel ?? null,
      funnel_step: attr.funnel_step ?? null,
      desk: attr.desk ?? null,
    });
  }, [source, land, campaign]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    setStatus("sending");
    const attr = readAttribution();
    const ref = attr.ref ?? new URLSearchParams(window.location.search).get("ref") ?? "";

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          mac,
          iosInterest,
          company,
          source,
          land,
          campaign,
          headline: site.experiment.active,
          ref,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign ?? campaign,
          utm_content: attr.utm_content,
          utm_term: attr.utm_term,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        already?: boolean;
        message?: string;
        inviteCode?: string;
        invited?: number;
        rank?: number | null;
      };
      if (!response.ok || !data.ok || !data.inviteCode) {
        setStatus("idle");
        setMessage(data.message ?? "The list did not take that. Try again in a moment.");
        return;
      }

      const next: Result = {
        inviteCode: data.inviteCode,
        invited: data.invited ?? 0,
        rank: data.rank ?? null,
        already: Boolean(data.already),
      };
      rememberInvite({ code: next.inviteCode, invited: next.invited });
      setResult(next);
      setStatus("done");
      identify(email, { name, role, mac, land, campaign });
      track(site.analytics.events.waitlistJoined, {
        source,
        land,
        campaign,
        role,
        iosInterest,
        already: next.already,
        invite_code: next.inviteCode,
        rank: next.rank,
        referral_code: ref || null,
        funnel: attr.funnel ?? null,
        funnel_step: "list",
        desk: attr.desk ?? null,
      });
    } catch {
      setStatus("idle");
      setMessage("The list did not take that. Try again in a moment.");
    }
  }

  async function copyInvite() {
    if (!result) return;
    const url = `${window.location.origin}/land/join-the-list?ref=${result.inviteCode}&utm_source=invite&utm_medium=referral&utm_campaign=${campaign}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track(site.analytics.events.inviteCopied, { land, invite_code: result.inviteCode });
      track(site.analytics.events.inviteShared, { land, invite_code: result.inviteCode, method: "clipboard" });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setMessage("Copy failed. Select the link and copy it yourself.");
    }
  }

  const field = dark
    ? "w-full rounded-md border border-white/15 bg-white/5 px-3 py-3 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-[#3dcea0] focus:ring-2 focus:ring-[#3dcea0]/20"
    : "w-full rounded-md border border-black/10 bg-white px-3 py-3 text-[15px] text-[#1d1d1f] outline-none placeholder:text-[#8e8e93] focus:border-[#0e6b56] focus:ring-2 focus:ring-[#0e6b56]/15";

  if (status === "done" && result) {
    const inviteUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/land/join-the-list?ref=${result.inviteCode}&utm_source=invite&utm_medium=referral&utm_campaign=${campaign}`
        : "";
    return (
      <div
        className={cn(
          "rounded-[14px] p-6 sm:p-8",
          dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-foreground/10 shadow-[0_22px_50px_-36px_rgba(14,19,32,0.4)]",
        )}
        role="status"
      >
        <CoveMark className={cn("size-12", dark ? "text-[#3dcea0]" : "text-cove")} />
        <p className={cn("mt-4 font-serif text-3xl tracking-[-0.03em] sm:text-4xl", dark ? "text-white" : "text-[#0e1320]")}>
          {result.already ? "Already with us." : "You’re on the list."}
        </p>
        <p className={cn("mt-3 max-w-md text-sm leading-relaxed sm:text-base", dark ? "text-white/65" : "text-[#4c5563]")}>
          {result.rank
            ? `You’re number ${result.rank} on the ladder. Invite someone and climb.`
            : "We’ll write from the studio when a seat opens. Invite a friend to move up."}
        </p>
        <div className={cn("mt-6 rounded-md px-4 py-3 text-sm", dark ? "bg-black/40 text-white/80" : "bg-[#f5f6f8] text-[#3c4654]")}>
          <p className="text-[11px] tracking-[0.16em] uppercase opacity-70">Your invite link</p>
          <p className="mt-1 break-all font-mono text-[13px]">{inviteUrl}</p>
        </div>
        <button
          type="button"
          onClick={copyInvite}
          className={cn(
            "mt-4 h-11 rounded-md px-5 text-[15px] font-medium",
            dark ? "bg-[#3dcea0] text-[#061018]" : "bg-cove text-white",
          )}
        >
          {copied ? "Copied" : "Copy invite link"}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-[14px] p-6 sm:p-8",
        dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-foreground/10 shadow-[0_22px_50px_-36px_rgba(14,19,32,0.4)]",
      )}
    >
      <p className={cn("text-[0.72rem] font-medium tracking-[0.18em] uppercase", dark ? "text-[#3dcea0]" : "text-cove")}>
        Private beta
      </p>
      <h2 className={cn("mt-2 font-serif text-3xl tracking-[-0.03em]", dark ? "text-white" : "text-[#0e1320]")}>
        Join the list
      </h2>
      <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/60" : "text-muted-foreground")}>
        One letter when a seat opens. Invite friends to climb higher.
      </p>

      <div className="mt-6 grid gap-4">
        <label className={cn("grid gap-1.5 text-[13px]", dark ? "text-white/70" : "text-[#3c4654]")}>
          Name
          <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className={cn("grid gap-1.5 text-[13px]", dark ? "text-white/70" : "text-[#3c4654]")}>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={field}
            placeholder="you@studio.com"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={cn("grid gap-1.5 text-[13px]", dark ? "text-white/70" : "text-[#3c4654]")}>
            Desk
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                track(site.analytics.events.waitlistStep, { land, step: "role", role: e.target.value });
              }}
              className={field}
            >
              {roles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className={cn("grid gap-1.5 text-[13px]", dark ? "text-white/70" : "text-[#3c4654]")}>
            Mac
            <select
              value={mac}
              onChange={(e) => {
                setMac(e.target.value);
                track(site.analytics.events.waitlistStep, { land, step: "mac", mac: e.target.value });
              }}
              className={field}
            >
              {macs.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className={cn("flex cursor-pointer items-start gap-3 text-[13px]", dark ? "text-white/70" : "text-[#3c4654]")}>
          <input
            type="checkbox"
            className="mt-0.5 size-4 accent-[#0e6b56]"
            checked={iosInterest}
            onChange={(e) => setIosInterest(e.target.checked)}
          />
          <span>Also write when iPhone is ready</span>
        </label>
      </div>

      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={company} onChange={(e) => setCompany(e.target.value)} />

      {message ? (
        <p className="mt-4 text-sm text-[#f87171]" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "mt-6 h-12 w-full rounded-md px-5 text-[15px] font-medium disabled:opacity-60 sm:w-auto",
          dark ? "bg-[#3dcea0] text-[#061018]" : "bg-cove text-white",
        )}
      >
        {status === "sending" ? "Adding you…" : site.campaign.cta}
      </button>
    </form>
  );
}
