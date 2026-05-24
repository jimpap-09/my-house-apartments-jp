#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")"

ENV_FILE="$BACKEND_DIR/.env.dev"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

if [ "$NODE_ENV" = "production" ]; then
  echo "Refusing to reset production database"
  exit 1
fi

echo "DB_USER=$DB_USER"
echo "DB_NAME=$DB_NAME"

docker exec -i jp-postgres psql \
  -U "$DB_USER" \
  -d "$DB_NAME" << EOF
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO "$DB_USER";
GRANT ALL ON SCHEMA public TO public;
EOF

echo "Database schema reset completed."