#!/usr/bin/env bash
# Install / refresh LinkedIn + X marketing skill bundles into this Cove repo.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Installing linkedin-skills + x-skills via skills CLI…"
npx --yes skills add sergebulaev/linkedin-skills -a cursor -y --copy
npx --yes skills add sergebulaev/x-skills -a cursor -y --copy

# Keep discoverable Cursor copies with lib/references intact
mkdir -p .cursor/skills
for bundle in linkedin-marketing x-marketing; do
  if [[ -d ".agents/skills/$bundle" ]]; then
    rm -rf ".cursor/skills/$bundle"
    cp -a ".agents/skills/$bundle" ".cursor/skills/$bundle"
    rm -rf ".cursor/skills/$bundle/.git" ".cursor/skills/$bundle/.github" \
      ".cursor/skills/$bundle/.codex-marketplace" ".cursor/skills/$bundle/.codex-plugin" \
      ".cursor/skills/$bundle/.claude-plugin" ".cursor/skills/$bundle/.agents" \
      ".cursor/skills/$bundle/.claude" ".cursor/skills/$bundle/evals" \
      ".cursor/skills/$bundle/tests"
    echo "Synced .cursor/skills/$bundle"
  fi
done

# Optional local upstream clones (gitignored) for scripts/lib work
mkdir -p tools
if [[ ! -d tools/linkedin-skills/.git ]]; then
  rm -rf tools/linkedin-skills
  git clone --depth 1 https://github.com/sergebulaev/linkedin-skills.git tools/linkedin-skills
fi
if [[ ! -d tools/x-skills/.git ]]; then
  rm -rf tools/x-skills
  git clone --depth 1 https://github.com/sergebulaev/x-skills.git tools/x-skills
fi

# Re-apply Cove voice if upstream reset the templates
if [[ -f docs/growth/linkedin-x-primary.md ]]; then
  echo "Cove voice profiles: restore from git if upstream overwrote references/voice-profile.md"
fi

echo "Done. See docs/growth/linkedin-x-primary.md"
