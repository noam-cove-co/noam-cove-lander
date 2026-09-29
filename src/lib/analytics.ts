import { site } from "@/config/site";
import { attributionProperties, readAttribution } from "@/lib/attribution";

const DISTINCT_KEY = "cove_distinct_id";

function distinctId() {
  const existing = window.localStorage.getItem(DISTINCT_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(DISTINCT_KEY, next);
  return next;
}

type TrackProps = Record<string, unknown>;

function baseProperties(properties?: TrackProps) {
  const attr = readAttribution();
  return {
    token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    distinct_id: distinctId(),
    campaign: site.campaign.id,
    product: site.product,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    ...attributionProperties(),
    land: attr.land ?? properties?.land ?? null,
    ...properties,
  };
}

function send(payload: { event: string; properties: TrackProps }) {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[cove]", payload.event, payload.properties);
    }
    return;
  }

  const body = new URLSearchParams({
    data: btoa(JSON.stringify([{ ...payload, properties: { ...payload.properties, token } }])),
  });

  const url = "https://api.mixpanel.com/track";
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
    return;
  }

  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    keepalive: true,
  });
}

/** Records a product event. Without a Mixpanel token this stays on the desk. */
export function track(event: string, properties?: TrackProps) {
  if (typeof window === "undefined") return;
  send({ event, properties: baseProperties(properties) });
}

/** Mixpanel people identify — queues when token present. */
export function identify(email: string, traits?: TrackProps) {
  if (typeof window === "undefined") return;
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  const id = distinctId();
  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[cove] identify", email, traits ?? {});
    }
    return;
  }

  const body = new URLSearchParams({
    data: btoa(
      JSON.stringify([
        {
          $token: token,
          $distinct_id: id,
          $set: {
            $email: email,
            ...attributionProperties(),
            ...traits,
          },
        },
      ]),
    ),
  });

  void fetch("https://api.mixpanel.com/engage#profile-set", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    keepalive: true,
  });
}

export const analyticsEvents = site.analytics.events;
