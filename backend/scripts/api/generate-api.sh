#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$BACKEND_DIR"

node scripts/api/generate-backend-api.js
node scripts/api/generate-frontend-api.js

echo "✅ Full API generated successfully."