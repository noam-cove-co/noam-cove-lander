import { site } from "@/config/site";
import { cn } from "cn";

export function Pipeline() {
  const { pipeline } = site;
  const stages = pipeline.stages;
  const nowIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.state === "now"),
  );
  const span = Math.max(stages.length - 1, 1);
  const progress = nowIndex / span;

  return (
    <section id={pipeline.id} className="border-t border-foreground/10">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="max-w-xl font-serif text-4xl tracking-[-0.04em] text-balance sm:text-5xl">{pipeline.title}</h2>

        <ol className="relative mt-14 lg:hidden">
          <span
            className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-foreground/12"
            aria-hidden
          />
          <span
            className="absolute top-1.5 left-[5px] w-px bg-cove"
            style={{ height: `calc((100% - 1.5rem) * ${progress})` }}
            aria-hidden
          />
          {stages.map((stage, index) => (
            <Node key={stage.title} stage={stage} index={index} compact />
          ))}
        </ol>

        <div className="relative mt-16 hidden lg:block">
          <span
            className="absolute top-[5px] h-px bg-foreground/12"
            style={{ left: `calc(100% / ${stages.length} / 2)`, right: `calc(100% / ${stages.length} / 2)` }}
            aria-hidden
          />
          <span
            className="absolute top-[5px] h-px bg-cove"
            style={{
              left: `calc(100% / ${stages.length} / 2)`,
              width: `calc((100% - 100% / ${stages.length}) * ${progress})`,
            }}
            aria-hidden
          />
          <ol className="grid" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
            {stages.map((stage, index) => (
              <Node key={stage.title} stage={stage} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Node({
  stage,
  index,
  compact = false,
}: {
  stage: { title: string; body: string; state: string };
  index: number;
  compact?: boolean;
}) {
  const done = stage.state === "done";
  const now = stage.state === "now";
  const label = done ? "Done" : now ? "Now" : "Still to come";

  return (
    <li
      aria-current={now ? "step" : undefined}
      className={cn("relative", compact ? "py-3 pl-8" : "px-1.5 pt-0 text-center")}
    >
      <span
        className={cn(
          "relative grid size-[11px] place-items-center",
          compact ? "absolute top-[13px] left-0" : "mx-auto",
        )}
        aria-hidden
      >
        {now ? (
          <span className="absolute size-3 animate-ping rounded-full bg-cove/25 motion-reduce:animate-none" />
        ) : null}
        <span
          className={cn(
            "relative size-[7px] rounded-full",
            done && "bg-cove",
            now && "size-[9px] bg-foreground",
            !done && !now && "bg-transparent ring-1 ring-foreground/25",
          )}
        />
      </span>
      {now && !compact ? (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.18em] text-cove uppercase">
          Now
        </span>
      ) : null}
      <span className="sr-only">{label}. </span>
      <h3
        className={cn(
          "text-[13px] leading-snug tracking-tight",
          compact ? "mt-0" : "mt-4",
          now ? "font-serif text-[15px] text-foreground" : done ? "text-foreground/70" : "text-foreground/40",
        )}
      >
        {now && compact ? (
          <span className="mb-1 block font-mono text-[10px] tracking-[0.18em] text-cove uppercase not-italic">Now</span>
        ) : null}
        {stage.title}
      </h3>
      <p className="sr-only">{stage.body}</p>
      <span className="sr-only">{index + 1}</span>
    </li>
  );
}
