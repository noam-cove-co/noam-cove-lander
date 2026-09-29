"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { withUtm } from "@/lib/attribution";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CoveMark, Wordmark } from "@/components/brand";

const LAND = "own-drive";

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

export function OwnDriveView() {
  return (
    <div className="min-h-svh bg-paper text-foreground">
      <AttributionBeacon land={LAND} />
      <header className="hero-wash border-b border-foreground/10">
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

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-20">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">Own Drive</p>
            <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              Your own cloud drive, <span className="text-cove">on your Mac</span>.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              One click, and it shows up in Finder. The files stay in the cloud. The Mac stays light.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TryCta href={withUtm("/demo")} label="Try on this Mac" />
              <Link
                href={withUtm("/land/join-the-list")}
                onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Private beta" })}
                className="inline-flex h-12 items-center justify-center rounded-md border border-foreground/15 bg-white/80 px-5 text-[15px]"
              >
                Join the private beta
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Private beta · Crafted by NOAM Co. in Yorkshire</p>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/brand/cove-icon.png"
              alt="Cove mark"
              width={1024}
              height={1024}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.18em] text-cove uppercase">On the Mac</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">It shows up like a normal drive.</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Under Locations, beside Macintosh HD. Photos, Premiere, Logic, Cursor: they see a drive. What you open comes from the cloud as you need it.
            </p>
            <ul className="mt-8 grid gap-3 text-sm text-foreground/80">
              <li>One click to mount</li>
              <li>Heavy files stay in the cloud</li>
              <li>Zero KB on this Mac until you open something</li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-[16px] bg-[#d9dde3] ring-1 ring-black/10">
            <Image
              src="/campaign/own-drive/od-ig-product.png"
              alt="Cove drive shown in Finder on a Mac"
              width={1080}
              height={1350}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-[#0e1320] text-[#f5f6f8]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.03em] sm:text-5xl">Ready for a seat?</h2>
            <p className="mt-3 max-w-md text-base text-white/65">
              The waitlist is the door. Invite someone and climb.
            </p>
          </div>
          <Link
            href={withUtm("/land/join-the-list")}
            onClick={() => track(site.analytics.events.landCta, { land: LAND, cta: "Join the list footer" })}
            className="inline-flex h-12 items-center rounded-md bg-[#3dcea0] px-6 text-[15px] font-medium text-[#061018]"
          >
            Join the list
          </Link>
        </div>
      </section>
    </div>
  );
}
