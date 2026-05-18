#!/usr/bin/env bash
set -e

# Remove node_modules and package-lock.json and reinstall dependencies from package.json
# Use with care. Saves bandwidth by reinstalling cleanly.

echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Running npm install..."
npm install

echo "Done."
