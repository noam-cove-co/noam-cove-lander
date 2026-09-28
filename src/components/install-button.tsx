"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Share } from "lucide-react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
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
}: {
  className?: string;
  label?: string;
}) {
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

  if (installed || accepted) return null;

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
      <Button
        type="button"
        variant="ghost"
        onClick={onClick}
        className={cn("h-10 rounded-md px-3 text-sm", className)}
      >
        <Share />
        <span className="hidden sm:inline">{label}</span>
        <span className="sr-only sm:hidden">{label}</span>
      </Button>
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
