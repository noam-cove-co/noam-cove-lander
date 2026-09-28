"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { CoveMark, Wordmark } from "@/components/brand";
import { InstallButton } from "@/components/install-button";
import { useWaitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

export function SiteHeader() {
  const { openWaitlist } = useWaitlist();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > 8,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
      <div
        className={cn(
          "glass mx-auto flex max-w-6xl items-center gap-2 rounded-full px-2.5 py-2 sm:px-3",
          scrolled && "shadow-[0_16px_40px_-24px_rgba(18,36,29,0.45)]",
        )}
      >
        <Link href="/" className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1.5" aria-label="Cove, home">
          <CoveMark className="size-7 text-cove" />
          <Wordmark className="text-[1.45rem]" />
        </Link>
        <nav className="ml-4 hidden items-center gap-5 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <InstallButton />
          <Button type="button" onClick={() => openWaitlist()} className="h-10 rounded-full px-4 text-sm">
            Join
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open ? (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-4 md:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 font-serif text-2xl tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function MobileJoinBar() {
  const { openWaitlist } = useWaitlist();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/50 bg-background/80 p-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)]">
        <p className="text-sm leading-tight text-muted-foreground">
          Your cloud drive.
          <span className="block text-foreground">Private beta for Mac.</span>
        </p>
        <Button type="button" onClick={() => openWaitlist()} className="h-11 rounded-full px-4">
          {site.campaign.cta}
        </Button>
      </div>
    </div>
  );
}
