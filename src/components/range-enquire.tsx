"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { NoamSeal } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const fieldClass =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-lg text-[#f3f5f7] outline-none placeholder:text-[#93a0b4]/70 focus:border-[#3dcea0]";

export function RangeEnquire() {
  const { range } = site;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [note, setNote] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    if (organisation.trim().length < 2) {
      setMessage("Add the organisation, so we know whose mountain it is.");
      return;
    }
    if (note.trim().length < 8) {
      setMessage("Add a line on the size, and who would mount it.");
      return;
    }

    setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const headline = params.get("v") === "b" ? "b" : params.get("v") === "a" ? "a" : site.experiment.active;

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role: "range",
          mac: "",
          iosInterest: false,
          company,
          organisation,
          note,
          source: "mt-mtn",
          headline,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; already?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setStatus("idle");
        setMessage(data.message ?? "The note did not go through. Try again in a moment.");
        return;
      }
      setStatus(data.already ? "already" : "done");
      track(site.analytics.events.waitlistJoined, {
        source: "mt-mtn",
        role: "range",
        already: Boolean(data.already),
      });
    } catch {
      setStatus("idle");
      setMessage("The note did not go through. Try again in a moment.");
    }
  }

  if (status === "done" || status === "already") {
    return (
      <div role="status">
        <p className="font-serif text-5xl tracking-[-0.03em] text-[#f3f5f7]">Received.</p>
        {status === "already" ? (
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#93a0b4]">
            We already have a note from this address about Mt. Mtn. The studio will write.
          </p>
        ) : (
          <div className="mt-4 flex items-start gap-3">
            <NoamSeal className="mt-0.5 size-7 shrink-0 text-[#93a0b4]" />
            <p className="max-w-md text-base leading-relaxed text-[#93a0b4]">
              A person at NOAM Co. will write. You are not in a queue.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <label className="grid gap-1">
        <span className="text-xs tracking-[0.16em] text-[#93a0b4] uppercase">Name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1">
        <span className="text-xs tracking-[0.16em] text-[#93a0b4] uppercase">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1">
        <span className="text-xs tracking-[0.16em] text-[#93a0b4] uppercase">Organisation</span>
        <input
          value={organisation}
          onChange={(event) => setOrganisation(event.target.value)}
          autoComplete="organization"
          required
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1">
        <span className="text-xs tracking-[0.16em] text-[#93a0b4] uppercase">The size of it</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          required
          rows={4}
          placeholder="Roughly 80 TB. A post house, twelve Macs, the archive."
          className={cn(fieldClass, "resize-y leading-relaxed")}
        />
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
        <p className="text-sm text-[#ffb4a8]" role="alert">
          {message}
        </p>
      ) : null}
      <div>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-12 rounded-md bg-[#3dcea0] px-6 text-[15px] text-[#061018] hover:bg-[#3dcea0]/85"
        >
          {status === "sending" ? "Sending…" : range.enquire.title}
        </Button>
      </div>
    </form>
  );
}
