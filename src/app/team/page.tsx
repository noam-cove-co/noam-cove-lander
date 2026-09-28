import type { Metadata } from "next";
import { site } from "@/config/site";
import { CraftLine, NoamSeal } from "@/components/brand";

export const metadata: Metadata = {
  title: "Studio",
  description: "Cove is made by NOAM Co., a small consultancy in Yorkshire.",
};

const desks = [
  { initials: "HP", name: "Helen Park", role: "Family videos" },
  { initials: "JA", name: "Jonah Adeyemi", role: "Marketing, Halden & Co" },
  { initials: "ME", name: "Mara Ellison", role: "Producer, Northline" },
  { initials: "EW", name: "Ellis Ward", role: "Music" },
  { initials: "PR", name: "Priya Raman", role: "Websites, with an agent" },
];

export default function TeamPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">NOAM Co.</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl">
        {site.team.title}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{site.team.body}</p>

      <article className="glass mt-10 grid gap-8 rounded-md p-6 sm:p-10 lg:grid-cols-[180px_1fr] lg:gap-12">
        <div className="grid size-28 place-items-center rounded-md bg-pine text-paper sm:size-36">
          <NoamSeal className="size-16 sm:size-20" />
        </div>
        <div>
          {site.team.letter.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed first:mt-0">
              {paragraph}
            </p>
          ))}
          <p className="mt-6 font-serif text-2xl italic">{site.team.sign}</p>
          <p className="text-sm text-muted-foreground">{site.team.role}</p>
        </div>
      </article>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {site.team.principles.map((principle) => (
          <article key={principle.title} className="rounded-md bg-white/50 p-6 ring-1 ring-white/80">
            <h2 className="font-serif text-3xl tracking-tight">{principle.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
          </article>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-serif text-4xl tracking-tight">First desks on the drive</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Not a staff page. These are the first people the cloud drive was shown to: a family archive, a marketing team, a studio, and someone building with an agent.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {desks.map((desk) => (
            <li key={desk.name}>
              <div className="grid aspect-square place-items-center rounded-md bg-[#efe8dc]">
                <span className="font-serif text-4xl tracking-tight text-pine/70 sm:text-5xl">{desk.initials}</span>
              </div>
              <p className="mt-4 font-medium">{desk.name}</p>
              <p className="text-sm text-muted-foreground">{desk.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16">
        <CraftLine />
        <p className="mt-3 text-sm text-muted-foreground">
          Write to the studio at{" "}
          <a className="text-foreground underline decoration-cove/40 underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
