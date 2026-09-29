# Cove waitlist media plan

**Run:** `cove-plan-waitlist-20260929`  
**Created:** 2026-09-29T22:14:58Z  
**Status:** draft (advisory, partial evidence)  
**Currency:** GBP  
**Mutation authority:** draft-only  

## /ads next

### Product status core (deterministic)

Fail-closed: missing `control-plane/manifests/maturity-status.json`. That file belongs to the upstream Claude Ads product repository, not this Cove marketing checkout. Do not treat product maturity as a Cove account health score.

### Highest-priority Cove blocker

**Approve monthly GBP budget + target cost per waitlist join.**

Until that exists, channel `budget_amount` values stay `null` and no launch should be applied.

Next in queue: configure real Meta / Google / LinkedIn account IDs → instrument Waitlist Joined → supply exports before audits → approve pending brand tone/audience inferences.

Unblocked now: this plan, `/ads create`, `/ads launch --draft`.

## Objective

Grow qualified **private-beta waitlist joins** for Cove (NOAM Co., Yorkshire) via Meta, Google, and LinkedIn. Conversion: `POST /api/waitlist` (Mixpanel `Waitlist Joined` when configured).

Primary landers:

| Role | URL |
| --- | --- |
| Product awareness | https://cove.will.me.uk/land/own-drive |
| Pain / familiarity | https://cove.will.me.uk/land/out-of-space |
| Multi-step awareness | https://cove.will.me.uk/land/stays-light |
| Waitlist conversion | https://cove.will.me.uk/land/join-the-list |

## Channel roles

### Meta (primary prospecting + remarketing)

Use existing `own-drive` and `join-the-list` PNG kits (Facebook feed, Instagram square/story). Optimize only to waitlist join once Pixel/CAPI is validated. Treat account / Pixel / conversion cold-start as **unknown** until evidenced; no mature-account benchmarks.

### Google (intent + optional Demand Gen)

Search for Mac cloud-drive / Finder / storage-full intent using **approved site claims only**. No negative keywords without a search terms report. Demand Gen phase-2 can reuse product stills. YouTube stays out of scope until separately planned.

### LinkedIn (professional desks)

Narrow reach to marketing, studio, and agent-builder hypotheses using `od-li-*` / `jl-li-*` creatives. Keep separate from Mt. Mtn. enterprise messaging unless explicitly approved.

## Phased actions

1. **record-budget-cpa** — operator sets GBP ceiling + CPA band  
2. **configure-accounts** — real account IDs; secrets only via env/keychain refs  
3. **instrument-waitlist-conversion** — platform events for waitlist join  
4. **approve-brand-inferences** — tone + audiences  
5. **create-*-briefs** — `/ads create` per platform from `public/campaign/`  
6. **draft-launch-*** — `/ads launch --draft` only  
7. **measurement-window-review** — 7–14 days after first approved spend; never sum mismatched attribution windows  

## Assumptions and exclusions

Assumptions and exclusions are listed in `media-plan.json`. Budget shares, CPA targets, and performance forecasts are intentionally absent.

## Evidence

- `.claude-ads/setup-profile.json` / `brand-profile.json`  
- `src/config/site.ts`, `src/config/campaigns.ts`  
- `public/campaign/manifest.json`  
- Skills: `ads`, `ads-plan`, Meta cold-start contract  

## Owners and rollback

Owner: `noam-co-operator`. Advisor: `paid-media-advisor`.  
Rollback: leave accounts untouched; delete or supersede this run directory; any future live change requires a full mutation gate.
