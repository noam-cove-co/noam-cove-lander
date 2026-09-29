import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { CoveMark, NoamByline, NoamSeal } from "@/components/brand";
import { JoinButton } from "@/components/join-button";

export const metadata: Metadata = {
  title: "Team",
  description: "Cove is made by NOAM Co., a small consultancy in Yorkshire.",
};

export default function TeamPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <NoamByline className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase" sealClassName="size-7 text-cove">
        NOAM Co.
      </NoamByline>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl">
        {site.team.title}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.team.body}</p>

      <article className="glass mt-10 grid gap-8 rounded-md p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="flex items-center justify-center">
          <Image
            src="/brand/cove-icon.png"
            alt="A fluffy cloud shaped into a cove"
            width={1024}
            height={1024}
            className="h-auto w-full max-w-[280px]"
          />
        </div>
        <div>
          {site.team.letter.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed first:mt-0">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-serif text-2xl italic">{site.team.sign}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <NoamSeal className="size-5 shrink-0 text-muted-foreground" />
                {site.team.role}
              </p>
            </div>
            <JoinButton className="h-10 rounded-md px-4 text-sm" />
          </div>
        </div>
      </article>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {site.team.principles.map((principle) => (
          <article key={principle.title} className="rounded-md bg-white/50 p-6 ring-1 ring-white/80">
            <h2 className="font-serif text-3xl tracking-tight">{principle.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
          </article>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-4xl tracking-tight">The desk</h2>
        <div aria-hidden="true" className="mt-4 h-px w-12 bg-[#b42318]" />
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Two of us. One builds Cove. One runs the studio floor.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {site.team.people.map((person) => (
            <li key={person.name} className="group">
              <div className="overflow-hidden bg-[#f4f1ea] p-[2px] shadow-[inset_0_0_0_1px_#0e1320]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe4d8] shadow-[inset_0_0_0_1px_#0e1320]">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={person.alt || person.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-[#0e1320] text-[#f5f6f8]">
                      <span className="font-serif text-7xl italic tracking-[-0.05em] sm:text-8xl">{person.initials}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-foreground/15 pt-3">
                <div>
                  <p className="font-serif text-2xl tracking-tight">{person.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                </div>
                <CoveMark className="size-7 opacity-70" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex items-start gap-3">
        <NoamSeal className="mt-0.5 size-7 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Write to us at{" "}
          <a className="text-foreground underline decoration-cove/40 underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
