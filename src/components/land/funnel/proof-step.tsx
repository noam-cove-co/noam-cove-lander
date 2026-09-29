"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { DESK_STORAGE_KEY, funnelDesks, type FunnelDeskId } from "@/config/look-familiar-funnel";
import { NoamSeal } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { FunnelChrome } from "@/components/land/funnel/chrome";

function EmailCase() {
  const note = site.reviews.featured;
  return (
    <div>
      <p className="font-marker inline-block -rotate-2 text-[2.05rem] leading-none font-medium text-[#d01212] sm:text-[2.35rem]">
        {site.reviews.annotation}
      </p>
      <article className="mt-4 overflow-hidden bg-white shadow-[0_22px_50px_-32px_rgba(14,19,32,0.45)] ring-1 ring-black/10">
        <div className="flex h-11 items-center justify-between border-b border-black/8 px-4 text-[15px]">
          <span className="text-[#007aff]">‹ Inbox</span>
          <span className="text-[13px] text-[#6e6e73]">Today</span>
        </div>
        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <h3 className="text-[1.35rem] leading-snug font-semibold tracking-tight sm:text-[1.6rem]">{note.subject}</h3>
          <div className="mt-5 flex items-center gap-3 border-b border-black/8 pb-5">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#8e8e93] text-sm font-medium text-white">
              {note.initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold">{note.from}</p>
              <p className="text-[13px] text-[#6e6e73]">
                To {note.to}
                <span className="px-1.5 text-[#aeaeb2]">·</span>
                {note.role}
              </p>
            </div>
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-[17px] leading-relaxed">
            {note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <div className="mt-8 flex items-start gap-3">
        <NoamSeal className="mt-0.5 size-7 shrink-0 text-muted-foreground" />
        <p className="max-w-xl text-muted-foreground">{note.aside}</p>
      </div>
    </div>
  );
}

export function ProofStep() {
  const [deskId, setDeskId] = useState<FunnelDeskId | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DESK_STORAGE_KEY) as FunnelDeskId | null;
      if (saved && funnelDesks.some((desk) => desk.id === saved)) setDeskId(saved);
    } catch {
      // ignore
    }
  }, []);

  const desk = deskId ? funnelDesks.find((item) => item.id === deskId) : null;
  const quotes = site.reviews.quotes.slice(0, 4);

  return (
    <FunnelChrome stepId="proof">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">{site.reviews.kicker}</p>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {site.reviews.title}
          </h1>
          {desk ? (
            <p className="mt-4 text-base text-muted-foreground">
              You picked <span className="text-foreground">{desk.persona}</span>. Here is how desks like that talk
              about Cove.
            </p>
          ) : null}
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <EmailCase />
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {quotes.map((quote) => (
            <Reveal key={quote.name}>
              <figure>
                <blockquote className="font-serif text-xl leading-snug tracking-[-0.03em] sm:text-2xl">
                  “{quote.quote.replace(/\*/g, "")}”
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-serif text-lg tracking-tight">{quote.name}</p>
                  <p className="mt-0.5 text-[0.78rem] tracking-[0.04em] text-muted-foreground">{quote.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <p className="font-marker text-3xl text-cove">Enough room?</p>
          <p className="mt-3 max-w-md text-base text-muted-foreground">
            Next: join the private beta. Your desk choice and this path stick with the waitlist row.
          </p>
        </Reveal>
      </div>
    </FunnelChrome>
  );
}
