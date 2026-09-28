"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { CoveMark, Wordmark } from "@/components/brand";
import { InstallButton } from "@/components/install-button";
import { isRangePath } from "@/components/route-tone";
import { useWaitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

function ChromeCta({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const className = "inline-flex items-center gap-1.5 text-sm font-medium text-foreground";
  const inner = (
    <>
      <span className="border-b border-foreground/40 pb-px">{children}</span>
      <span aria-hidden className="text-cove">
        →
      </span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

export function SiteHeader() {
  const { openWaitlist } = useWaitlist();
  const pathname = usePathname();
  const range = isRangePath(pathname);
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
        <Link href="/" className="flex items-center gap-2.5" aria-label="Cove, home">
          <span className="grid h-11 place-items-center rounded-full bg-[#1d1d1f] px-3.5 md:h-auto md:rounded-none md:bg-transparent md:px-0">
            <CoveMark priority className="size-8" />
          </span>
          <Wordmark className="text-[1.55rem]" />
        </Link>
        <nav className="ml-6 hidden items-center gap-5 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-foreground/75 hover:text-foreground",
                range && item.href === site.range.path && "text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          {range ? null : <InstallButton />}
          {range ? (
            <ChromeCta href={`${site.range.path}#enquire`}>Enquire</ChromeCta>
          ) : (
            <ChromeCta onClick={() => openWaitlist()}>A seat</ChromeCta>
          )}
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
              className={cn(
                "block py-3 text-lg",
                range && item.href === site.range.path && "text-primary",
              )}
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
  const pathname = usePathname();
  const range = isRangePath(pathname);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background/95 p-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)]">
        <p className="flex items-center gap-2.5 text-sm leading-tight text-muted-foreground">
          <CoveMark className="size-8" />
          <span>
            {range ? "Cove" : "Your cloud drive."}
            <span className="block text-foreground">{range ? "The mountain mount." : "Private beta for Mac."}</span>
          </span>
        </p>
        {range ? (
          <ChromeCta href={`${site.range.path}#enquire`}>Enquire</ChromeCta>
        ) : (
          <ChromeCta onClick={() => openWaitlist()}>A seat</ChromeCta>
        )}
      </div>
    </div>
  );
}
