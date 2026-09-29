---
name: cove-meta-creatives
description: >-
  Cove hybrid Meta ads + ArcAds creatives operator. Use for waitlist Meta
  strategy, copy decks, creative briefs, ArcAds generation, and paused-only
  Meta deploy prep. No budget and no live spend until accounts are approved.
---

# Cove Meta + creatives

1. Read [`docs/ads/meta-creatives-hybrid.md`](../../docs/ads/meta-creatives-hybrid.md) and [`docs/ads/MASTER_CONTEXT.cove-ads.md`](../../docs/ads/MASTER_CONTEXT.cove-ads.md).
2. Prefer existing art under `public/campaign/` before spending ArcAds credits.
3. For strategy / audits / draft plans, use Claude Ads (`ads`, `ads-meta`, `ads-plan`, `ads-create`).
4. For generative stills/video, use ArcAds skills (`arcads-external-api`, `chatgpt-image-ad`, `nano-banana-image-ad`, `pixar-style-ad`, …) only after confirming `tools/arcads-claude-code/.env` credentials and credit cost with the human.
5. For Meta Marketing API, use `meta-ad-builder` in **research or PAUSED deploy** modes only. Refuse spend changes and refuse unpaused publishing.
6. Keep British English; no em dashes in customer-facing copy; claims from `site.ts` / approved profiles only.
7. Write lasting artifacts under `docs/ads/meta/` (and Postiz when scheduling organic companions).

If ArcAds or Meta tokens are missing, continue with briefs, copy, and static asset plans; do not invent successful API calls.
