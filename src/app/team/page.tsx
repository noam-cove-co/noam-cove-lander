import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { NoamSeal } from "@/components/brand";
import { JoinButton } from "@/components/join-button";

export const metadata: Metadata = {
  title: "Team",
  description: "Cove is made by NOAM Co., a small consultancy in Yorkshire.",
};

export default function TeamPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="flex items-center gap-3">
        <NoamSeal className="size-9 shrink-0 text-cove" />
        <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">NOAM Co.</p>
      </div>
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
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
          {site.team.people.map((person) => (
            <li
              key={person.name}
              className="flex items-center gap-4 rounded-[1.1rem] bg-white/80 p-3.5 ring-1 ring-foreground/10 shadow-[0_14px_36px_-28px_rgba(14,19,32,0.45)] sm:gap-5 sm:p-4"
            >
              <div className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-full bg-[#ebe4d8] ring-1 ring-foreground/10 sm:size-24">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.alt || person.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center bg-[#0e1320] text-[#f5f6f8]">
                    <span className="font-serif text-2xl italic tracking-[-0.04em] sm:text-3xl">{person.initials}</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-xl tracking-tight sm:text-2xl">{person.name}</p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{person.role}</p>
              </div>
              <NoamSeal className="size-6 shrink-0 self-start text-muted-foreground sm:size-7 sm:self-center" />
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
