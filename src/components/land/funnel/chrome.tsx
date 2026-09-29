"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/config/site";
import {
  STAYS_LIGHT_FUNNEL,
  type StaysLightStepId,
  nextStaysLightStep,
  prevStaysLightStep,
  staysLightStepById,
  staysLightStepIndex,
  staysLightSteps,
} from "@/config/stays-light-funnel";
import { track } from "@/lib/analytics";
import { patchFunnelAttribution, withUtm } from "@/lib/attribution";
import { AttributionBeacon } from "@/components/attribution-beacon";
import { CoveMark, Wordmark } from "@/components/brand";

const LAND = "stays-light";

export function StaysLightChrome({
  stepId,
  children,
  tone = "atelier",
}: {
  stepId: StaysLightStepId;
  children: React.ReactNode;
  tone?: "atelier" | "ink";
}) {
  const step = staysLightStepById(stepId)!;
  const next = nextStaysLightStep(stepId);
  const prev = prevStaysLightStep(stepId);
  const index = staysLightStepIndex(stepId);
  const ink = tone === "ink";

  useEffect(() => {
    patchFunnelAttribution({
      funnel: STAYS_LIGHT_FUNNEL,
      funnel_step: stepId,
      land: LAND,
    });
    track(site.analytics.events.funnelStepViewed, {
      land: LAND,
      funnel: STAYS_LIGHT_FUNNEL,
      step: stepId,
      step_index: index + 1,
    });
  }, [stepId, index]);

  function continueHref() {
    if (!next) return withUtm("/land/join-the-list");
    if (next.id === "list") {
      return withUtm("/land/join-the-list", {
        utm_campaign: "stays-light",
        utm_content: `funnel-${stepId}`,
      });
    }
    return withUtm(next.path);
  }

  function onContinue() {
    track(site.analytics.events.funnelStepCompleted, {
      land: LAND,
      funnel: STAYS_LIGHT_FUNNEL,
      step: stepId,
      next: next?.id ?? "list",
    });
    track(site.analytics.events.landCta, {
      land: LAND,
      cta: step.nextLabel ?? "Continue",
      funnel: STAYS_LIGHT_FUNNEL,
      step: stepId,
    });
  }

  return (
    <div
      className={`min-h-svh ${
        ink ? "bg-[#0e1320] text-[#f5f6f8]" : "bg-[#e9e7e1] text-[#0e1320]"
      }`}
    >
      <AttributionBeacon land={`${LAND}:${stepId}`} />
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          ink ? "border-white/10 bg-[#0e1320]/92" : "border-[#0e1320]/10 bg-[#e9e7e1]/92"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2" aria-label="Cove, home">
            <CoveMark className="size-8" />
            <span className="inline-flex items-center gap-1.5">
              <Wordmark className={`text-[1.4rem] ${ink ? "text-white" : ""}`} />
              <span
                className={`translate-y-[0.35em] font-sans text-[0.52rem] font-medium tracking-[0.16em] ${
                  ink ? "text-[#3dcea0]" : "text-[#0e6b56]"
                }`}
              >
                BETA
              </span>
            </span>
          </Link>
          <nav aria-label="Journey" className="hidden items-center gap-0 md:flex">
            {staysLightSteps.map((item, i) => {
              const current = i === index;
              const done = i < index;
              return (
                <span key={item.id} className="inline-flex items-center">
                  {i > 0 ? (
                    <span className={`mx-2 h-px w-6 ${ink ? "bg-white/20" : "bg-[#0e1320]/15"}`} aria-hidden />
                  ) : null}
                  <Link
                    href={withUtm(item.path)}
                    className={`font-sans text-[0.68rem] tracking-[0.18em] uppercase transition-colors ${
                      current
                        ? ink
                          ? "text-white"
                          : "text-[#0e1320]"
                        : done
                          ? ink
                            ? "text-[#3dcea0]"
                            : "text-[#0e6b56]"
                          : ink
                            ? "text-white/35 hover:text-white/70"
                            : "text-[#0e1320]/35 hover:text-[#0e1320]/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </span>
              );
            })}
          </nav>
          <p
            className={`font-sans text-[0.68rem] tracking-[0.16em] uppercase md:hidden ${
              ink ? "text-white/50" : "text-[#0e1320]/45"
            }`}
          >
            {String(index + 1).padStart(2, "0")} · {step.label}
          </p>
        </div>
      </header>

      {children}

      {step.nextLabel && next ? (
        <footer
          className={`sticky bottom-0 z-30 border-t backdrop-blur-md ${
            ink ? "border-white/10 bg-[#0e1320]/94" : "border-[#0e1320]/10 bg-[#e9e7e1]/94"
          }`}
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-5 text-sm">
              {prev ? (
                <Link
                  href={withUtm(prev.path)}
                  className={ink ? "text-white/45 hover:text-white" : "text-[#0e1320]/45 hover:text-[#0e1320]"}
                >
                  ← {prev.label}
                </Link>
              ) : (
                <span className={ink ? "text-white/30" : "text-[#0e1320]/30"}>Cove</span>
              )}
              <Link
                href={withUtm("/land/join-the-list")}
                onClick={() =>
                  track(site.analytics.events.landCta, {
                    land: LAND,
                    cta: "Skip to seat",
                    funnel: STAYS_LIGHT_FUNNEL,
                    step: stepId,
                  })
                }
                className={ink ? "text-white/35 hover:text-white/70" : "text-[#0e1320]/35 hover:text-[#0e1320]/70"}
              >
                Skip to the list
              </Link>
            </div>
            <Link
              href={continueHref()}
              onClick={onContinue}
              className={`inline-flex h-12 items-center justify-center px-7 text-[14px] tracking-[0.04em] ${
                ink
                  ? "bg-[#f5f6f8] text-[#0e1320] hover:bg-white"
                  : "bg-[#0e1320] text-[#f5f6f8] hover:bg-[#1a2233]"
              }`}
            >
              {step.nextLabel}
            </Link>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
