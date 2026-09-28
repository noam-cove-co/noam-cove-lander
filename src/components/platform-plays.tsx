"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { CoveMark } from "@/components/brand";
import { HdIcon, MacWindow } from "@/components/mac-window";
import { JoinButton } from "@/components/join-button";
import { Button } from "@/components/ui/button";

const pocket = ["Family", "Spring campaign", "florist-shop"];

export function Platforms() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <h2 className="max-w-xl font-serif text-4xl tracking-tight text-balance sm:text-5xl">{site.platforms.title}</h2>
      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
        <div>
          <MacDesktop />
          <p className="mt-4 text-xs tracking-[0.18em] text-cove uppercase">{site.platforms.macos.status}</p>
          <h3 className="mt-2 font-serif text-4xl tracking-[-0.03em]">{site.platforms.macos.name}</h3>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">{site.platforms.macos.detail}</p>
          <Button nativeButton={false} className="mt-6 h-11 rounded-md px-5" render={<Link href="/download" />}>
            Join the Mac beta
          </Button>
        </div>
        <div>
          <PhonePeek />
          <p className="mt-4 text-xs tracking-[0.18em] text-muted-foreground uppercase">{site.platforms.ios.status}</p>
          <h3 className="mt-2 font-serif text-4xl tracking-[-0.03em]">{site.platforms.ios.name}</h3>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">{site.platforms.ios.detail}</p>
          <div className="mt-6">
            <JoinButton ios label="Tell me when iPhone is ready" variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MacDesktop() {
  const [mounted, setMounted] = useState(true);
  return (
    <div
      className="overflow-hidden rounded-[10px] shadow-[0_22px_50px_-28px_rgba(14,19,32,0.45)] ring-1 ring-black/10"
      style={{
        background:
          "radial-gradient(80% 70% at 85% 110%, rgba(14,107,86,0.45), transparent 55%), linear-gradient(165deg, #c5d0dc 0%, #e4ddd2 46%, #b7c7bf 100%)",
      }}
    >
      <div className="flex h-7 items-center gap-3 px-3 text-[11px] text-[#1d1d1f]/80">
        <span className="font-semibold">Finder</span>
        <span>File</span>
        <span>View</span>
        <span className="ml-auto tabular-nums">Mon 9:41</span>
      </div>
      <div className="px-3 pt-2 pb-4 sm:px-5">
        <MacWindow title={mounted ? "Family" : "Macintosh HD"}>
          <div className="px-2 py-2 text-[13px]">
            <p className="px-2 pt-1 text-[11px] font-semibold text-[#6e6e73]">Locations</p>
            <div className="mt-1 flex items-center gap-2 px-2 py-1.5">
              <HdIcon />
              Macintosh HD
            </div>
            {mounted ? (
              <div className="flex items-center gap-2 rounded-md bg-[#0a84ff] px-2 py-1.5 text-white">
                <CoveMark className="size-[21px] text-white" />
                Family
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMounted(true)}
                className="mt-2 w-full rounded-md bg-[#0e6b56] px-3 py-2 text-left text-[13px] font-medium text-white"
              >
                One click — show Family
              </button>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-black/10 px-3 py-2 text-[11px] text-[#6e6e73]">
            <span>{mounted ? "Air, Pro, Studio, Mac mini." : "The drive is in the cloud until you click."}</span>
            {mounted ? (
              <button type="button" onClick={() => setMounted(false)} className="text-[#0e6b56]">
                Remove
              </button>
            ) : null}
          </div>
        </MacWindow>
      </div>
    </div>
  );
}

function PhonePeek() {
  const [peek, setPeek] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setPeek((value) => !value)}
      aria-pressed={peek}
      className="mx-auto block w-full max-w-[280px] text-left"
    >
      <span className="block rounded-[2.1rem] bg-[#1d1d1f] p-[10px] shadow-[0_22px_50px_-28px_rgba(14,19,32,0.55)]">
        <span className="block overflow-hidden rounded-[1.6rem] bg-[#f6f6f6] text-[#1d1d1f]">
          <span className="relative flex h-11 items-center justify-between px-5 text-[11px] font-medium">
            <span>9:41</span>
            <span className="absolute top-1/2 left-1/2 h-[22px] w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" aria-hidden />
            <span className="text-[#6e6e73]">{peek ? "Cove" : "Locked"}</span>
          </span>
          {peek ? (
            <span className="block px-4 pt-2 pb-8">
              <span className="block text-[13px] font-medium">The same drive</span>
              <span className="mt-3 block">
                {pocket.map((name) => (
                  <span key={name} className="flex items-center gap-2 border-t border-black/10 py-2 text-[13px]">
                    <CoveMark className="size-[18px] text-cove" />
                    {name}
                  </span>
                ))}
              </span>
              <span className="mt-3 block text-[11px] leading-relaxed text-[#6e6e73]">
                A look from your pocket. Not in this beta.
              </span>
            </span>
          ) : (
            <span className="grid min-h-52 place-items-center px-6 pb-8 text-center">
              <span>
                <CoveMark className="mx-auto size-[46px] opacity-40" />
                <span className="mt-3 block font-serif text-2xl">Coming soon</span>
                <span className="mt-2 block text-[12px] text-[#6e6e73]">Tap to peek at the drive.</span>
              </span>
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

export function Close() {
  const [mounted, setMounted] = useState(false);
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <h2 className="max-w-xl font-serif text-5xl tracking-[-0.04em] text-balance sm:text-7xl">{site.close.title}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{site.close.body}</p>
          <div className="mt-8">
            <JoinButton />
          </div>
        </div>
        <MacWindow title={mounted ? "Your drive" : "Finder"}>
          <div className="px-2 py-2 text-[13px]">
            <p className="px-2 pt-1 text-[11px] font-semibold text-[#6e6e73]">Locations</p>
            <div className="mt-1 flex items-center gap-2 px-2 py-1.5">
              <HdIcon />
              Macintosh HD
            </div>
            {mounted ? (
              <div className="flex items-center gap-2 rounded-md bg-[#0a84ff] px-2 py-1.5 text-white">
                <CoveMark className="size-[21px] text-white" />
                Your drive
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMounted(true)}
                className="mt-3 flex w-full items-center gap-3 rounded-md px-2 py-3 text-left hover:bg-black/5"
              >
                <CoveMark className="size-[46px] text-cove" />
                <span>
                  <span className="block font-medium">Show your drive</span>
                  <span className="block text-[12px] text-[#6e6e73]">One click. Then the list is how a seat opens.</span>
                </span>
              </button>
            )}
          </div>
          <p className="border-t border-black/10 px-3 py-2.5 text-[12px] text-[#6e6e73]">
            {mounted ? "On this Mac. The files stay in the cloud. The seat is the waitlist." : "The Mac is ready when you are."}
          </p>
        </MacWindow>
      </div>
    </section>
  );
}
