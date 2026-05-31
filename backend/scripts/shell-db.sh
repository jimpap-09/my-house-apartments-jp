#!/bin/bash

set -e

export NODE_ENV=${NODE_ENV:-development}
echo "NODE_ENV=$NODE_ENV"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"


BACKEND_DIR="$(dirname "$SCRIPT_DIR")"


ENV_FILE="$BACKEND_DIR/.env.dev"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

echo "Loading environment variables from: $ENV_FILE"

set -a
source "$ENV_FILE"
set +a

echo "DB_USER=$DB_USER"
echo "DB_NAME=$DB_NAME"

if docker ps --format '{{.Names}}' | grep -q '^jp-postgres$'; then
  echo "Connecting through Docker container jp-postgres..."
  docker exec -i jp-postgres psql \
    -U "$DB_USER" \
    -d "$DB_NAME"
else
  echo "Connecting directly with DATABASE_URL..."
  psql "$DATABASE_URL"
fi