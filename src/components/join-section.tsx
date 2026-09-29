"use client";

import { useState } from "react";
import { macs, roles, site } from "@/config/site";
import { track } from "@/lib/analytics";
import { InviteGift, rememberInvite, type SavedInvite } from "@/components/invite-gift";
import { useWaitlist } from "@/components/waitlist";
import { cn } from "cn";

const { join } = site;

export function JoinSection() {
  const { iosRequested } = useWaitlist();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [mac, setMac] = useState("");
  const [iosChoice, setIosChoice] = useState<boolean | null>(null);
  const iosInterest = iosChoice ?? iosRequested;
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [message, setMessage] = useState("");
  const [invite, setInvite] = useState<SavedInvite | null>(null);

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
    const ref = params.get("ref") ?? "";

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, mac, iosInterest, company, source: "page", headline, ref }),
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
      if (typeof data.inviteCode === "string" && /^[a-z0-9]{4,16}$/.test(data.inviteCode)) {
        const next = {
          code: data.inviteCode,
          invited: typeof data.invited === "number" && data.invited > 0 ? Math.floor(data.invited) : 0,
        };
        setInvite(next);
        rememberInvite(next);
      }
      setStatus(data.already ? "already" : "done");
      track(site.analytics.events.waitlistJoined, { source: "page", role, iosInterest, already: Boolean(data.already) });
    } catch {
      setStatus("idle");
      setMessage("The list did not take that. Try again in a moment.");
    }
  }

  const field =
    "w-full border-0 border-b border-black/15 bg-transparent py-3 text-lg text-[#1d1d1f] outline-none placeholder:text-[#8e8e93] focus:border-[#0e6b56]";

  return (
    <section id={join.id} className="relative isolate scroll-mt-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 85% 110%, rgba(14,107,86,0.35), transparent 55%), linear-gradient(165deg, #d5dee6 0%, #efe8df 46%, #c5d4cc 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-[0.72rem] font-medium tracking-[0.22em] text-[#0e6b56] uppercase">{join.kicker}</p>
        <h2 className="mt-3 font-serif text-5xl tracking-[-0.04em] text-[#0e1320] sm:text-6xl">{join.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-[#3c4654]">{join.body}</p>

        {status === "done" || status === "already" ? (
          <div className="mt-10" role="status">
            <p className="font-serif text-4xl tracking-[-0.03em] text-[#0e1320]">
              {status === "already" ? "Already with us." : join.done}
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[#4c5563]">
              {status === "already" ? join.already : join.doneBody}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10">
            <ol className="flex gap-6 border-b border-black/10 pb-3 text-sm">
              {join.stages.map((label, index) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (index === 0 || (index === 1 && role) || (index === 2 && role && mac)) setStep(index);
                    }}
                    className={cn(
                      "border-b-2 pb-3 -mb-[13px]",
                      step === index ? "border-[#0e6b56] text-[#0e1320]" : "border-transparent text-[#5c6570]",
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ol>

            {step === 0 ? (
              <fieldset className="mt-8 grid gap-1">
                <legend className="text-sm text-[#3c4654]">The drive is mostly for</legend>
                <div className="mt-3 flex flex-col">
                  {roles.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={role === item.id}
                      onClick={() => setRole(item.id)}
                      className={cn(
                        "border-b border-black/10 py-3 text-left text-lg",
                        role === item.id ? "text-[#0e1320]" : "text-[#6e6e73]",
                      )}
                    >
                      <span className={cn("border-b-2 pb-0.5", role === item.id ? "border-[#0e6b56]" : "border-transparent")}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 1 ? (
              <fieldset className="mt-8 grid gap-1">
                <legend className="text-sm text-[#3c4654]">Your Mac</legend>
                <div className="mt-3 flex flex-col">
                  {macs.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={mac === item.id}
                      onClick={() => setMac(item.id)}
                      className={cn(
                        "border-b border-black/10 py-3 text-left text-lg",
                        mac === item.id ? "text-[#0e1320]" : "text-[#6e6e73]",
                      )}
                    >
                      <span className={cn("border-b-2 pb-0.5", mac === item.id ? "border-[#0e6b56]" : "border-transparent")}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : null}

            {step === 2 ? (
              <div className="mt-8 grid gap-5">
                <label className="grid gap-1 text-sm text-[#3c4654]">
                  Name
                  <input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={field} />
                </label>
                <label className="grid gap-1 text-sm text-[#3c4654]">
                  Email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    className={field}
                  />
                </label>
                <label className="flex items-start gap-2 text-sm leading-snug text-[#3c4654]">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-4 accent-[#0e6b56]"
                    checked={iosInterest}
                    onChange={(event) => setIosChoice(event.target.checked)}
                  />
                  {join.ios}
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

            <div className="mt-8 flex items-center justify-between gap-4">
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
                  className="h-12 rounded-md bg-[#0e6b56] px-5 text-[15px] font-medium text-white disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-12 rounded-md bg-[#0e6b56] px-5 text-[15px] font-medium text-white disabled:opacity-60"
                >
                  {status === "sending" ? "Adding you…" : site.campaign.cta}
                </button>
              )}
            </div>
            <p className="mt-4 text-xs text-[#5c6570]">{join.fine}</p>
          </form>
        )}
        <InviteGift invite={invite} />
      </div>
    </section>
  );
}
