import Link from "next/link";
import { formatEditionDate } from "@/lib/journal";

export function JournalMasthead({
  editionDate,
  compact,
}: {
  editionDate?: string;
  compact?: boolean;
}) {
  const dateLabel = editionDate ? formatEditionDate(editionDate) : formatEditionDate(new Date().toISOString().slice(0, 10));

  return (
    <div className={compact ? "pb-4" : "pb-6"}>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-foreground pb-3">
        <div>
          <p className="font-mono text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase">
            Yorkshire edition · Vol. I
          </p>
          <Link
            href="/journal"
            className="mt-1 block font-serif text-4xl leading-none tracking-[-0.04em] sm:text-5xl"
          >
            The Cove Journal
          </Link>
        </div>
        <p className="max-w-[14rem] text-right font-mono text-[0.65rem] leading-relaxed tracking-[0.08em] text-muted-foreground uppercase">
          {dateLabel}
          <span className="mt-1 block normal-case tracking-normal text-foreground/70">
            Cloud drives & quiet Macs
          </span>
        </p>
      </div>
      {!compact ? (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-b border-foreground/25 pb-2 font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
          <span>Price: one good idea</span>
          <span className="text-cove">Est. NOAM Co.</span>
          <span>Finder, page one</span>
        </div>
      ) : null}
    </div>
  );
}
