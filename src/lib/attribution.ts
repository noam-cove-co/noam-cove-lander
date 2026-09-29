"use client";

const STORAGE_KEY = "cove_attribution";
const COOKIE_KEY = "cove_attr";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ref?: string;
  land?: string;
  /** Multi-step funnel id, e.g. look-familiar */
  funnel?: string;
  funnel_step?: string;
  desk?: string;
  gclid?: string;
  fbclid?: string;
  firstTouchAt?: string;
  lastTouchAt?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "gclid",
  "fbclid",
] as const;

function readCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )cove_attr=([^;]*)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as Attribution;
  } catch {
    return null;
  }
}

function writeCookie(value: Attribution) {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 90;
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(value))}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Attribution;
  } catch {
    // fall through
  }
  return readCookie() ?? {};
}

export function writeAttribution(next: Attribution) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // cookie still helps
  }
  writeCookie(next);
}

/** Capture UTM / click ids / ref from the current URL and merge into attribution. */
export function captureAttribution(land?: string): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const previous = readAttribution();
  const now = new Date().toISOString();
  const patch: Attribution = { ...previous };

  let touched = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      patch[key] = value.slice(0, 120);
      touched = true;
    }
  }

  if (land) {
    patch.land = land;
    touched = true;
  }

  if (touched || !previous.firstTouchAt) {
    if (!patch.firstTouchAt) patch.firstTouchAt = now;
    patch.lastTouchAt = now;
    writeAttribution(patch);
  } else if (land && previous.land !== land) {
    patch.land = land;
    patch.lastTouchAt = now;
    writeAttribution(patch);
  }

  return patch;
}

export function attributionProperties(extra?: Record<string, unknown>) {
  const attr = readAttribution();
  return {
    utm_source: attr.utm_source ?? null,
    utm_medium: attr.utm_medium ?? null,
    utm_campaign: attr.utm_campaign ?? null,
    utm_content: attr.utm_content ?? null,
    utm_term: attr.utm_term ?? null,
    referral_code: attr.ref ?? null,
    land_page: attr.land ?? null,
    funnel: attr.funnel ?? null,
    funnel_step: attr.funnel_step ?? null,
    desk: attr.desk ?? null,
    gclid: attr.gclid ?? null,
    fbclid: attr.fbclid ?? null,
    ...extra,
  };
}

/** Merge funnel progress fields without wiping UTMs. */
export function patchFunnelAttribution(
  patch: Pick<Attribution, "funnel" | "funnel_step" | "desk" | "land">,
) {
  if (typeof window === "undefined") return readAttribution();
  const previous = readAttribution();
  const next: Attribution = {
    ...previous,
    ...patch,
    lastTouchAt: new Date().toISOString(),
    firstTouchAt: previous.firstTouchAt ?? new Date().toISOString(),
  };
  writeAttribution(next);
  return next;
}

export function withUtm(path: string, overrides?: Partial<Attribution>) {
  const attr = { ...readAttribution(), ...overrides };
  const url = new URL(path, typeof window !== "undefined" ? window.location.origin : "http://localhost");
  for (const key of UTM_KEYS) {
    const value = attr[key];
    if (value) url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}`;
}
