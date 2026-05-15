#!/usr/bin/env bash
set -e

# Usage: scripts/show-perms.sh
# Display script file permissions and git index mode if available.

echo "Files in scripts/ (ls -l):"
ls -l scripts

echo
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Git stored mode for scripts (git ls-files --stage):"
  git ls-files --stage scripts/*.sh || true
else
  echo "Not a git repo or git not available; skipping git mode output."
fi

echo
echo "Human-readable permissions (stat -c '%A %a %n') for each script:"
for f in scripts/*.sh; do
  stat -c '%A %a %n' "$f" || true
done
