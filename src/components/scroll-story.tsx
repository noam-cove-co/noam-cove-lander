"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "@/config/site";
import { cn } from "cn";

const beats = [
  {
    title: site.beats[0].title,
    body: site.beats[0].body,
    image: "/media/family.jpg",
    alt: "Friends together at a table",
  },
  {
    title: site.beats[1].title,
    body: site.beats[1].body,
    image: "/media/coast.jpg",
    alt: "A rocky coast under a wide sky",
  },
  {
    title: site.beats[2].title,
    body: site.beats[2].body,
    image: "/media/macbook.jpg",
    alt: "A MacBook open on a wooden desk",
  },
];

const problems = [
  { ...site.problem.items[0], image: "/media/holiday.jpg", alt: "A road through open country" },
  { ...site.problem.items[1], image: "/media/campaign.jpg", alt: "A team around a meeting table" },
  { ...site.problem.items[2], image: "/media/desk.jpg", alt: "A laptop and a notebook on a desk" },
];

const journeyShots = [
  { image: "/media/family.jpg", alt: "A group of friends" },
  { image: "/media/macbook.jpg", alt: "A MacBook on a desk" },
  { image: "/media/stage.jpg", alt: "A stage in warm light" },
  { image: "/media/sky.jpg", alt: "Cloud over a landscape" },
];

const lanes = [
  { ...site.workflow.lanes[0], image: "/media/beach.jpg", alt: "A quiet beach" },
  { ...site.workflow.lanes[1], image: "/media/poster.jpg", alt: "Printed design work on a table" },
  { ...site.workflow.lanes[2], image: "/media/code.jpg", alt: "Code on a screen" },
];

export function ScrollStory() {
  const reduce = useReducedMotion();

  return (
    <>
      <PinnedBeats reduce={Boolean(reduce)} />
      <ProblemReel reduce={Boolean(reduce)} />
      <PinnedJourney reduce={Boolean(reduce)} />
      <LaneSpread />
    </>
  );
}

function Still({
  shots,
  index,
  sizes,
}: {
  shots: { image: string; alt: string }[];
  index: number;
  sizes: string;
}) {
  return (
    <>
      {shots.map((shot, shotIndex) => (
        <div
          key={shot.image}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-out",
            shotIndex === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Image
            src={shot.image}
            alt={shotIndex === index ? shot.alt : ""}
            fill
            sizes={sizes}
            className="object-cover"
            aria-hidden={shotIndex !== index}
          />
        </div>
      ))}
    </>
  );
}

function PinnedBeats({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(beats.length - 1, Math.floor(value * beats.length));
    setIndex((current) => (current === next ? current : next));
  });

  if (reduce) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs tracking-[0.18em] text-cove uppercase">In plain words</p>
        <div className="mt-8 grid gap-16">
          {beats.map((beat, beatIndex) => (
            <figure key={beat.title} className="grid items-end gap-6 md:grid-cols-[1fr_1.1fr]">
              <figcaption>
                <p className="text-sm text-cove">0{beatIndex + 1}</p>
                <h2 className="mt-2 font-serif text-5xl tracking-[-0.04em]">{beat.title}</h2>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">{beat.body}</p>
              </figcaption>
              <span className="relative block aspect-[4/5] w-full">
                <Image src={beat.image} alt={beat.alt} fill sizes="50vw" className="object-cover" />
              </span>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  const beat = beats[index];

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 grid h-svh items-end gap-6 overflow-hidden px-4 pt-20 pb-32 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:pt-24 md:pb-12">
        <div>
          <p className="text-xs tracking-[0.18em] text-cove uppercase">In plain words</p>
          <div className="mt-6 flex gap-3">
            {beats.map((item, beatIndex) => (
              <span
                key={item.title}
                className={cn("h-px w-10", beatIndex <= index ? "bg-cove" : "bg-foreground/15")}
              />
            ))}
          </div>
          <motion.div
              key={beat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mt-8 text-sm text-cove">0{index + 1}</p>
              <h2 className="mt-2 font-serif text-6xl tracking-[-0.045em] sm:text-7xl">{beat.title}</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{beat.body}</p>
            </motion.div>
        </div>
        <div className="relative min-h-[38vh] overflow-hidden md:min-h-[72vh]">
          <Still shots={beats} index={index} sizes="55vw" />
        </div>
      </div>
    </section>
  );
}

function ProblemReel({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-32%"]);

  return (
    <section ref={ref} className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="text-xs tracking-[0.18em] text-cove uppercase">{site.problem.kicker}</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-6xl">{site.problem.title}</h2>
      </div>
      {reduce ? (
        <div className="mx-auto mt-10 grid w-full max-w-6xl gap-10 px-4 sm:px-6">
          {problems.map((item) => (
            <ProblemFrame key={item.title} item={item} />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-10 px-4 md:hidden">
            {problems.map((item) => (
              <ProblemFrame key={item.title} item={item} />
            ))}
          </div>
          <motion.div style={{ x }} className="mt-12 hidden w-[168%] gap-5 pl-6 md:flex">
            {problems.map((item) => (
              <ProblemFrame key={item.title} item={item} wide />
            ))}
          </motion.div>
        </>
      )}
    </section>
  );
}

function ProblemFrame({
  item,
  wide,
}: {
  item: (typeof problems)[number];
  wide?: boolean;
}) {
  return (
    <figure className={wide ? "w-[34%]" : ""}>
      <span className="relative block aspect-[4/5] w-full">
        <Image src={item.image} alt={item.alt} fill sizes={wide ? "30vw" : "100vw"} className="object-cover" />
      </span>
      <figcaption className="mt-4 max-w-sm">
        <h3 className="font-serif text-3xl tracking-[-0.03em]">{item.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.body}</p>
      </figcaption>
    </figure>
  );
}

function PinnedJourney({ reduce }: { reduce: boolean }) {
  const steps = site.journey.steps;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setIndex((current) => (current === next ? current : next));
  });

  if (reduce) {
    return (
      <section id={site.journey.id} className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.18em] text-cove uppercase">{site.journey.kicker}</p>
        <h2 className="mt-3 max-w-xl font-serif text-5xl tracking-[-0.03em]">{site.journey.title}</h2>
        <div className="mt-12 grid gap-16">
          {steps.map((step, stepIndex) => (
            <article key={step.index} className="grid items-center gap-6 border-t border-foreground/10 pt-8 md:grid-cols-2">
              <div>
                <p className="text-sm text-cove">{step.index}</p>
                <h3 className="mt-2 font-serif text-4xl tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
              <span className="relative block aspect-[5/4] w-full">
                <Image src={journeyShots[stepIndex].image} alt={journeyShots[stepIndex].alt} fill sizes="50vw" className="object-cover" />
              </span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  const step = steps[index];

  return (
    <section id={site.journey.id} ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-svh flex-col gap-4 overflow-hidden px-4 pt-20 pb-32 sm:px-6 lg:grid lg:grid-cols-[1fr_1.05fr] lg:grid-rows-1 lg:items-center lg:gap-6 lg:pb-10">
        <div className="shrink-0">
          <p className="text-xs tracking-[0.18em] text-cove uppercase">{site.journey.kicker}</p>
          <h2 className="mt-3 max-w-md font-serif text-3xl tracking-[-0.03em] sm:text-5xl">{site.journey.title}</h2>
          <div className="mt-5 flex gap-3 lg:hidden" aria-hidden>
            {steps.map((item, stepIndex) => (
              <span key={item.index} className={cn("h-px w-8", stepIndex <= index ? "bg-cove" : "bg-foreground/15")} />
            ))}
          </div>
          <div className="mt-4 lg:hidden">
            <p className="text-sm text-cove">{step.index}</p>
            <h3 className="mt-1 font-serif text-2xl tracking-[-0.03em]">{step.title}</h3>
            <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
          <ol className="mt-8 hidden gap-5 lg:grid">
            {steps.map((item, stepIndex) => (
              <li key={item.index} className={cn("border-l-2 pl-4", stepIndex === index ? "border-cove" : "border-foreground/15")}>
                <p className={cn("text-sm", stepIndex === index ? "text-cove" : "text-muted-foreground")}>{item.index}</p>
                <h3 className={cn("font-serif text-2xl tracking-[-0.03em] sm:text-3xl", stepIndex === index ? "text-foreground" : "text-foreground/45")}>
                  {item.title}
                </h3>
                {stepIndex === index ? (
                  <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">{step.body}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden lg:min-h-[74vh]">
          <Still shots={journeyShots} index={index} sizes="50vw" />
        </div>
      </div>
    </section>
  );
}

function LaneSpread() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <p className="text-xs tracking-[0.18em] text-cove uppercase">{site.workflow.kicker}</p>
      <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-6xl">{site.workflow.title}</h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.workflow.caption}</p>
      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
        {lanes.map((lane, index) => (
          <motion.figure
            key={lane.desk}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <span className="relative block aspect-[3/4] w-full">
              <Image src={lane.image} alt={lane.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
            </span>
            <figcaption className="mt-4">
              <p className="text-xs tracking-[0.16em] text-cove uppercase">{lane.desk}</p>
              <ol className="mt-3 grid gap-1 font-serif text-2xl tracking-[-0.03em]">
                {lane.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
