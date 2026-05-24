#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$(dirname "$SCRIPT_DIR")" && pwd)"
echo "SCRIPT_DIR=$SCRIPT_DIR"
echo "BACKEND_DIR=$BACKEND_DIR"
echo "Current directory is: $(pwd)"
echo cd "$BACKEND_DIR"
echo "BACKEND_DIR=$BACKEND_DIR"
echo "DEBUG: Current directory is: $(pwd)"

cd "$BACKEND_DIR"
echo BACKEND_DIR=$BACKEND_DIR
echo "Current directory is now: $(pwd)"
