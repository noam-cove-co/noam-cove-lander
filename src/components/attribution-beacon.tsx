"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { captureAttribution, readAttribution } from "@/lib/attribution";
import { site } from "@/config/site";

/** Captures UTM / ref on mount and fires Mixpanel-ready land + attribution events. */
export function AttributionBeacon({
  land,
  pageEvent = true,
}: {
  land?: string;
  pageEvent?: boolean;
}) {
  useEffect(() => {
    const before = readAttribution();
    const attr = captureAttribution(land);
    const hadUtm = Boolean(
      attr.utm_source || attr.utm_medium || attr.utm_campaign || attr.utm_content || attr.utm_term || attr.ref,
    );
    const newlyTouched =
      attr.lastTouchAt !== before.lastTouchAt ||
      attr.utm_source !== before.utm_source ||
      attr.utm_campaign !== before.utm_campaign ||
      attr.ref !== before.ref;

    if (hadUtm && newlyTouched) {
      track(site.analytics.events.attributionCaptured, {
        land,
        utm_source: attr.utm_source,
        utm_medium: attr.utm_medium,
        utm_campaign: attr.utm_campaign,
        utm_content: attr.utm_content,
        referral_code: attr.ref,
      });
    }

    if (attr.ref && attr.ref !== before.ref) {
      track(site.analytics.events.referralAttributed, { referral_code: attr.ref, land });
    }

    if (pageEvent && land) {
      track(site.analytics.events.landView, { land, purpose: land });
    }
  }, [land, pageEvent]);

  return null;
}
