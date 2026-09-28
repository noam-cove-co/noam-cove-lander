import type { Metadata } from "next";
import { site } from "@/config/site";
import { Wordmark } from "@/components/brand";
import { JoinButton } from "@/components/join-button";

export const metadata: Metadata = {
  title: "Why Cove?",
  description:
    "Why a cloud drive on your Mac, rather than an external SSD, iCloud, Google Drive, OneDrive, or a VPS.",
};

export default function WhyPage() {
  const { why } = site;
  return (
    <main>
      <header className="mx-auto w-full max-w-3xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
        <p className="text-xs tracking-[0.18em] text-cove uppercase">{why.kicker}</p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.03em] text-balance sm:text-6xl">
          {why.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{why.lede}</p>
      </header>

      {why.chapters.map((chapter) => (
        <section key={chapter.index} className="border-t border-foreground/10">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[8rem_1fr]">
            <p className="font-serif text-sm text-cove">{chapter.index}</p>
            <div>
              <p className="text-sm text-muted-foreground">{chapter.name}</p>
              <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">{chapter.headline}</h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed">
                {chapter.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-foreground/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="font-serif text-4xl tracking-[-0.03em]">The short version.</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/15">
                  {why.columns.map((column, index) => (
                    <th
                      key={column || "label"}
                      className={`px-3 py-3 font-medium ${index === why.columns.length - 1 ? "text-cove" : "text-muted-foreground"}`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {why.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-foreground/10">
                    {row.map((cell, index) => (
                      <td
                        key={`${row[0]}-${index}`}
                        className={`px-3 py-4 align-top ${index === 0 ? "font-medium" : ""} ${index === row.length - 1 ? "text-cove" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-20 sm:px-6 sm:py-28">
          <Wordmark className="text-6xl sm:text-7xl" />
          <div className="font-serif text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
            {why.close.slice(1).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <JoinButton />
        </div>
      </section>
    </main>
  );
}
