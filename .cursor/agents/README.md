# Cove marketing agents

Project skills live in `.cursor/skills/`. Invoke them in Cursor with the skill name, or ask the agent to “follow the cove-social-executive skill” / “run week-1 social pack”.

| Agent / skill | Role | Writes |
| --- | --- | --- |
| [`cove-social-executive`](../skills/cove-social-executive/SKILL.md) | Social Media Executive + B2B copywrite manager (LinkedIn, IG, X, press, blogs) | `docs/social/**` |
| [`cove-week1-social-pack`](../skills/cove-week1-social-pack/SKILL.md) | Week-1 pack only: post files from campaign PNGs | `docs/social/week-1/**` |

## Rules both agents share

- Draft files only. No unattended posting.
- British English. Prefer `:` or `|` (no em dashes).
- Claims from `site.ts` / `campaigns.ts` only.
- Visual posts must cite `public/campaign/...` assets.
- Human sets front matter `status: approved` before scheduling.

## Typical prompts

```
Follow the cove-social-executive skill. Draft a LinkedIn post and a short
press release announcing the Cove private beta waitlist.
```

```
Run the cove-week1-social-pack skill. Refresh docs/social/week-1 from
current campaign assets.
```
