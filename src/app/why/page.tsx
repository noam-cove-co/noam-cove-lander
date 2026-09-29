import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { CoveMark, Wordmark } from "@/components/brand";
import { JoinButton } from "@/components/join-button";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Why Cove?",
  description:
    "Why a cloud drive on your Mac, rather than an external SSD, iCloud, Google Drive, OneDrive, or a VPS.",
};

export default function WhyPage() {
  const { why } = site;
  const coveCol = why.columns.length - 1;

  return (
    <main>
      <header className="mx-auto w-full max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
        <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">{why.kicker}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
          {why.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{why.lede}</p>
      </header>

      <section className="border-t border-foreground/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-14 lg:gap-20">
            {why.chapters.map((chapter, index) => (
              <article
                key={chapter.name}
                className={cn(
                  "grid items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14",
                  index > 0 && "border-t border-foreground/10 pt-14 lg:pt-20",
                )}
              >
                <div>
                  <p className="text-[0.72rem] font-medium tracking-[0.18em] text-cove uppercase">{chapter.name}</p>
                  <h2 className="mt-3 max-w-md font-serif text-4xl leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl">
                    {chapter.headline}
                  </h2>
                </div>
                <div className="max-w-xl space-y-4 border-l border-cove/25 pl-5 text-base leading-relaxed text-foreground/90 sm:pl-6 sm:text-lg lg:border-l-0 lg:pl-0">
                  {chapter.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-[#f5f6f8]/80">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="font-serif text-4xl tracking-[-0.03em] sm:text-5xl">The short version.</h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
            Five ways to keep a file. Only one of them is a drive on your Mac.
          </p>
          <div className="mt-8 overflow-hidden rounded-[12px] bg-white shadow-[0_22px_50px_-36px_rgba(14,19,32,0.4)] ring-1 ring-foreground/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-foreground/10 bg-[#f8f9fa]">
                    {why.columns.map((column, index) => (
                      <th
                        key={column || "label"}
                        className={cn(
                          "px-4 py-3.5 text-[0.7rem] font-medium tracking-[0.12em] uppercase",
                          index === 0 && "sticky left-0 z-10 bg-[#f8f9fa]",
                          index === coveCol
                            ? "bg-[#e7f3ee] text-cove"
                            : "text-muted-foreground",
                        )}
                      >
                        {column || <span className="sr-only">Compared</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {why.rows.map((row, rowIndex) => (
                    <tr
                      key={row[0]}
                      className={cn(
                        "border-b border-foreground/8 last:border-b-0",
                        rowIndex % 2 === 1 && "bg-[#fafbfc]",
                      )}
                    >
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={cn(
                            "px-4 py-4 align-top leading-snug",
                            index === 0 && "sticky left-0 z-10 bg-inherit font-medium text-foreground",
                            index === 0 && rowIndex % 2 === 1 && "bg-[#fafbfc]",
                            index === 0 && rowIndex % 2 === 0 && "bg-white",
                            index === coveCol && "bg-[#e7f3ee]/55 font-medium text-cove",
                            index > 0 && index !== coveCol && "text-foreground/75",
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 border-t border-foreground/10 bg-[#e7f3ee]/40 px-4 py-3 text-[12px] text-cove">
              <CoveMark className="size-4 shrink-0 text-cove" />
              Cove is the last column on purpose. Everything else is a workaround.
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <CoveMark className="size-9" />
              <Wordmark className="text-4xl sm:text-5xl" />
            </div>
            <div className="mt-8 max-w-md font-serif text-3xl leading-[1.05] tracking-[-0.03em] sm:text-4xl">
              {why.close.slice(1).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-8">
              <JoinButton />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none">
            <Image
              src="/brand/cove-icon.png"
              alt="A fluffy cloud shaped into a cove"
              width={1024}
              height={1024}
              className="h-auto w-full"
              priority={false}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
