"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { Kicker } from "@/components/section";
import { cn } from "cn";

export function Audiences() {
  const desks = site.desks;
  const [id, setId] = useState("marketing");
  const reduce = useReducedMotion();
  const desk = desks.find((item) => item.id === id) ?? desks[1];

  return (
    <section id={site.audiences.id} className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Kicker>{site.audiences.kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl">
        {site.audiences.title}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{site.audiences.intro}</p>

      <div className="mt-10 grid gap-8 border-t border-foreground/10 pt-8 sm:grid-cols-2">
        <Compare
          label="At home"
          text="Years of family photos and videos, open on the Mac, without filling it."
        />
        <Compare
          label="With an AI agent"
          text="The same cloud drive, mounted on the Mac, holding the repo and the agent’s notes."
        />
      </div>

      <div role="tablist" aria-label="Choose a desk" className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {desks.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === desk.id}
            onClick={() => setId(item.id)}
            className={cn(
              "shrink-0 border-b-2 px-1 py-2 text-sm",
              item.id === desk.id ? "border-cove text-foreground" : "border-transparent text-muted-foreground",
            )}
          >
            {item.label}
            {item.badge ? <span className="ml-2 text-[10px] tracking-[0.14em] uppercase opacity-70">{item.badge}</span> : null}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={desk.id}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1fr_0.9fr]"
        >
          <article>
            <p className="text-xs tracking-[0.18em] text-cove uppercase">In plain words, still</p>
            <h3 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">{desk.title}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{desk.body}</p>
            <p className="mt-6 max-w-xl font-serif text-2xl leading-snug italic">{desk.say}</p>
            <ul className="mt-8 grid gap-4 border-t border-foreground/10 pt-6">
              {desk.terms.map((term) => (
                <li key={term.word}>
                  <p className="font-serif text-xl">{term.word}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{term.means}</p>
                </li>
              ))}
            </ul>
          </article>
          <figure className="relative min-h-[420px] overflow-hidden">
            <Image src={deskImage[desk.id]} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0e1320]/80 to-transparent p-5 font-mono text-xs text-white/85">
              Cove / {desk.volume}
            </figcaption>
          </figure>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

const deskImage: Record<string, string> = {
  home: "/media/beach.jpg",
  marketing: "/media/campaign.jpg",
  studio: "/media/studio.jpg",
  agents: "/media/code.jpg",
};

function Compare({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.18em] text-cove uppercase">{label}</p>
      <p className="mt-2 text-lg leading-relaxed">{text}</p>
    </div>
  );
}
