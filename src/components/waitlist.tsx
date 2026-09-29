"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Laptop } from "lucide-react";
import { macs, roles, site } from "@/config/site";
import { identify, track } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { rememberInvite } from "@/components/invite-gift";
import { CoveMark } from "@/components/brand";
import { Glyph, MacWindow } from "@/components/mac-window";
import { cn } from "cn";

type Intent = { ios?: boolean };

const WaitlistContext = createContext<{
  openWaitlist: (intent?: Intent) => void;
  iosRequested: boolean;
}>({
  openWaitlist: () => {},
  iosRequested: false,
});

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [iosRequested, setIosRequested] = useState(false);

  const value = useMemo(
    () => ({
      iosRequested,
      openWaitlist: (intent?: Intent) => {
        setIosRequested(Boolean(intent?.ios));
        if (pathname === "/") {
          document.getElementById(site.join.id)?.scrollIntoView({ behavior: "smooth" });
        } else if (pathname === "/download") {
          document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(`/#${site.join.id}`);
        }
      },
    }),
    [iosRequested, pathname, router],
  );

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>;
}

const roleGlyph: Record<string, string> = {
  home: "photo",
  marketing: "cut",
  music: "film",
  photo: "photo",
  video: "film",
  agents: "code",
  other: "folder",
};

const macShort: Record<string, string> = {
  air: "Air",
  pro: "Pro",
  studio: "Studio",
  mini: "Mini",
  none: "Later",
};

export function WaitlistForm({
  source,
  iosDefault = false,
  initialStep = 0,
}: {
  source: string;
  iosDefault?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(Math.min(2, Math.max(0, initialStep)));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [mac, setMac] = useState("");
  const [iosInterest, setIosInterest] = useState(iosDefault);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [message, setMessage] = useState("");

  const stages = ["Work", "Mac", "You"] as const;
  const roleLabel = roles.find((item) => item.id === role)?.label;
  const macLabel = macs.find((item) => item.id === mac)?.label;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!role || !mac) {
      setMessage("Choose the work and the Mac first.");
      return;
    }
    setMessage("");
    setStatus("sending");

    const params = new URLSearchParams(window.location.search);
    const headline = params.get("v") === "b" ? "b" : params.get("v") === "a" ? "a" : site.experiment.active;
    const attr = readAttribution();
    const ref = attr.ref ?? params.get("ref") ?? "";

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
          headline,
          ref,
          land: attr.land,
          campaign: attr.utm_campaign || site.campaign.id,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
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
      };
      if (!response.ok || !data.ok) {
        setStatus("idle");
        setMessage(data.message ?? "The list did not take that. Try again in a moment.");
        return;
      }
      if (data.inviteCode) {
        rememberInvite({ code: data.inviteCode, invited: data.invited ?? 0 });
      }
      setStatus(data.already ? "already" : "done");
      identify(email, { name, role, mac, source });
      track(site.analytics.events.waitlistJoined, {
        source,
        role,
        iosInterest,
        already: Boolean(data.already),
        invite_code: data.inviteCode,
        referral_code: ref || null,
      });
    } catch {
      setStatus("idle");
      setMessage("The list did not take that. Try again in a moment.");
    }
  }

  const field =
    "w-full rounded-md border border-black/10 bg-white px-3 py-3 text-[15px] text-[#1d1d1f] outline-none placeholder:text-[#8e8e93] focus:border-[#0e6b56] focus:ring-2 focus:ring-[#0e6b56]/15";

  if (status === "done" || status === "already") {
    return (
      <MacWindow title="Waitlist">
        <div className="px-5 py-8 sm:px-7" role="status">
          <CoveMark className="size-12 text-cove" />
          <p className="mt-4 font-serif text-3xl tracking-[-0.03em] text-[#0e1320] sm:text-4xl">
            {status === "already" ? "Already with us." : "You’re on the list."}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#4c5563] sm:text-base">
            {status === "already"
              ? "We already have your note. We’ll write from the studio when a seat opens."
              : "We’ll write from the studio when a seat opens for the Mac drive."}
          </p>
        </div>
      </MacWindow>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <MacWindow
        title={
          <span className="inline-flex items-center gap-2">
            <CoveMark className="size-4 text-cove" />
            Ask for a seat
          </span>
        }
      >
        <div className="border-b border-black/10 px-4 py-3 sm:px-5">
          <ol className="flex items-center gap-2" aria-label="Steps">
            {stages.map((label, index) => {
              const reachable = index === 0 || (index === 1 && role) || (index === 2 && role && mac);
              const active = step === index;
              const done = index < step;
              return (
                <li key={label} className="flex min-w-0 flex-1 items-center gap-2">
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => reachable && setStep(index)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left disabled:opacity-40",
                      active && "bg-white ring-1 ring-black/10",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-medium tabular-nums",
                        active || done ? "bg-[#0e6b56] text-white" : "bg-black/8 text-[#6e6e73]",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className={cn("truncate text-[13px]", active ? "text-[#0e1320]" : "text-[#6e6e73]")}>
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {(roleLabel || macLabel) && step > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {roleLabel ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] text-[#3c4654] ring-1 ring-black/10">
                  <Glyph kind={roleGlyph[role] ?? "folder"} className="size-3.5" />
                  {roleLabel}
                </span>
              ) : null}
              {macLabel && step > 1 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] text-[#3c4654] ring-1 ring-black/10">
                  <Laptop className="size-3.5" />
                  {macLabel}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="px-4 py-5 sm:px-5 sm:py-6">
          {step === 0 ? (
            <fieldset>
              <legend className="text-[13px] text-[#3c4654]">The drive is mostly for</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {roles.map((item) => {
                  const on = role === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setRole(item.id)}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-[10px] bg-white px-3 py-3 text-left ring-1 transition-colors",
                        on ? "ring-[#0e6b56] ring-2" : "ring-black/10 hover:ring-black/20",
                      )}
                    >
                      <Glyph kind={roleGlyph[item.id] ?? "folder"} className="size-8" />
                      <span className={cn("text-[13px] leading-snug", on ? "text-[#0e1320]" : "text-[#4c5563]")}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset>
              <legend className="text-[13px] text-[#3c4654]">Your Mac</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {macs.map((item) => {
                  const on = mac === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setMac(item.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-[10px] bg-white px-3 py-3.5 text-left ring-1 transition-colors",
                        on ? "ring-[#0e6b56] ring-2" : "ring-black/10 hover:ring-black/20",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-md",
                          on ? "bg-[#e7f3ee] text-cove" : "bg-[#f0f1f3] text-[#6e6e73]",
                        )}
                      >
                        {item.id === "none" ? (
                          <CoveMark className="size-5" />
                        ) : (
                          <Laptop className="size-5" strokeWidth={1.75} />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className={cn("block text-[14px] font-medium", on ? "text-[#0e1320]" : "text-[#1d1d1f]")}>
                          {macShort[item.id] ?? item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-[#6e6e73]">{item.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4">
              <label className="grid gap-1.5 text-[13px] text-[#3c4654]">
                Name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  placeholder="Your name"
                  className={field}
                />
              </label>
              <label className="grid gap-1.5 text-[13px] text-[#3c4654]">
                Email
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@studio.com"
                  className={field}
                />
              </label>
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-[10px] bg-white px-3 py-3 text-[13px] leading-snug text-[#3c4654] ring-1",
                  iosInterest ? "ring-[#0e6b56]" : "ring-black/10",
                )}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-[#0e6b56]"
                  checked={iosInterest}
                  onChange={(event) => setIosInterest(event.target.checked)}
                />
                <span>
                  Also write when iPhone is ready
                  <span className="mt-0.5 block text-[11px] text-[#6e6e73]">Same drive, from your pocket. Not in this beta.</span>
                </span>
              </label>
            </div>
          ) : null}

          <input
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />

          {message ? (
            <p className="mt-4 text-sm text-[#9f1239]" role="alert">
              {message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-black/10 bg-white/50 px-4 py-3.5 sm:px-5">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            className={cn("text-sm text-[#3c4654]", step === 0 && "invisible")}
          >
            Back
          </button>
          {step < 2 ? (
            <button
              type="button"
              disabled={step === 0 ? !role : !mac}
              onClick={() => setStep((current) => current + 1)}
              className="h-11 rounded-md bg-[#0e6b56] px-5 text-[15px] font-medium text-white disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="h-11 rounded-md bg-[#0e6b56] px-5 text-[15px] font-medium text-white disabled:opacity-60"
            >
              {status === "sending" ? "Adding you…" : site.campaign.cta}
            </button>
          )}
        </div>
      </MacWindow>
      <p className="mt-4 text-center text-xs text-[#5c6570]">One letter, when a seat opens. No newsletter.</p>
    </form>
  );
}
