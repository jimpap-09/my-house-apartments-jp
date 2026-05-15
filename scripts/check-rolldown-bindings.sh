#!/usr/bin/env bash
set -e

# Check which @rolldown bindings exist and whether the expected linux binding is installed

echo "Listing @rolldown packages in node_modules (if present):"
ls -1 node_modules/@rolldown 2>/dev/null || echo "No node_modules/@rolldown directory found"

echo "\nChecking installed @rolldown binding (linux-x64-gnu):"
npm ls @rolldown/binding-linux-x64-gnu --depth=0 || true
