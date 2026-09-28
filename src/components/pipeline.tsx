import { site } from "@/config/site";
import { Kicker } from "@/components/section";
import { cn } from "cn";

export function Pipeline() {
  const { pipeline } = site;
  const done = pipeline.stages.filter((stage) => stage.state === "done").length;
  const later = pipeline.stages.filter((stage) => stage.state === "next").length;

  return (
    <section id={pipeline.id} className="border-t border-foreground/10">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Kicker>{pipeline.kicker}</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-4xl tracking-[-0.04em] text-balance sm:text-6xl">{pipeline.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{pipeline.body}</p>
        <p className="mt-6 font-mono text-[12px] tracking-wide text-cove uppercase">
          {done} {pipeline.doneLabel}
          <span className="px-2 text-foreground/30">·</span>
          {pipeline.nowLabel}: private beta
          <span className="px-2 text-foreground/30">·</span>
          {later} {pipeline.nextLabel}
        </p>

        <div className="mt-12 overflow-hidden rounded-[10px] bg-[#f6f6f6] text-[#1d1d1f] shadow-[0_22px_50px_-32px_rgba(14,19,32,0.45)] ring-1 ring-black/10">
          <div className="flex h-9 items-center gap-2 border-b border-black/10 bg-[#f3f3f4] px-3">
            <span className="flex gap-[6px]" aria-hidden>
              <i className="size-2.5 rounded-full bg-[#ff5f57]" />
              <i className="size-2.5 rounded-full bg-[#febc2e]" />
              <i className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <p className="flex-1 pr-8 text-center text-[12px] font-medium">Pipeline</p>
          </div>

          <ol className="grid gap-0 px-4 py-6 sm:px-8 sm:py-8 lg:grid-cols-4">
            {pipeline.stages.map((stage, index) => {
              const now = stage.state === "now";
              const doneStage = stage.state === "done";
              return (
                <li
                  key={stage.title}
                  className={cn(
                    "relative border-black/10 py-5 lg:px-4 lg:py-6",
                    index > 0 && "border-t lg:border-t-0 lg:border-l",
                    now && "bg-white lg:-my-2 lg:py-8",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full font-mono text-[12px]",
                        doneStage && "bg-[#0e6b56] text-white",
                        now && "bg-[#0e1320] text-white ring-4 ring-[#0e6b56]/25",
                        stage.state === "next" && "bg-transparent text-[#6e6e73] ring-1 ring-black/20",
                      )}
                      aria-hidden
                    >
                      {doneStage ? "✓" : index + 1}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.16em] uppercase",
                        doneStage && "text-[#0e6b56]",
                        now && "text-[#0e1320]",
                        stage.state === "next" && "text-[#8e8e93]",
                      )}
                    >
                      {doneStage ? pipeline.doneLabel : now ? pipeline.nowLabel : pipeline.nextLabel}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl tracking-[-0.03em]">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4c5563]">{stage.body}</p>
                  {index < pipeline.stages.length - 1 ? (
                    <span className="mt-4 block font-mono text-[11px] text-[#aeaeb2] lg:hidden" aria-hidden>
                      ↓
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
