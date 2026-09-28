import { site } from "@/config/site";
import { NoamSeal } from "@/components/brand";
import { Kicker, Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Reviews() {
  const note = site.reviews.featured;
  return (
    <Section id={site.reviews.id}>
      <Reveal>
        <Kicker>{site.reviews.kicker}</Kicker>
        <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{site.reviews.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-10 text-sm text-cove">{site.reviews.annotation}</p>
        <article className="mt-3 border border-foreground/10 bg-white p-6 sm:p-10">
          <div className="flex items-start gap-4 border-b border-black/5 pb-5">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#efe8dc] font-medium text-pine">
              {note.initials}
            </div>
            <div className="min-w-0">
              <p className="font-medium">{note.from}</p>
              <p className="text-sm text-muted-foreground">{note.role}</p>
              <p className="mt-2 text-sm text-foreground/80">To {note.to}</p>
              <h3 className="mt-1 text-lg font-medium tracking-tight">{note.subject}</h3>
            </div>
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-[17px] leading-relaxed">
            {note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-8 flex items-start gap-3">
          <NoamSeal className="mt-0.5 size-7 shrink-0 text-muted-foreground" />
          <p className="max-w-xl text-muted-foreground">{note.aside}</p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {site.reviews.quotes.map((quote) => (
          <Reveal key={quote.name}>
            <figure className="h-full rounded-md bg-white/50 p-6 ring-1 ring-white/80">
              <blockquote className="text-base leading-relaxed">“{quote.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="text-foreground">{quote.name}</span>
                <span className="px-1.5">·</span>
                {quote.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
