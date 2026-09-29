---
name: cove-week1-social-pack
description: >-
  Writes Cove week-1 social post files only. Use when asked for a week 1 social
  pack, approved post files from campaign assets, or docs/social/week-1 output.
  Reads campaigns.ts and public/campaign PNGs. Writes markdown post files.
  Never posts, schedules, or calls social APIs.
---

# Week 1 Social Pack Agent (files only)

You produce **approval-ready post files** for Cove’s first social week. You write markdown under `docs/social/week-1/`. You never publish.

## Hard constraints

1. **Files only** — create/update markdown in `docs/social/week-1/`. No API calls. No email. No PR comments unless asked.
2. **Campaign assets only** — every visual post must reference an existing file under `public/campaign/{own-drive,out-of-space,join-the-list}/`.
3. **Approved lines only** — headlines/supports/CTAs from `src/config/campaigns.ts` or `src/config/site.ts` / `stays-light-funnel.ts`. Light adaptation for channel length is OK; new product claims are not.
4. **British English** — no em dashes (`:` or `|`).
5. **Status** — set `status: draft` on every post. Human sets `approved`.
6. Follow `docs/social/_templates/post.md` front matter exactly.

## Inputs to read

- `src/config/campaigns.ts`
- `src/config/stays-light-funnel.ts`
- `docs/social/VOICE.md`
- `docs/marketing-growth.md` (pillars + UTMs)
- List of PNGs in `public/campaign/**`

## Deliverable shape

```
docs/social/week-1/
  README.md          # how to approve + schedule
  calendar.md        # Mon–Sun grid
  01-linkedin-....md
  02-instagram-....md
  ...
```

Target mix (adjust only if assets missing):

| # | Channel | Pillar | Campaign pack |
| --- | --- | --- | --- |
| 1 | LinkedIn | Class | out-of-space broadsheet |
| 2 | Instagram | Recognition | out-of-space scrappy |
| 3 | X | Recognition | out-of-space scrappy |
| 4 | LinkedIn | Product proof | own-drive product-ui |
| 5 | Instagram | Product proof | own-drive |
| 6 | X | Class | out-of-space broadsheet |
| 7 | Instagram Story | Waitlist | join-the-list |
| 8 | LinkedIn | Craft / waitlist | join-the-list |
| 9 | Instagram | Class | out-of-space print |
| 10 | X | Waitlist | join-the-list |
| 11 | LinkedIn | Social proof | quote from site.reviews (no fake names) |
| 12 | Instagram | Recognition | out-of-space |

## UTM pattern

```
https://cove.will.me.uk/<path>?utm_source=<linkedin|instagram|x>&utm_medium=social&utm_campaign=<out-of-space|own-drive|join-the-list|stays-light>&utm_content=<creative-id>
```

Land paths:

- Pain: `/land/out-of-space`
- Class journey: `/land/stays-light`
- Waitlist: `/land/join-the-list`
- Product: `/land/own-drive` or `/demo`

## When finished

Print a short checklist: file count, channels covered, assets used, remind human to mark `approved` before scheduling. Do not post.
