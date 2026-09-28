"use client";

import { useState } from "react";
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
          className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <article className="glass rounded-md p-6 sm:p-8">
            <p className="text-xs tracking-[0.18em] text-cove uppercase">In plain words, still</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Your own cloud drive. It lives in the cloud. It shows up on your Mac.
            </p>
            <h3 className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{desk.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{desk.body}</p>
            <p className="mt-6 font-serif text-xl leading-snug italic text-pine">{desk.say}</p>
            <p className="mt-6 font-mono text-xs text-muted-foreground">Cove / {desk.volume}</p>
          </article>
          <article className="rounded-md bg-pine p-6 text-paper sm:p-8">
            <p className="text-xs tracking-[0.18em] text-white/60 uppercase">What we call it here</p>
            <ul className="mt-5 grid gap-5">
              {desk.terms.map((term) => (
                <li key={term.word}>
                  <p className="font-serif text-2xl">{term.word}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{term.means}</p>
                </li>
              ))}
            </ul>
          </article>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Compare({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-md bg-white/55 p-5 ring-1 ring-white/80">
      <p className="text-xs tracking-[0.18em] text-cove uppercase">{label}</p>
      <p className="mt-2 text-base leading-relaxed">{text}</p>
    </div>
  );
}
