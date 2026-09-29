"use client";

import { useLayoutEffect, useState } from "react";
import { site } from "@/config/site";
import { DemoStage } from "@/components/demo-stage";
import { MountDemo } from "@/components/mount-demo";
import { RangeIntake } from "@/components/range-intake";
import { cn } from "cn";

type Mode = "cove" | "mtn";

export function DemoSwitcher() {
  const [mode, setMode] = useState<Mode>("cove");

  useLayoutEffect(() => {
    if (mode === "mtn") {
      document.documentElement.dataset.tone = "range";
    } else {
      delete document.documentElement.dataset.tone;
    }
    return () => {
      delete document.documentElement.dataset.tone;
    };
  }, [mode]);

  return (
    <div>
      <header className="mx-auto w-full max-w-6xl px-4 pt-16 pb-6 sm:px-6 sm:pt-24">
        <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">Demo</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl">
          See the drive. Then see the mountain.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Cove is your own cloud drive on a Mac. Mt. Mtn. is the same click when the work is the size of a landscape.
        </p>
        <div
          role="tablist"
          aria-label="Demo mode"
          className="mt-8 inline-flex rounded-md border border-foreground/15 p-1"
        >
          {(
            [
              { id: "cove", label: "Cove" },
              { id: "mtn", label: site.range.name },
            ] as const
          ).map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(item.id)}
                className={cn(
                  "rounded-[0.25rem] px-4 py-2 text-sm transition-colors",
                  active ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {mode === "cove"
            ? "One click, and your cloud drive shows up in Finder."
            : "Scroll the intake. The heavy files leave the laptop for the mountain."}
        </p>
      </header>

      {mode === "cove" ? (
        <div className="pb-16 sm:pb-24">
          <DemoStage length={2}>
            <MountDemo />
          </DemoStage>
        </div>
      ) : (
        <RangeIntake />
      )}
    </div>
  );
}
