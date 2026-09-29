# Local tool clones

This directory holds optional local checkouts used by install scripts. Contents are gitignored.

## Claude Ads

```bash
git clone https://github.com/AgriciDaniel/claude-ads.git tools/claude-ads
cd tools/claude-ads
bash install.sh --source=local
bash install.sh --source=local --target=cursor --project="$(git rev-parse --show-toplevel)"
```

See [docs/claude-ads.md](../docs/claude-ads.md).
