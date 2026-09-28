"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { macs, roles, site } from "@/config/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";

type Intent = { ios?: boolean };

const WaitlistContext = createContext<{ openWaitlist: (intent?: Intent) => void }>({
  openWaitlist: () => {},
});

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [ios, setIos] = useState(false);

  const value = useMemo(
    () => ({
      openWaitlist: (intent?: Intent) => {
        setIos(Boolean(intent?.ios));
        setOpen(true);
      },
    }),
    [],
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl bg-background/95 p-6 backdrop-blur-xl sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl font-normal tracking-tight">
              Join the private beta
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              The Mac drive is not public yet. Leave your name and we will write when a seat opens.
            </DialogDescription>
          </DialogHeader>
          <WaitlistForm source="dialog" iosDefault={ios} key={`${open}-${ios}`} />
        </DialogContent>
      </Dialog>
    </WaitlistContext.Provider>
  );
}

export function WaitlistForm({
  source,
  iosDefault = false,
}: {
  source: string;
  iosDefault?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [mac, setMac] = useState("");
  const [iosInterest, setIosInterest] = useState(iosDefault);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
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

  if (status === "done" || status === "already") {
    return (
      <div className="rounded-2xl bg-mist px-4 py-5" role="status">
        <p className="font-serif text-2xl tracking-tight text-pine">You’re on the list.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {status === "already"
            ? "We already have your note. We’ll write from the studio when a seat opens."
            : "We’ll write from the studio when a seat opens for the Mac drive."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor={`${source}-name`}>Name</Label>
        <Input
          id={`${source}-name`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          className="h-11 rounded-xl bg-white/70 px-3"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${source}-email`}>Email</Label>
        <Input
          id={`${source}-email`}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          className="h-11 rounded-xl bg-white/70 px-3"
        />
      </div>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">The drive is mostly for</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={role === item.id}
              onClick={() => setRole(item.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm ring-1 ring-foreground/10",
                role === item.id ? "bg-pine text-paper" : "bg-white/70 text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Your Mac</legend>
        <div className="flex flex-wrap gap-2">
          {macs.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mac === item.id}
              onClick={() => setMac(item.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm ring-1 ring-foreground/10",
                mac === item.id ? "bg-pine text-paper" : "bg-white/70 text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="flex items-start gap-2 text-sm leading-snug text-muted-foreground">
        <input
          type="checkbox"
          className="mt-0.5 size-4 accent-[#0e6b56]"
          checked={iosInterest}
          onChange={(event) => setIosInterest(event.target.checked)}
        />
        Also write when the iPhone version is ready.
      </label>
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />
      {message ? (
        <p className="text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "sending" || !role} className="h-12 rounded-full text-[15px]">
        {status === "sending" ? "Adding you…" : site.campaign.cta}
      </Button>
      <p className="text-xs text-muted-foreground">One letter, when a seat opens. No newsletter.</p>
    </form>
  );
}
