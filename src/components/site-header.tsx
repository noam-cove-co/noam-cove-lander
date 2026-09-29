"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { CoveMark, Wordmark } from "@/components/brand";
import { InstallButton } from "@/components/install-button";
import { isRangePath } from "@/components/route-tone";
import { useWaitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const navCta = "More space";

function ChromeCta({
  children,
  onClick,
  href,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const classes = cn("inline-flex items-center gap-1.5 text-sm font-medium text-foreground", className);
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
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

function ProductMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [pinned, setPinned] = useState(false);
  const [hover, setHover] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const shown = pinned || hover;

  useEffect(() => {
    if (!pinned) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setPinned(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinned(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  if (onNavigate) {
    return (
      <div className="pt-1">
        <p className="px-0 pt-1 text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">{site.menu.label}</p>
        {site.menu.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="block py-2.5 text-lg"
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        aria-expanded={shown}
        aria-controls="product-menu"
        onClick={() => setPinned((value) => !value)}
        className={cn("inline-flex items-center gap-1 text-sm text-foreground/75 hover:text-foreground", shown && "text-foreground")}
      >
        {site.menu.label}
        <ChevronDown className={cn("size-3.5 transition-transform", shown && "rotate-180")} />
      </button>
      {shown ? (
        <div id="product-menu" className="absolute top-full left-0 z-50 pt-3">
          <div className="w-80 border border-foreground/10 bg-background p-2 shadow-[0_18px_40px_-28px_rgba(14,19,32,0.45)]">
            {site.menu.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setPinned(false)}
                className="block px-3 py-2.5 hover:bg-foreground/5"
              >
                <span className="block font-serif text-xl tracking-tight">{item.label}</span>
                <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{item.detail}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const { openWaitlist } = useWaitlist();
  const pathname = usePathname();
  const router = useRouter();
  const range = isRangePath(pathname);
  const [open, setOpen] = useState(false);
  const demoAfterClose = useRef(false);

  const scrollToDemo = useCallback(() => {
    router.push("/demo");
  }, [router]);

  function openDemo() {
    if (open) {
      demoAfterClose.current = true;
      setOpen(false);
      return;
    }
    scrollToDemo();
  }

  useEffect(() => {
    if (open || !demoAfterClose.current) return;
    demoAfterClose.current = false;
    scrollToDemo();
  }, [open, scrollToDemo]);

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
        "sticky top-0 z-40 md:border-b md:border-foreground/10 md:bg-background/90 md:backdrop-blur-md",
        scrolled && "md:bg-background/95",
      )}
    >
      <div className="px-3 pt-[max(0.55rem,env(safe-area-inset-top))] md:px-0 md:pt-0">
      <div
        className={cn(
          "mx-auto max-w-6xl border border-foreground/10 bg-background/70 shadow-[0_16px_40px_-28px_rgba(14,19,32,0.55),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl",
          open ? "rounded-[1.6rem]" : "rounded-full",
          "md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-none",
        )}
      >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-2.5 md:h-16 md:gap-3 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Cove, home">
          <span className="grid h-11 place-items-center rounded-full bg-[#1d1d1f] px-3 md:h-auto md:rounded-none md:bg-transparent md:px-0">
            <CoveMark priority className="size-8" />
          </span>
          <span className="leading-none">
            <Wordmark className="text-[1.55rem]" />
            <sup className="ml-3 align-super font-sans text-[0.55rem] font-medium tracking-[0.14em] text-cove">
              BETA
            </sup>
          </span>
        </Link>
        <nav className="ml-6 hidden items-center gap-5 md:flex" aria-label="Primary">
          <ProductMenu />
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/75 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          {range ? null : <InstallButton iconOnly choices className="max-md:hidden" />}
          {range ? (
            <ChromeCta href={`${site.range.path}#enquire`}>Enquire</ChromeCta>
          ) : (
            <>
              {/* hidden! overrides the unlayered .try-mac-frame display rule on desktop */}
              <span className="try-mac-frame shrink-0 md:hidden!">
                <button type="button" onClick={openDemo} className="try-mac px-4 py-1.5 text-sm font-medium">
                  Try now
                </button>
              </span>
              <ChromeCta className="max-md:hidden" onClick={() => openWaitlist()}>
                {navCta}
              </ChromeCta>
            </>
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
        <nav className="border-t border-foreground/10 px-4 pt-1 pb-3 md:hidden" aria-label="Mobile">
          <ProductMenu onNavigate={() => setOpen(false)} />
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-2.5 text-lg",
                range && item.href === site.range.path && "text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
          {range ? null : (
            <div className="mt-1 border-t border-foreground/10 pt-2.5">
              <ChromeCta
                onClick={() => {
                  setOpen(false);
                  openWaitlist();
                }}
              >
                {navCta}
              </ChromeCta>
            </div>
          )}
        </nav>
      ) : null}
      </div>
      </div>
    </header>
  );
}

export function MobileJoinBar() {
  const { openWaitlist } = useWaitlist();
  const pathname = usePathname();
  const range = isRangePath(pathname);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <p className="flex min-w-0 items-center gap-2.5 text-sm leading-tight text-muted-foreground">
          <CoveMark className="size-8 shrink-0" />
          <span className="min-w-0">
            {range ? "Cove" : "Your cloud drive."}
            <span className="block text-foreground">{range ? "The mountain mount." : "Private beta for Mac."}</span>
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-0.5">
          <InstallButton iconOnly choices menuUp />
          {range ? (
            <ChromeCta href={`${site.range.path}#enquire`}>Enquire</ChromeCta>
          ) : (
            <ChromeCta onClick={() => openWaitlist()}>{navCta}</ChromeCta>
          )}
        </div>
      </div>
    </div>
  );
}
