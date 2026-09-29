import { CoveMark } from "@/components/brand";
import { cn } from "cn";

const leaving = ["Family.mov", "Spring campaign", "Session masters"];
const returning = ["Family", "Spring campaign", "The session"];

export function CloudStream() {
  return (
    <section
      className="mx-auto w-full max-w-5xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-24"
      aria-label="Files go up to the cloud. The drive comes back down onto the Mac."
    >
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] md:gap-5">
        <Lane kicker="To the cloud" names={leaving} />
        <div className="flex justify-center">
          <CoveMark className="size-16 sm:size-[4.5rem]" />
        </div>
        <Lane kicker="Onto the Mac" names={returning} align="end" />
      </div>
      <p className="mx-auto mt-10 max-w-md text-center font-serif text-2xl leading-snug tracking-[-0.03em] text-balance sm:mt-12 sm:text-3xl">
        The files go up. The drive comes back down.
      </p>
    </section>
  );
}

function Lane({
  kicker,
  names,
  align,
}: {
  kicker: string;
  names: string[];
  align?: "end";
}) {
  const end = align === "end";
  return (
    <div>
      <p className={cn("font-serif text-lg tracking-tight text-foreground/55", end && "md:text-right")}>{kicker}</p>
      <ul className="mt-4 grid gap-3.5">
        {names.map((name, index) => (
          <li key={name} className={cn("flex items-center gap-3", end && "md:flex-row-reverse")}>
            <span className={cn("w-[9.5rem] shrink-0 text-sm text-foreground/85 sm:w-40", end && "md:text-right")}>
              {name}
            </span>
            <span className="stream-rail" aria-hidden>
              <span className="stream-bead" style={{ animationDelay: `${index * 2.15}s` }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
