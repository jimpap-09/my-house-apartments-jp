#!/usr/bin/env bash
set -e

# Usage: ./scripts/save-and-push.sh "Commit message"
# If no message is provided, defaults to "Update".

msg="${1:-Update}"

# Show status before staging
git status --short

# Stage all changes
git add .

# Commit
if git diff --cached --quiet; then
  echo "Nothing to commit."
  exit 0
fi

echo "Committing with message: $msg"
git commit -m "$msg"

# Push
git push

echo "Pushed to remote."
