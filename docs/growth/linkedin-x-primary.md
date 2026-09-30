# Primary growth levers: LinkedIn + X

**Decision (2026-09-29):** LinkedIn and X are Cove’s primary acquisition and growth channels for the founding-beta waitlist. Meta creatives and ArcAds stay in the stack as a **secondary / later paid** path. Instagram remains supporting creative, not the main growth engine.

## Why these two

| Channel | Job | ICP fit |
| --- | --- | --- |
| **LinkedIn** | Credibility, B2B desks (marketing, studio, agents), founder/maker trust, waitlist joins | High: desks that buy tools with words |
| **X** | Sharp hooks, Mac/maker discourse, fast tests of angles, traffic to land pages | High: storage-guilt and Finder-native ideas travel |

Named “audience of one” scenes (family media → marketers → agencies → studio → vibe coders / agents): [`docs/growth/icp.md`](icp.md).

Meta / IG / paid: keep producing offline; turn on when accounts + budget exist. Do not let paid setup block organic LI/X cadence.

## Tooling

| Layer | Tool | Mode now |
| --- | --- | --- |
| LinkedIn skills | `.cursor/skills/linkedin-marketing` ([sergebulaev/linkedin-skills](https://github.com/sergebulaev/linkedin-skills)) | Draft-only until Publora |
| X skills | `.cursor/skills/x-marketing` ([sergebulaev/x-skills](https://github.com/sergebulaev/x-skills)) | Draft-only until Publora |
| Voice | Filled Cove profiles inside each bundle’s `references/voice-profile.md` | Active |
| Organic calendar | Postiz + `docs/social/` | Plan / approve |
| Publish bridge (later) | Publora API keys, or Postiz → SocialSDK | After accounts exist |
| Paid Meta | ArcAds + Claude Ads `ads-meta` | Phase 0 offline |

Refresh skills:

```bash
bash tools/install-linkedin-x-skills.sh
```

## Cadence (phase 0)

| Channel | Volume | Notes |
| --- | --- | --- |
| LinkedIn | 3 posts / week | Mix: stays light · look familiar · craft/maker · desk story |
| X | 5–7 posts / week (or 3 posts + 1 short thread) | Test hooks; promote winners to LinkedIn via `linkedin-repurposer` / `x-repurposer` |

Always: draft → human `approved` → then Publora/Postiz. Never unattended posting.

## Funnel

1. Hook on LI/X (pain or Finder proof)
2. Land on `/land/stays-light`, `/land/out-of-space`, or `/land/join-the-list` with UTMs (`utm_source=linkedin|x`)
3. Waitlist + invite ladder
4. Later: retarget engagers with Meta once Pixel exists

## Agent prompts

```
Follow linkedin-marketing / linkedin-post-writer. Draft a founding-beta
LinkedIn post using the Cove voice profile. Draft only.
```

```
Follow x-marketing / x-post-writer. Turn the Look familiar angle into
three X variants under 220 characters. Draft only.
```

```
Follow linkedin-content-planner. Build a 7-day founder plan for Cove
waitlist growth. LinkedIn primary; note X companions.
```

## Credentials (when ready)

Add to repo `.env.local` or the skill bundle `.env` (never commit):

```
PUBLORA_API_KEY=
LINKEDIN_PLATFORM_ID=
X_PLATFORM_ID=
# optional reads
APIFY_TOKEN=
```

Until then, skills return copy-paste blocks.
