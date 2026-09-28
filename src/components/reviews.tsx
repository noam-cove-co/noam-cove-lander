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
        <article className="glass mt-8 rounded-[28px] p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-mist text-sm font-medium text-cove">
              {note.initials}
            </div>
            <div>
              <p className="font-medium">{note.from}</p>
              <p className="text-sm text-muted-foreground">{note.role}</p>
            </div>
            <p className="ml-auto hidden text-[11px] tracking-[0.18em] text-cove uppercase sm:block">Beta note</p>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            To {note.to}
            <span className="px-2">·</span>
            {note.subject}
          </p>
          <div className="mt-4 max-w-2xl space-y-4 text-[17px] leading-relaxed">
            {note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-6 flex items-start gap-3">
          <NoamSeal className="mt-1 size-9 shrink-0 text-cove" />
          <p className="max-w-xl font-serif text-2xl leading-snug italic text-pine sm:text-3xl">{note.aside}</p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {site.reviews.quotes.map((quote) => (
          <Reveal key={quote.name}>
            <figure className="h-full rounded-[24px] bg-white/50 p-6 ring-1 ring-white/80">
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
