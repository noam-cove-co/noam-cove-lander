# Master context: Cove Meta + ArcAds creatives

Read this before generating paid creatives or Meta copy for Cove.

## Brand

- **Product:** Cove: your own cloud drive, on your Mac.
- **Maker:** NOAM Co. (NOAM Consultancy), Yorkshire.
- **Tone:** Quiet confidence. Short sentences. Craft without hype.
- **Audience (paid, phase 0):** Mac owners whose system disk is full: home film, marketing campaigns, studio libraries, agent repos.
- **Offer now:** Private beta waitlist (not a public download).
- **Words to use:** own cloud drive, Finder, Locations, Macintosh HD, one click, stays light, private beta, Yorkshire.
- **Words to avoid:** revolutionary, game-changing, AI-powered cloud, unlimited free, em dashes in UI copy.

## Destinations (use with UTMs)

| Intent | URL |
| --- | --- |
| Waitlist | `https://cove.will.me.uk/land/join-the-list` |
| Product journey | `https://cove.will.me.uk/land/stays-light` |
| Look familiar | `https://cove.will.me.uk/land/out-of-space` |
| Own drive | `https://cove.will.me.uk/land/own-drive` |

Suggested UTM skeleton: `utm_source=meta&utm_medium=paid_social&utm_campaign=founding-beta&utm_content=<creative_id>`.

## Reference assets (on disk)

Put new refs under `tools/arcads-claude-code/references/` when generating via ArcAds. Existing Cove campaign stills:

- `public/campaign/own-drive/` (FB / IG / LI / OG / poster / story)
- `public/campaign/out-of-space/`
- `public/campaign/join-the-list/`

## Meta ad deployment (empty until accounts exist)

- **Default ad account** (`META_AD_ACCOUNT_ID`): _pending_
- **Facebook Page ID** (`META_PAGE_ID`): _pending_
- **Instagram user ID** (`META_IG_USER_ID`): _pending_
- **Meta Pixel ID** (`META_PIXEL_ID`): _pending_
- **Default destination:** waitlist URL above
- **Default CTA:** `SIGN_UP`
- **Default ad sets:** _create in Ads Manager first_

Access token stays in `.env` only. Ads created by `meta-ad-builder` stay **PAUSED**.

## ArcAds

- Local clone: `tools/arcads-claude-code`
- Credentials: `tools/arcads-claude-code/.env` (gitignored)
- Skills synced into `.cursor/skills/` (arcads-external-api, image skills, meta-ad-builder, pixar/claymation/caption recipes)

## Changelog

### 2026-09-29

- **Decision:** Hybrid Meta + creatives infra first; no budget or live API until human-owned accounts exist.
- **What changed:** Installed ArcAds skill pack; wrote strategy pack under `docs/ads/meta/`.
- **Why:** Ship strategy and creative pipeline while accounts are still being created.
