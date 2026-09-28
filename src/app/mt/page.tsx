import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { MtWordmark } from "@/components/brand";
import { RangeEnquire } from "@/components/range-enquire";

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
  themeColor: "#070d18",
};

function Ridge() {
  return (
    <svg viewBox="0 0 1200 72" className="mt-12 w-full text-[#3dcea0]" fill="none" aria-hidden="true">
      <path
        d="M0 62 H160 L248 22 L336 62 H500 L612 6 L724 62 H940 L1048 30 L1200 62"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MtPage() {
  const { range } = site;

  return (
    <main className="bg-[#070d18] text-[#f3f5f7]">
      <header className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
        <p className="text-xs tracking-[0.22em] text-[#3dcea0] uppercase">
          {range.kicker}
          <span className="text-[#93a0b4]"> · {range.spoken}</span>
        </p>
        <div className="mt-auto">
          <h1 className="font-serif text-[clamp(5.25rem,18vw,10.75rem)] leading-[0.78] tracking-[-0.05em]">
            <span className="block">Mt.</span>
            <span className="block">Mtn.</span>
          </h1>
          <p className="mt-8 max-w-xl font-serif text-2xl leading-snug tracking-[-0.03em] italic sm:text-4xl">
            {range.title}
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#93a0b4] sm:text-lg">{range.lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#enquire"
              className="inline-flex h-12 items-center rounded-md bg-[#3dcea0] px-6 text-[15px] font-medium text-[#061018]"
            >
              {range.enquire.title}
            </a>
            <Link href="/" className="text-sm text-[#f3f5f7]/80 underline-offset-4 hover:text-[#f3f5f7] hover:underline">
              The drive for one Mac is Cove
            </Link>
          </div>
          <Ridge />
        </div>
      </header>

      <section className="border-t border-white/12">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-12 md:gap-10">
          <p className="text-xs tracking-[0.22em] text-[#3dcea0] uppercase md:col-span-3">The name</p>
          <p className="font-serif text-3xl leading-snug tracking-[-0.03em] md:col-span-9 sm:text-4xl">
            {range.nameNote}
          </p>
        </div>
      </section>

      <section className="border-t border-white/12">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs tracking-[0.22em] text-[#3dcea0] uppercase">The mount</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{range.gesture.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#c5ceda]">{range.gesture.body}</p>
          <dl className="mt-16 border-t border-white/12">
            {range.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid gap-2 border-b border-white/12 py-6 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8 sm:py-7"
              >
                <dt className="text-xs tracking-[0.18em] text-[#93a0b4] uppercase">{spec.label}</dt>
                <dd className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{spec.value}</dd>
              </div>
            ))}
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
                <p className="text-base leading-relaxed text-[#c5ceda] sm:text-lg">{desk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/12">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <MtWordmark className="text-5xl sm:text-7xl" />
          <p className="mt-8 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            {range.aside}
          </p>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-24 border-t border-white/12">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs tracking-[0.22em] text-[#3dcea0] uppercase">Enquire</p>
            <h2 className="mt-4 font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{range.enquire.title}</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-[#c5ceda]">{range.enquire.body}</p>
            <a href={`mailto:${site.email}`} className="mt-8 inline-block text-sm text-[#3dcea0] hover:underline">
              {site.email}
            </a>
          </div>
          <RangeEnquire />
        </div>
      </section>
    </main>
  );
}
