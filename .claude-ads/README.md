# Claude Ads state (Cove)

Project state for [Claude Ads](https://github.com/AgriciDaniel/claude-ads): source-grounded paid-media ops, read-only by default.

| File | Role |
| --- | --- |
| `data-lifecycle.json` | Retention, access, deletion, incident contract |
| `setup-profile.json` | Client, KPIs, platforms, mutation authority |
| `brand-profile.json` | Observed brand facts + provisional inferences |
| `access-log.json` | Operator access notes (no secrets) |
| `runs/` | Per-run JSON / Markdown / HTML / PDF (gitignored) |

## Guardrails

- Mutation authority is `draft-only`. Live account changes need an explicit approved mutation plan.
- Never commit API tokens, cookies, customer lists, or raw ad-account exports.
- Claims and creative must stay grounded in `src/config/site.ts` and `public/campaign/`.

## Commands

In Cursor, follow the project `ads` skill (installed under `.cursor/skills/ads`). Standalone Claude Code installs use `/ads`; plugins use `/claude-ads:ads`.

Typical next steps for Cove:

1. `/ads status` or `/ads next` — blockers (missing account exports today)
2. `/ads plan` — channel / budget / measurement plan from owned assets
3. `/ads create` — copy and creative briefs from campaign PNGs
4. `/ads launch --draft` — draft mutation plan only
5. `/ads audit` — after a dated Meta / Google / LinkedIn export is supplied
