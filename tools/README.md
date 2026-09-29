# Local tool clones

This directory holds optional local checkouts used by install scripts. Large upstream clones are gitignored; keep thin installers and compose configs in git.

## Claude Ads

```bash
git clone https://github.com/AgriciDaniel/claude-ads.git tools/claude-ads
cd tools/claude-ads
bash install.sh --source=local
bash install.sh --source=local --target=cursor --project="$(git rev-parse --show-toplevel)"
```

See [docs/claude-ads.md](../docs/claude-ads.md).

## ArcAds (Meta creatives)

```bash
bash tools/install-arcads-skills.sh
# then add Arcads API credentials:
cd tools/arcads-claude-code && cp -n .env.example .env && $EDITOR .env
./scripts/check-arcads-env.sh
```

Upstream: [krusemediallc/arcads-claude-code](https://github.com/krusemediallc/arcads-claude-code). Hybrid Meta plan: [docs/ads/meta-creatives-hybrid.md](../docs/ads/meta-creatives-hybrid.md).

## Postiz

Self-hosted planner: [docs/postiz.md](../docs/postiz.md) · compose under `tools/postiz/`.
