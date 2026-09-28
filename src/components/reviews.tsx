import { site } from "@/config/site";
import { NoamSeal } from "@/components/brand";
import { Kicker, Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

function Marked({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={index} className="ink-mark">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export function Reviews() {
  const note = site.reviews.featured;
  return (
    <Section id={site.reviews.id}>
      <Reveal>
        <Kicker>{site.reviews.kicker}</Kicker>
        <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{site.reviews.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="font-marker mt-10 inline-block -rotate-2 text-[1.7rem] leading-none text-[#d01212] sm:text-[2rem]">
          {site.reviews.annotation}
        </p>
        <article className="mt-4 overflow-hidden bg-white shadow-[0_22px_50px_-32px_rgba(14,19,32,0.45)] ring-1 ring-black/10">
          <div className="flex h-11 items-center justify-between border-b border-black/8 px-4 text-[15px]">
            <span className="text-[#007aff]">‹ Inbox</span>
            <span className="text-[13px] text-[#6e6e73]">Today</span>
          </div>
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <h3 className="text-[1.35rem] leading-snug font-semibold tracking-tight sm:text-[1.6rem]">{note.subject}</h3>
            <div className="mt-5 flex items-center gap-3 border-b border-black/8 pb-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#8e8e93] text-sm font-medium text-white">
                {note.initials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold">{note.from}</p>
                <p className="text-[13px] text-[#6e6e73]">
                  To {note.to}
                  <span className="px-1.5 text-[#aeaeb2]">·</span>
                  {note.role}
                </p>
              </div>
            </div>
            <div className="mt-6 max-w-2xl space-y-4 text-[17px] leading-relaxed">
              {note.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <Marked text={paragraph} />
                </p>
              ))}
            </div>
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
            <figure className="h-full border-t border-foreground/15 pt-5">
              <blockquote className="font-serif text-2xl leading-snug tracking-[-0.03em]">
                “<Marked text={quote.quote} />”
              </blockquote>
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
