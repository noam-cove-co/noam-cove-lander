"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Share } from "lucide-react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { useWaitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "cn";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function subscribeInstalled(onChange: () => void) {
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function readInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function readIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function subscribeNothing() {
  return () => {};
}

export function InstallButton({
  className,
  label = "Add to Home Screen",
  iconOnly = false,
  showLabel = false,
  choices = false,
  menuUp = false,
}: {
  className?: string;
  label?: string;
  /** Icon only, including on wide screens. Used in the mobile bottom bar. */
  iconOnly?: boolean;
  /** Always show the words, including on a phone. Used in the page-end callout. */
  showLabel?: boolean;
  /** Share icon opens Add to Home Screen, or join and refer. */
  choices?: boolean;
  /** Open the choices above the icon. Used on the bottom bar. */
  menuUp?: boolean;
}) {
  const { openWaitlist } = useWaitlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [accepted, setAccepted] = useState(false);
  const installed = useSyncExternalStore(subscribeInstalled, readInstalled, () => false);
  const ios = useSyncExternalStore(subscribeNothing, readIos, () => false);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if ((installed || accepted) && !choices) return null;

  async function onClick() {
    track(site.analytics.events.installPrompt, { hasPrompt: Boolean(deferred), ios });
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      setDeferred(null);
      if (choice.outcome === "accepted") setAccepted(true);
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <div ref={rootRef} className="relative">
        <Button
          type="button"
          variant="ghost"
          size={iconOnly || choices ? "icon" : "default"}
          onClick={() => {
            if (choices) {
              setMenuOpen((value) => !value);
              return;
            }
            void onClick();
          }}
          aria-label={choices ? "Share" : iconOnly ? label : undefined}
          aria-expanded={choices ? menuOpen : undefined}
          aria-haspopup={choices ? "menu" : undefined}
          className={cn(iconOnly || choices ? "size-10 rounded-md" : "h-10 rounded-md px-3 text-sm", className)}
        >
          <Share />
          {iconOnly || choices ? null : <span className={showLabel ? undefined : "hidden sm:inline"}>{label}</span>}
        </Button>
        {choices && menuOpen ? (
          <div
            role="menu"
            className={cn(
              "absolute right-0 z-50 w-52 border border-foreground/10 bg-background p-1 shadow-[0_18px_40px_-28px_rgba(14,19,32,0.55)]",
              menuUp ? "bottom-full mb-2" : "top-full mt-2",
            )}
          >
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm hover:bg-foreground/5"
              onClick={() => {
                setMenuOpen(false);
                void onClick();
              }}
            >
              Add to Home Screen
            </button>
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm hover:bg-foreground/5"
              onClick={() => {
                setMenuOpen(false);
                openWaitlist();
              }}
            >
              Join or refer
            </button>
          </div>
        ) : null}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl bg-background/95 p-6 backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl font-normal tracking-tight">
              Keep Cove close
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Add this page to your home screen while you wait for the Mac drive.
            </DialogDescription>
          </DialogHeader>
          {ios ? (
            <ol className="grid gap-3 text-sm leading-relaxed">
              <li className="glass rounded-2xl px-4 py-3">1. Tap the Share button in Safari.</li>
              <li className="glass rounded-2xl px-4 py-3">2. Choose Add to Home Screen.</li>
              <li className="glass rounded-2xl px-4 py-3">3. Cove sits with your other apps until the beta opens.</li>
            </ol>
          ) : (
            <div className="grid gap-3 text-sm leading-relaxed">
              <p className="glass rounded-2xl px-4 py-3">
                In Chrome or Edge, open the browser menu and choose Install Cove.
              </p>
              <p className="glass rounded-2xl px-4 py-3">
                In Safari on a Mac, use File, then Add to Dock.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
