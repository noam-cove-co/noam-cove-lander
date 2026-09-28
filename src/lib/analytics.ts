import { site } from "@/config/site";

const DISTINCT_KEY = "cove_distinct_id";

function distinctId() {
  const existing = window.localStorage.getItem(DISTINCT_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(DISTINCT_KEY, next);
  return next;
}

/** Records a product event. Without a Mixpanel token this stays on the desk. */
export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  const payload = {
    event,
    properties: {
      token,
      distinct_id: distinctId(),
      campaign: site.campaign.id,
      product: site.product,
      ...properties,
    },
  };

  if (!token) {
    if (process.env.NODE_ENV === "development") {
      console.debug("[cove]", event, properties ?? {});
    }
    return;
  }

  const body = new URLSearchParams({
    data: btoa(JSON.stringify([payload])),
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
