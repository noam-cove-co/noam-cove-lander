"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/config/site";
import {
  LOOK_FAMILIAR_FUNNEL,
  type FunnelStepId,
  funnelStepById,
  lookFamiliarSteps,
  nextFunnelStep,
  prevFunnelStep,
} from "@/config/look-familiar-funnel";
import { track } from "@/lib/analytics";
import { patchFunnelAttribution, withUtm } from "@/lib/attribution";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CoveMark, Wordmark } from "@/components/brand";

const LAND = "out-of-space";

export function FunnelChrome({
  stepId,
  children,
  tone = "paper",
}: {
  stepId: FunnelStepId;
  children: React.ReactNode;
  tone?: "paper" | "ink";
}) {
  const step = funnelStepById(stepId)!;
  const next = nextFunnelStep(stepId);
  const prev = prevFunnelStep(stepId);
  const index = lookFamiliarSteps.findIndex((item) => item.id === stepId);
  const ink = tone === "ink";

  useEffect(() => {
    patchFunnelAttribution({
      funnel: LOOK_FAMILIAR_FUNNEL,
      funnel_step: stepId,
      land: LAND,
    });
    track(site.analytics.events.funnelStepViewed, {
      land: LAND,
      funnel: LOOK_FAMILIAR_FUNNEL,
      step: stepId,
      step_index: index + 1,
    });
  }, [stepId, index]);

  function continueHref() {
    if (!next) return withUtm("/land/join-the-list");
    if (next.id === "list") {
      return withUtm("/land/join-the-list", {
        utm_campaign: "out-of-space",
        utm_content: "funnel-proof",
      });
    }
    return withUtm(next.path);
  }

  function onContinue() {
    track(site.analytics.events.funnelStepCompleted, {
      land: LAND,
      funnel: LOOK_FAMILIAR_FUNNEL,
      step: stepId,
      next: next?.id ?? "list",
    });
    track(site.analytics.events.landCta, {
      land: LAND,
      cta: step.nextLabel ?? "Continue",
      funnel: LOOK_FAMILIAR_FUNNEL,
      step: stepId,
    });
  }

  return (
    <div className={`min-h-svh ${ink ? "bg-[#0e1320] text-[#f5f6f8]" : "bg-[#f3f1ea] text-foreground"}`}>
      <AttributionBeacon land={`${LAND}:${stepId}`} />
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          ink ? "border-white/10 bg-[#0e1320]/90" : "border-foreground/10 bg-[#f3f1ea]/90"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
            <CoveMark className="size-8" />
            <span className="inline-flex items-center gap-1.5">
              <Wordmark className={`text-[1.35rem] ${ink ? "text-white" : ""}`} />
              <span
                className={`translate-y-[0.35em] font-sans text-[0.55rem] font-medium tracking-[0.14em] ${
                  ink ? "text-[#3dcea0]" : "text-cove"
                }`}
              >
                BETA
              </span>
            </span>
          </Link>
          <nav aria-label="Funnel progress" className="hidden items-center gap-1.5 sm:flex">
            {lookFamiliarSteps.map((item, i) => {
              const done = i < index;
              const current = i === index;
              const href = item.id === "list" ? withUtm(item.path) : withUtm(item.path);
              return (
                <Link
                  key={item.id}
                  href={href}
                  className={`rounded-full px-2.5 py-1 text-[11px] tracking-[0.04em] transition-colors ${
                    current
                      ? ink
                        ? "bg-white/15 text-white"
                        : "bg-foreground text-paper"
                      : done
                        ? ink
                          ? "text-[#3dcea0]"
                          : "text-cove"
                        : ink
                          ? "text-white/40 hover:text-white/70"
                          : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="tabular-nums opacity-70">{i + 1}</span> {item.label}
                </Link>
              );
            })}
          </nav>
          <p className={`text-sm sm:hidden ${ink ? "text-white/60" : "text-muted-foreground"}`}>
            {index + 1} / {lookFamiliarSteps.length} · {step.label}
          </p>
        </div>
        <div className={`h-0.5 w-full ${ink ? "bg-white/10" : "bg-foreground/8"}`}>
          <div
            className={`h-full transition-[width] duration-500 ${ink ? "bg-[#3dcea0]" : "bg-cove"}`}
            style={{ width: `${((index + 1) / lookFamiliarSteps.length) * 100}%` }}
          />
        </div>
      </header>

      {children}

      {step.nextLabel && next ? (
        <footer
          className={`sticky bottom-0 z-30 border-t backdrop-blur-md ${
            ink ? "border-white/10 bg-[#0e1320]/92" : "border-foreground/10 bg-[#f3f1ea]/92"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-4 text-sm">
              {prev ? (
                <Link
                  href={withUtm(prev.path)}
                  className={ink ? "text-white/55 hover:text-white" : "text-muted-foreground hover:text-foreground"}
                >
                  ← {prev.label}
                </Link>
              ) : (
                <span className={ink ? "text-white/35" : "text-muted-foreground/50"}>Look familiar?</span>
              )}
              <Link
                href={withUtm("/land/join-the-list")}
                onClick={() =>
                  track(site.analytics.events.landCta, {
                    land: LAND,
                    cta: "Skip to list",
                    funnel: LOOK_FAMILIAR_FUNNEL,
                    step: stepId,
                  })
                }
                className={ink ? "text-white/45 hover:text-white/80" : "text-muted-foreground hover:text-foreground"}
              >
                Skip to list
              </Link>
            </div>
            <Link
              href={continueHref()}
              onClick={onContinue}
              className={`inline-flex h-12 items-center justify-center rounded-md px-6 text-[15px] font-medium ${
                ink ? "bg-[#3dcea0] text-[#061018]" : "bg-foreground text-paper"
              }`}
            >
              {step.nextLabel} →
            </Link>
          </div>
        </footer>
      ) : null}
    </div>
  );
}

export function FunnelTryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={() =>
        track(site.analytics.events.landCta, {
          land: LAND,
          cta: label,
          href,
          funnel: LOOK_FAMILIAR_FUNNEL,
        })
      }
      className="try-mac-frame inline-flex w-fit"
      style={{ animation: "none" }}
    >
      <span
        className="try-mac inline-flex h-12 items-center px-6 text-[15px] font-medium whitespace-nowrap"
        style={{ animation: "none" }}
      >
        {label}
      </span>
    </a>
  );
}
