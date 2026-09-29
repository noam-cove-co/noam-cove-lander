import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import { CoveMark, NoamSeal, Wordmark } from "@/components/brand";
import { RangeEnquire } from "@/components/range-enquire";
import { RangeIntake } from "@/components/range-intake";

export const metadata: Metadata = {
  title: {
    absolute: "Mt. Mtn. — Cove, at the size of a mountain",
  },
  description: site.range.lede,
  openGraph: {
    title: "Mt. Mtn. — Cove, at the size of a mountain",
    description: site.range.lede,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2760",
};

export default function MtPage() {
  const { range } = site;

  return (
    <main>
      <header className="mx-auto w-full max-w-6xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20">
        <p className="flex items-center gap-2 text-xs tracking-[0.22em] text-primary uppercase">
          <CoveMark className="size-[18px]" />
          Cove
          <span className="text-muted-foreground">· {range.name}</span>
        </p>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">
          {range.title}
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">{range.lede}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#intake" className="inline-flex h-12 items-center rounded-md bg-primary px-6 text-[15px] font-medium text-primary-foreground">
            Watch the files go in
          </a>
          <a href="#enquire" className="text-sm text-foreground/80 underline-offset-4 hover:text-foreground hover:underline">
            {range.enquire.title}
          </a>
        </div>
      </header>
      <RangeIntake />

      <section className="border-t border-white/12">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-12 md:gap-10">
          <p className="text-xs tracking-[0.22em] text-primary uppercase md:col-span-3">The name</p>
          <p className="font-serif text-3xl leading-snug tracking-[-0.03em] md:col-span-9 sm:text-4xl">
            {range.nameNote}
          </p>
        </div>
      </section>

      <section className="border-t border-white/12">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs tracking-[0.22em] text-primary uppercase">The mount</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{range.gesture.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{range.gesture.body}</p>
          <dl className="mt-16 border-t border-white/12">
            {range.specs.map((spec) => {
              const mentionsNoam = /NOAM/i.test(spec.value);
              return (
                <div
                  key={spec.label}
                  className="grid gap-2 border-b border-white/12 py-6 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8 sm:py-7"
                >
                  <dt className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{spec.label}</dt>
                  <dd className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">
                    {mentionsNoam ? (
                      <span className="flex items-start gap-3">
                        <NoamSeal className="mt-1.5 size-7 shrink-0 text-muted-foreground" />
                        <span>{spec.value}</span>
                      </span>
                    ) : (
                      spec.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="border-t border-white/12">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="font-serif text-5xl tracking-[-0.04em] sm:text-6xl">Who mounts a mountain.</h2>
          <div className="mt-12 border-t border-white/12">
            {range.desks.map((desk) => (
              <div
                key={desk.name}
                className="grid gap-2 border-b border-white/12 py-7 md:grid-cols-[16rem_1fr] md:items-baseline md:gap-10"
              >
                <h3 className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{desk.name}</h3>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{desk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/12">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="flex items-center gap-3">
            <CoveMark className="size-[46px] text-primary" />
            <Wordmark className="text-5xl sm:text-7xl" />
          </p>
          <p className="mt-8 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            {range.aside}
          </p>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 border-t border-white/12">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">Enquire</p>
            <h2 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{range.enquire.title}</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">{range.enquire.body}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-2.5 text-sm text-primary hover:underline"
            >
              <NoamSeal className="size-6 shrink-0 text-primary" />
              {site.email}
            </a>
          </div>
          <RangeEnquire />
        </div>
      </section>
    </main>
  );
}
