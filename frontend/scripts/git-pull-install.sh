#!/usr/bin/env bash
set -e

# Pull latest changes from remote and reinstall dependencies

echo "Pulling latest changes from current branch..."
git pull --rebase

echo "Installing dependencies..."
npm install

echo "Done."
