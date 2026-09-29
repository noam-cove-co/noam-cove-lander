# Claude Ads for Cove

Claude Ads is installed as the paid-media agent for Cove: audits, plans, creative, experiments, monitoring, and reports from authorized exports or account reads. It is **read-only by default**. Live changes stay off until platform, operation, approval, idempotency, verification, audit, and rollback gates all pass.

Upstream: [AgriciDaniel/claude-ads](https://github.com/AgriciDaniel/claude-ads).

## Install (this machine / a new checkout)

Local clone (preferred; no `curl | bash`):

```bash
git clone https://github.com/AgriciDaniel/claude-ads.git tools/claude-ads
cd tools/claude-ads
bash install.sh --source=local
# Cursor project install (skills + agents into .cursor/):
bash install.sh --source=local --target=cursor --project=/workspace
```

`tools/claude-ads/` is gitignored (nested clone). Re-clone when you need to reinstall or upgrade.

Also installed for this environment:

- Claude Code skill home: `~/.claude/skills/ads` (with venv)
- Cursor extension: `~/.cursor/extensions/claude-ads`
- Project skills / agents: `.cursor/skills/ads*`, `.cursor/agents/audit-*`, creative agents

## Cove profile

Validated setup lives in [`.claude-ads/`](../.claude-ads/):

- Business: Cove (NOAM Co.), Yorkshire, private-beta waitlist
- Platforms (planned): Meta, Google, LinkedIn — account IDs still `unconfigured`
- Objective: qualified waitlist joins; conversion = `/api/waitlist`
- Mutation authority: `draft-only`
- Available evidence today: site copy + `public/campaign/` PNGs
- Missing: dated platform exports, budget, target CPA

## How to use in Cursor

Ask the agent to follow the `ads` skill, or use natural language that maps to commands:

| Ask for | Maps to |
| --- | --- |
| Set up / refresh client profile | `/ads setup` |
| Evidence-backed account review | `/ads audit [all\|platform\|scope]` |
| Channel, budget, measurement plan | `/ads plan` |
| Copy / image / video / product-photo | `/ads create` |
| Draft launch without account writes | `/ads launch --draft` |
| Pacing / tracking / fatigue | `/ads monitor` |
| Draft optimisations | `/ads optimize --draft` |
| Experiment design or readout | `/ads experiment` |
| Render a prior run | `/ads report` |
| Refresh platform evidence | `/ads research refresh` |
| Validate contracts / maturity | `/ads validate` |
| Status / next blocker | `/ads status`, `/ads next` |

Platform shortcuts: `/ads google`, `/ads meta`, `/ads linkedin`, and the other platform skills under `.cursor/skills/ads-*`.

Cove brand constraints (always):

- British English; prefer `:` or `|` (no em dashes in public copy)
- Claims only from `src/config/site.ts` / approved brand profile observations
- Creative from authorized `public/campaign/` assets
- Draft files under `.claude-ads/runs/<run-id>/`; no unattended posting or live spend

## Relationship to social agents

| Agent | Job |
| --- | --- |
| `ads` (+ platform / workflow skills) | Paid media OS |
| `cove-social-executive` | Organic / B2B social, press, blogs |
| `cove-week1-social-pack` | Week-1 organic post files |

Paid creative briefs from Claude Ads can feed social drafts; posting still needs human approval.
