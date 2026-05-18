#!/usr/bin/env bash
set -e

# Usage: scripts/set-perms.sh [mode]
# If no argument given or argument is "x", this sets +x on all .sh files.
# If numeric mode given (e.g. 755), it sets that mode on all .sh files.

mode_arg="${1:-x}"

if [ "$mode_arg" = "x" ]; then
  echo "Setting executable bit: chmod +x scripts/*.sh"
  chmod +x scripts/*.sh
else
  echo "Setting numeric mode: chmod $mode_arg scripts/*.sh"
  chmod "$mode_arg" scripts/*.sh
fi
