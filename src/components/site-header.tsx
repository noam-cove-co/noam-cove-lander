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
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-md",
        scrolled && "bg-background/95",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Cove, home">
          <CoveMark className="size-6 text-cove" />
          <Wordmark className="text-[1.55rem]" />
        </Link>
        <nav className="ml-6 hidden items-center gap-5 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-foreground/75 hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <InstallButton />
          <Button type="button" onClick={() => openWaitlist()} className="h-9 rounded-md px-3.5 text-sm">
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
        <nav className="border-t border-foreground/10 px-4 py-2 md:hidden" aria-label="Mobile">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
        <Button type="button" onClick={() => openWaitlist()} className="h-11 rounded-md px-4">
          {site.campaign.cta}
        </Button>
      </div>
    </div>
  );
}
