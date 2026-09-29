#!/usr/bin/env bash
# Install / refresh ArcAds Claude Code skills into this Cove repo.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLONE="$ROOT/tools/arcads-claude-code"

if [[ ! -d "$CLONE/.git" ]]; then
  git clone --depth 1 https://github.com/krusemediallc/arcads-claude-code.git "$CLONE"
fi

(
  cd "$CLONE"
  bash scripts/sync-skill.sh
)

mkdir -p "$ROOT/.cursor/skills"
for d in "$CLONE"/.cursor/skills/*/; do
  [[ -d "$d" ]] || continue
  name="$(basename "$d")"
  rm -rf "$ROOT/.cursor/skills/$name"
  cp -R "$d" "$ROOT/.cursor/skills/$name"
  echo "Installed $name"
done

# Shared recipe packs (no upstream SKILL.md): copy + thin wrapper if missing
for name in pixar-style-ad claymation-ad caption-video image-ad-prompting gemini-omni-flash; do
  src="$CLONE/shared/skills/$name"
  dest="$ROOT/.cursor/skills/$name"
  [[ -d "$src" ]] || continue
  rm -rf "$dest"
  cp -R "$src" "$dest"
  if [[ ! -f "$dest/SKILL.md" ]]; then
    cat > "$dest/SKILL.md" <<EOF
---
name: $name
description: >-
  Cove-installed ArcAds recipe from krusemediallc/arcads-claude-code shared/skills/$name.
  Use prompting/guide.md with arcads-external-api. Meta deploy stays paused-only via meta-ad-builder.
---

# $name

Follow \`prompting/guide.md\` in this folder. Credentials live in \`tools/arcads-claude-code/.env\`.
EOF
  fi
  echo "Installed recipe $name"
done

echo "Done. See docs/ads/meta-creatives-hybrid.md"
