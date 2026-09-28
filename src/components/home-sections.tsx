import Link from "next/link";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { Kicker, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { JoinButton } from "@/components/join-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PlainWords() {
  return (
    <Section className="pt-4 sm:pt-6">
      <Reveal>
        <Kicker>In plain words</Kicker>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl">
          A cloud drive that shows up on your Mac.
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {site.beats.map((beat, index) => (
          <Reveal key={beat.title} delay={index * 0.05}>
            <article className="glass h-full rounded-md p-6">
              <p className="font-semibold tracking-[-0.03em] text-sm text-cove">0{index + 1}</p>
              <h3 className="mt-4 font-serif text-3xl tracking-tight">{beat.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{beat.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Problem() {
  return (
    <Section>
      <Reveal>
        <Kicker>{site.problem.kicker}</Kicker>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl">
          {site.problem.title}
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {site.problem.items.map((item) => (
          <Reveal key={item.title}>
            <article className="h-full rounded-md bg-white/45 p-6 ring-1 ring-white/70">
              <h3 className="font-serif text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Workflow() {
  return (
    <Section>
      <Reveal>
        <Kicker>{site.workflow.kicker}</Kicker>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl">
          {site.workflow.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{site.workflow.caption}</p>
      </Reveal>
      <Reveal>
        <div className="glass relative mt-8 rounded-md p-5 sm:p-8">
          <div className="mx-auto flex max-w-sm flex-col items-center rounded-md bg-pine px-5 py-5 text-center text-paper">
            <CoveMark className="size-8 text-mist" />
            <p className="mt-2 font-serif text-3xl tracking-tight">Your cloud drive</p>
            <p className="mt-1 text-sm text-white/70">Shows up on your Mac. Lives in the cloud.</p>
          </div>
          <div className="relative mt-6 hidden md:block">
            <div className="absolute top-3 right-8 left-8 h-px bg-foreground/15" />
            <span className="travel-dot absolute top-2 size-2 rounded-full bg-cove" />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {site.workflow.lanes.map((lane) => (
              <article key={lane.desk} className="rounded-md bg-white/60 p-4 ring-1 ring-white/80">
                <p className="text-xs tracking-[0.16em] text-cove uppercase">{lane.desk}</p>
                <ol className="mt-3 grid gap-2">
                  {lane.items.map((item, index) => (
                    <li key={item} className="flex items-center gap-3 rounded-xl bg-background/70 px-3 py-2 text-sm">
                      <span className="font-semibold tracking-[-0.03em] text-cove">0{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Platforms() {
  return (
    <Section className="py-10 sm:py-14">
      <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">{site.platforms.title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="glass rounded-md p-6">
          <p className="text-xs tracking-[0.18em] text-cove uppercase">{site.platforms.macos.status}</p>
          <h3 className="mt-3 font-serif text-4xl">{site.platforms.macos.name}</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{site.platforms.macos.detail}</p>
          <Button
            className="mt-6 h-11 rounded-md px-5"
            render={<Link href="/download" />}
          >
            Join the Mac beta
          </Button>
        </article>
        <article className="rounded-md bg-white/40 p-6 ring-1 ring-foreground/10">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{site.platforms.ios.status}</p>
          <h3 className="mt-3 font-serif text-4xl text-foreground/80">{site.platforms.ios.name}</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{site.platforms.ios.detail}</p>
          <div className="mt-6">
            <JoinButton ios label="Tell me when iPhone is ready" variant="outline" />
          </div>
        </article>
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section>
      <h2 className="max-w-xl font-serif text-4xl tracking-tight sm:text-5xl">{site.faq.title}</h2>
      <Accordion defaultValue={[site.faq.items[0].q]} className="mt-8 border-t border-foreground/10">
        {site.faq.items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="py-5 font-serif text-xl hover:no-underline sm:text-2xl">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="max-w-2xl pb-5 text-base leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

export function Close() {
  return (
    <Section className="pb-16">
      <div className="glass rounded-md px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="font-serif text-4xl tracking-tight text-balance sm:text-6xl">{site.close.title}</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{site.close.body}</p>
        <div className="mt-8 flex justify-center">
          <JoinButton />
        </div>
      </div>
    </Section>
  );
}

export function Marquee() {
  const items = [...site.disciplines, ...site.disciplines];
  return (
    <div className="overflow-hidden border-y border-foreground/10 py-4">
      <div className="marquee-track flex w-max gap-8 pr-8">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="font-serif flex items-center gap-8 text-[1.85rem] leading-none text-foreground/80">
            {item}
            <span className="size-1.5 rounded-full bg-cove" />
          </span>
        ))}
      </div>
    </div>
  );
}
