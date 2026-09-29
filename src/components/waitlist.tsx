"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { macs, roles, site } from "@/config/site";
import { track } from "@/lib/analytics";
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

export function WaitlistForm({
  source,
  iosDefault = false,
}: {
  source: string;
  iosDefault?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [mac, setMac] = useState("");
  const [iosInterest, setIosInterest] = useState(iosDefault);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [message, setMessage] = useState("");

  const stages = ["Work", "Mac", "You"] as const;

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

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, mac, iosInterest, company, source, headline }),
      });
      const data = (await response.json()) as { ok?: boolean; already?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setStatus("idle");
        setMessage(data.message ?? "The list did not take that. Try again in a moment.");
        return;
      }
      setStatus(data.already ? "already" : "done");
      track(site.analytics.events.waitlistJoined, { source, role, iosInterest, already: Boolean(data.already) });
    } catch {
      setStatus("idle");
      setMessage("The list did not take that. Try again in a moment.");
    }
  }

  const field =
    "w-full border-0 border-b border-black/15 bg-transparent py-3 text-lg text-[#1d1d1f] outline-none placeholder:text-[#8e8e93] focus:border-[#0e6b56]";

  if (status === "done" || status === "already") {
    return (
      <div role="status">
        <p className="font-serif text-4xl tracking-[-0.03em] text-[#0e1320]">
          {status === "already" ? "Already with us." : "You’re on the list."}
        </p>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[#4c5563]">
          {status === "already"
            ? "We already have your note. We’ll write from the studio when a seat opens."
            : "We’ll write from the studio when a seat opens for the Mac drive."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <ol className="flex gap-6 border-b border-black/10 pb-3 text-sm">
        {stages.map((label, index) => (
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
              onChange={(event) => setIosInterest(event.target.checked)}
            />
            Also write when the iPhone version is ready.
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
      <p className="mt-4 text-xs text-[#5c6570]">One letter, when a seat opens. No newsletter.</p>
    </form>
  );
}
