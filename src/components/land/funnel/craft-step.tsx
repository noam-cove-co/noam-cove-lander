"use client";

import { site } from "@/config/site";
import { NoamSeal } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { StaysLightChrome } from "@/components/land/funnel/chrome";

export function CraftStep() {
  const note = site.reviews.featured;

  return (
    <StaysLightChrome stepId="craft" tone="ink">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <Reveal>
            <p className="font-sans text-[0.72rem] font-medium tracking-[0.28em] text-[#3dcea0] uppercase">
              The house
            </p>
            <h1 className="mt-5 max-w-[12ch] font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#f5f6f8] sm:text-6xl">
              Crafted by NOAM Co.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#f5f6f8]/65">
              NOAM Co. A small consultancy. Cove is the product. The studio stays small on purpose.
            </p>
            <div className="mt-10 flex items-start gap-3">
              <NoamSeal className="mt-0.5 size-8 shrink-0 text-[#f5f6f8]/50" />
              <p className="max-w-sm text-sm leading-relaxed text-[#f5f6f8]/45">
                Private beta seats open from the list. Not a storefront. A letter, when it is your turn.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-marker -rotate-2 text-[1.85rem] leading-none text-[#e8a0a0]">
              {site.reviews.annotation}
            </p>
            <article className="mt-4 overflow-hidden bg-[#f5f6f8] text-[#0e1320] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)]">
              <div className="flex h-11 items-center justify-between border-b border-black/8 px-4 text-[15px]">
                <span className="text-[#007aff]">‹ Inbox</span>
                <span className="text-[13px] text-[#6e6e73]">Today</span>
              </div>
              <div className="px-5 py-6 sm:px-7 sm:py-8">
                <h2 className="text-[1.25rem] leading-snug font-semibold tracking-tight sm:text-[1.45rem]">
                  {note.subject}
                </h2>
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
                <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed">
                  {note.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#f5f6f8]/45">{note.aside}</p>
          </Reveal>
        </div>

        <Reveal className="mt-20 border-t border-white/10 pt-12">
          <p className="font-serif text-3xl tracking-[-0.03em] text-[#f5f6f8] sm:text-4xl">
            Enough space to do the work.
          </p>
          <p className="mt-4 max-w-md text-base text-[#f5f6f8]/55">
            Next: reserve a seat on the private beta. The Mac stays light.
          </p>
        </Reveal>
      </div>
    </StaysLightChrome>
  );
}
