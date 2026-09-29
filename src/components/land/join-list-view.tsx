"use client";

import Image from "next/image";
import Link from "next/link";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CoveMark, Wordmark } from "@/components/brand";
import { LandWaitlist } from "@/components/land/land-waitlist";
import { ReferralBoard } from "@/components/land/referral-board";
import { withUtm } from "@/lib/attribution";

const LAND = "join-the-list";
const CAMPAIGN = "join-the-list";

export function JoinListView() {
  return (
    <div className="min-h-svh bg-[#050608] text-[#f7f8fa]">
      <AttributionBeacon land={LAND} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(70% 55% at 70% 30%, rgba(61,206,160,0.14), transparent 60%), radial-gradient(50% 40% at 15% 70%, rgba(96,140,180,0.1), transparent 55%)",
        }}
      />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
          <CoveMark className="size-9" />
          <span className="inline-flex items-center gap-1.5">
            <Wordmark className="text-[1.45rem] text-white" />
            <span className="translate-y-[0.35em] font-sans text-[0.55rem] font-medium tracking-[0.14em] text-[#3dcea0]">
              BETA
            </span>
          </span>
        </Link>
        <Link href={withUtm("/land/own-drive")} className="text-sm text-white/70 hover:text-white">
          See the drive →
        </Link>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:pb-20">
        <div className="relative">
          <Image
            src="/brand/cove-icon.png"
            alt=""
            width={900}
            height={900}
            priority
            className="pointer-events-none absolute -right-8 -bottom-16 w-[min(100%,420px)] opacity-[0.18] sm:-right-16"
          />
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-[#3dcea0] uppercase">Join the List</p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
            Private beta.
            <span className="mt-2 block text-white/85">Join the list.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/60">
            Your own cloud drive, on your Mac. A seat opens — we write. Invite someone and climb the ladder.
          </p>
          <dl className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            <div>
              <dt className="tracking-[0.14em] text-white/40 uppercase">Ask</dt>
              <dd className="mt-1 text-white">Join once</dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-white/40 uppercase">Climb</dt>
              <dd className="mt-1 text-white">Invite friends</dd>
            </div>
            <div>
              <dt className="tracking-[0.14em] text-white/40 uppercase">Seat</dt>
              <dd className="mt-1 text-white">From the top</dd>
            </div>
          </dl>
        </div>
        <LandWaitlist source="land-join-the-list" land={LAND} campaign={CAMPAIGN} dark />
      </section>

      <section className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.18em] text-[#3dcea0] uppercase">Referrals</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">The list has a ladder.</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
              After you join, you get an invite link. Each person who signs up with it moves you up. Seats open from the top of the board.
            </p>
          </div>
          <ReferralBoard dark land={LAND} />
        </div>
      </section>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-white/45 sm:px-6">
          <p>Cove · NOAM Co. · Yorkshire</p>
          <Link href="/" className="hover:text-white">
            Main site
          </Link>
        </div>
      </footer>
    </div>
  );
}
