"use client";

import { usePathname } from "next/navigation";
import { InstallButton } from "@/components/install-button";
import { WaitlistStrip } from "@/components/waitlist-strip";

export function PageCloser() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <>
      {home ? null : <WaitlistStrip />}
      <section className="bg-pine text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-8">
          <div className="min-w-0">
            <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">Keep this page on your home screen</h2>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/70">
              The Mac app is private for now. Add Cove to your home screen and the beta stays a tap away.
            </p>
          </div>
          <InstallButton
            showLabel
            label="Add to Home Screen"
            className="h-10 w-fit shrink-0 bg-white/10 px-4 text-paper hover:bg-white/15"
          />
        </div>
      </section>
    </>
  );
}
