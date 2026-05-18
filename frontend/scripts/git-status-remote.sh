#!/usr/bin/env bash
set -e

# Show uncommitted changes, current branch, and configured remotes

echo "Git status (porcelain):"
git status --porcelain

echo "\nCurrent branch:"
git branch --show-current

echo "\nRemotes:"
git remote -v
