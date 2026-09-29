# Cove Meta strategy (phase 0: no budget)

**Status:** draft · **Spend:** £0 · **Goal:** lock positioning, creative angles, and measurement so we can plug in accounts later.

## North star

Qualified private-beta waitlist joins from Mac-owning individuals (and small studios) in the UK/EU first, US secondary once creative is proven.

## Funnel

1. **Attention:** pain of a full Mac / heavy libraries (Look familiar?, storage guilt).
2. **Comprehension:** Cove mounts like a drive in Finder; files stay in the cloud.
3. **Action:** Join the waitlist (`/land/join-the-list` or `/land/stays-light` → list).

## Campaign architecture (create later in Ads Manager)

| Object | Name (suggested) | Notes |
| --- | --- | --- |
| Campaign | `cove-founding-beta-meta` | Outcome: conversions / leads when Pixel exists; traffic until then |
| Ad set A | `prospecting-mac-storage` | Broad + interest soft: Mac, photography, video, creative tools |
| Ad set B | `retarget-site-visitors` | Later: site visitors 7–30d who did not join |
| Ad set C | `lookalike-waitlist` | Later: when waitlist CRM size allows |

Do **not** create these via API until Pixel, Page, and budget ceilings are approved.

## Creative angles (test ladder)

1. **Stays light** — product promise, quiet confidence (hero stills + Seedance premium reveal later).
2. **Look familiar** — storage full / nearly full, wry UK tone.
3. **Finder mount** — demo of Locations beside Macintosh HD (use existing demo stills; video when ArcAds key present).
4. **Desk variants** — home / marketing / studio / agents (same product, different words).
5. **Craft / Yorkshire** — NOAM Co. maker story (lighter weight; brand, not performance primary).

## Formats to produce first (offline OK)

| Format | Source now | Next with ArcAds |
| --- | --- | --- |
| 1:1 feed | `od-fb-*`, `od-ig-*` | chatgpt-image-ad / nano-banana templates |
| 4:5 feed | crop from existing | regenerate to template |
| 9:16 story/reels | `od-story-*` | Seedance UGC + premium reveal |
| Carousel | own-drive + out-of-space sequence | image-ad-clone from winners |

## Measurement (when Pixel lands)

Primary: `Waitlist Joined` (or Lead) matching Mixpanel `Waitlist Joined`.  
Secondary: landing views, CTA clicks.  
UTMs mandatory on every ad URL.

## Explicit non-goals for phase 0

- No daily budget, no ABO/CBO, no Advantage+ spend.
- No live deploy (even paused) until Page + ad account IDs are filled in MASTER_CONTEXT.
- No competitor scraping that violates Meta ToS; Ad Library research only with a valid token and human review.
