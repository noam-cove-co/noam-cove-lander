# Cove marketing agents

Project skills live in `.cursor/skills/`. Invoke them in Cursor with the skill name, or ask the agent to follow a named skill.

| Agent / skill | Role | Writes |
| --- | --- | --- |
| [`cove-ads`](cove-ads.md) + [`ads`](../skills/ads/SKILL.md) | Paid-media expert (Claude Ads): audit, plan, create, draft launch/optimise, monitor, experiment, report | `.claude-ads/runs/**` |
| Claude Ads platform / workflow skills | `ads-meta`, `ads-google`, `ads-plan`, `ads-create`, … | `.claude-ads/runs/**` |
| Claude Ads specialist agents | `audit-*`, `copy-writer`, `creative-strategist`, `visual-designer`, … | Worker outputs under runs |
| [`cove-social-executive`](../skills/cove-social-executive/SKILL.md) | Social Media Executive + B2B copywrite manager (LinkedIn, IG, X, press, blogs) | `docs/social/**` |
| [`cove-week1-social-pack`](../skills/cove-week1-social-pack/SKILL.md) | Week-1 pack only: post files from campaign PNGs | `docs/social/week-1/**` |

Full Claude Ads install notes: [`docs/claude-ads.md`](../../docs/claude-ads.md). Cove profile: [`.claude-ads/`](../../.claude-ads/).

## Rules shared across marketing agents

- Draft artifacts only. No unattended posting or live ad-account writes by default.
- British English. Prefer `:` or `|` (no em dashes).
- Claims from `site.ts` / `campaigns.ts` / approved brand-profile observations only.
- Visual posts and paid creatives must cite `public/campaign/...` assets.
- Human sets front matter `status: approved` (social) or an approved mutation plan (paid) before anything goes live.

## Typical prompts

```
Follow the cove-ads agent / ads skill. Run /ads next, then /ads plan for
Meta, Google, and LinkedIn waitlist acquisition using the Cove setup profile.
```

```
Follow the ads skill. /ads create: Meta feed and LinkedIn single-image
briefs from public/campaign/own-drive assets. Draft only.
```

```
Follow the cove-social-executive skill. Draft a LinkedIn post and a short
press release announcing the Cove private beta waitlist.
```

```
Run the cove-week1-social-pack skill. Refresh docs/social/week-1 from
current campaign assets.
```
