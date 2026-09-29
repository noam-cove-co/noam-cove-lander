# Cove hybrid: Meta ads + creatives production

Infra and creative first. **No budget, no live Meta spend, no autoposting** until accounts, OAuth, and a human approval gate exist.

**Channel priority:** LinkedIn + X are the primary organic acquisition levers ([`docs/growth/linkedin-x-primary.md`](../growth/linkedin-x-primary.md)). This Meta + ArcAds pack is secondary until paid is ready.

## What this stack is for

| Layer | Tooling | Role now | Later |
| --- | --- | --- | --- |
| Paid-media expert | Claude Ads (`/ads`, `ads-meta`) | Strategy, audits from exports, draft mutation plans | Live reads when tokens exist |
| AI creatives | ArcAds skill pack (this install) | Briefs, prompts, still/video production when API key set | Volume creative testing |
| Meta deploy | `meta-ad-builder` | Docs + paused-ad path only | Publish PAUSED ads into existing ad sets |
| Organic / calendar | Postiz + social skills | Plan and schedule drafts | MCP posting once Cove pages exist |
| Owned assets | `public/campaign/**`, Journal | Source of truth for claims and art | Feed Meta + organic |

## Phase 0 (current): tooling + strategy pack

1. ArcAds skills installed under `.cursor/skills/` from local clone `tools/arcads-claude-code`.
2. Cove brand context for creatives: [`MASTER_CONTEXT.cove-ads.md`](MASTER_CONTEXT.cove-ads.md).
3. Seed strategy + Meta copy + creative briefs in [`docs/ads/meta/`](meta/).
4. Existing static creatives already on disk: `public/campaign/own-drive/od-fb-*`, `od-ig-*`, `od-li-*`.

## Phase 1: Arcads credentials (human)

```bash
cd tools/arcads-claude-code
# paste Basic auth or API key into .env (never commit)
./scripts/check-arcads-env.sh
```

Sign up: [arcads.ai](https://arcads.ai/?via=claude-code) · API: [app.arcads.ai/settings/api](https://app.arcads.ai/settings/api)

Optional host tools for video recipes: `ffmpeg`, `jq`, Node (`npx hyperframes`), Whisper.

## Phase 2: Meta account + API (deferred)

Fill when ready (repo `.env.local` / `tools/arcads-claude-code/.env`):

- `META_ACCESS_TOKEN` (`ads_management`)
- `META_AD_ACCOUNT_ID`
- `META_PAGE_ID`, `META_IG_USER_ID`, `META_PIXEL_ID`
- Existing **campaign + ad set** in Ads Manager (builder does not create structure)

Every `meta-ad-builder` deploy creates **PAUSED** ads only. Launch is manual.

## Phase 3: Budget + learning

Only after Phase 2: set daily caps, conversion events (waitlist), UTMs to `/land/*`, and Claude Ads monitoring. Prefer small tests on proven statics before video scale.

## Agent prompts (safe defaults)

```
Follow ads-meta + ads-plan. Using docs/ads/meta/ and the Cove setup profile,
refine the waitlist Meta plan. Draft only. No account writes.
```

```
Follow chatgpt-image-ad / nano-banana-image-ad with MASTER_CONTEXT.cove-ads.md.
Produce Meta feed stills for the "Mac stays light" concept. Confirm credits first.
```

```
Follow meta-ad-builder. Research competitor Mac storage ads from the Ad Library
(read-only). Do not deploy.
```

## British English + claims

Same rules as social: no em dashes in customer-facing copy; claims only from `site.ts` / `campaigns.ts` / approved brand profile. Destination URLs use `https://cove.will.me.uk/land/...` with UTMs.
