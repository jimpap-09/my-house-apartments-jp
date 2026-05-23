#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")"

export NODE_ENV=${NODE_ENV:-development}

ENV_FILE="$BACKEND_DIR/.env.dev"

if [ "$NODE_ENV" = "production" ]; then
  ENV_FILE="$BACKEND_DIR/.env.prod"
fi

export $(grep -v '^#' "$ENV_FILE" | xargs)

psql "$DATABASE_URL"