"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { withUtm } from "@/lib/attribution";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CoveMark, Wordmark } from "@/components/brand";

const LAND = "out-of-space";

const pains = [
  { mark: "01", line: "11 GB left, and the export still needs somewhere to land." },
  { mark: "02", line: "Family film and the client campaign sharing one small disk." },
  { mark: "03", line: "A drawer of little drives, none of them the right one." },
  { mark: "04", line: "The agent’s repo wants a home that is not the system disk." },
];

function TryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: label, href })}
      className="try-mac-frame inline-flex w-fit"
      style={{ animation: "none" }}
    >
      <span className="try-mac inline-flex h-12 items-center px-6 text-[15px] font-medium whitespace-nowrap" style={{ animation: "none" }}>
        {label}
      </span>
    </a>
  );
}

export function OutOfSpaceView() {
  return (
    <div className="min-h-svh bg-[#f3f1ea] text-foreground">
      <AttributionBeacon land={LAND} />
      <header className="border-b border-foreground/10 bg-[#f3f1ea]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
            <CoveMark className="size-9" />
            <span className="inline-flex items-center gap-1.5">
              <Wordmark className="text-[1.45rem]" />
              <span className="translate-y-[0.35em] font-sans text-[0.55rem] font-medium tracking-[0.14em] text-cove">
                BETA
              </span>
            </span>
          </Link>
          <Link
            href={withUtm("/land/join-the-list")}
            onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join the list" })}
            className="text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            Join the list →
          </Link>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pt-12 pb-16 sm:px-6 sm:pt-20">
        <p className="font-marker rotate-[-4deg] text-3xl text-cove sm:text-4xl">Look familiar?</p>
        <div className="mt-4 grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h1 className="max-w-2xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              The work got heavy. The laptop stayed the same size.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Running out of space is the quiet ceiling on every desk: home film, a spring campaign, a studio session, a repo an agent is writing. Cove is the other drive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TryCta href={withUtm("/demo")} label="Try on this Mac" />
              <Link
                href={withUtm("/land/join-the-list")}
                onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Get more room" })}
                className="inline-flex h-12 items-center justify-center rounded-md border border-foreground/15 bg-white/80 px-5 text-[15px]"
              >
                Get more room
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rotate-[-2deg] rounded-[12px] bg-white p-5 shadow-[0_22px_50px_-32px_rgba(14,19,32,0.45)] ring-1 ring-foreground/10">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Macintosh HD</span>
                <span className="font-marker text-xl text-[#ff9f0a]">Nearly full</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e5e5ea]">
                <div className="h-full rounded-full bg-[#ff9f0a]" style={{ width: "94%" }} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">244 GB of 256 GB used</p>
              <p className="mt-4 border-t border-foreground/10 pt-3 font-serif text-2xl tracking-[-0.03em]">
                Sound familiar?
              </p>
            </div>
            <p className="font-marker absolute -right-2 -bottom-4 rotate-[8deg] text-2xl text-cove sm:right-4">
              every year
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-foreground/10 bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">The pain</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
            Never quite enough room to do what you actually want.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {pains.map((item) => (
              <li
                key={item.mark}
                className="rounded-[12px] border border-foreground/10 bg-[#f3f1ea] p-5"
              >
                <span className="font-marker text-2xl text-cove">{item.mark}</span>
                <p className="mt-2 font-serif text-2xl leading-snug tracking-[-0.03em]">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="hero-wash">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="font-marker rotate-[-3deg] text-3xl text-cove">Then this</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
              Your own cloud drive, on your Mac.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              One click. Cove shows up under Locations. The heavy files stay in the cloud. The Mac stays light.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TryCta href={withUtm("/land/own-drive")} label="See the drive" />
              <Link
                href={withUtm("/land/look-familiar")}
                onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Print ads" })}
                className="inline-flex h-12 items-center text-sm text-foreground/75 hover:text-foreground"
              >
                Classic print ads →
              </Link>
            </div>
          </div>
          <Image
            src="/campaign/own-drive/od-ig-product.png"
            alt="Cove shown in Finder"
            width={1080}
            height={1350}
            className="h-auto w-full rounded-[14px] shadow-[0_30px_70px_-36px_rgba(14,19,32,0.45)] ring-1 ring-black/10"
          />
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-[#0e1320] text-[#f5f6f8]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="font-marker text-3xl text-[#3dcea0]">Enough room?</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Join the private beta.</h2>
          </div>
          <Link
            href={withUtm("/land/join-the-list")}
            onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join footer" })}
            className="inline-flex h-12 items-center rounded-md bg-[#3dcea0] px-6 text-[15px] font-medium text-[#061018]"
          >
            Join the list
          </Link>
        </div>
      </section>
    </div>
  );
}
