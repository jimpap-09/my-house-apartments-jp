#!/usr/bin/env bash
set -e

# Usage: scripts/set-and-show-perms.sh [mode]
# Convenience wrapper: set permissions, then show permissions.

./scripts/set-perms.sh "$@"

echo
./scripts/show-perms.sh
