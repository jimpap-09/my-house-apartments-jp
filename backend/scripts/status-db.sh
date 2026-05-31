#!/bin/bash
set -e

export NODE_ENV=${NODE_ENV:-development}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Current directory: $(pwd)"
echo "====================================="
echo " Database Status - $NODE_ENV"
echo "====================================="

if [ "$NODE_ENV" = "local" ]; then
  ENV_FILE="$BACKEND_DIR/.env.local"
elif [ "$NODE_ENV" = "production" ]; then
  ENV_FILE="$BACKEND_DIR/.env.prod"
else
  ENV_FILE="$BACKEND_DIR/.env.dev"
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing env file: $ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

echo "====================================="
echo "Loaded env file: $ENV_FILE"
echo "DB_USER=$DB_USER"
echo "DB_NAME=$DB_NAME"
echo "DB_HOST=$DB_HOST"
echo "DB_PORT=$DB_PORT"
echo "DB_URL = $DATABASE_URL"
echo "====================================="

if [ -z "$DATABASE_URL" ]; then
  echo "Missing DATABASE_URL in $ENV_FILE"
  exit 1
fi

SQL='
\echo ""
\echo "========== SCHEMAS =========="
SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name;

\echo ""
\echo "========== TABLES =========="
SELECT table_name
FROM information_schema.tables
WHERE table_schema = '"'"'public'"'"'
ORDER BY table_name;

\echo ""
\echo "========== TABLE COLUMNS =========="
SELECT 
    table_name,
    string_agg(column_name, '"'"', '"'"' ORDER BY ordinal_position) AS columns
FROM information_schema.columns
WHERE table_schema = '"'"'public'"'"'
GROUP BY table_name
ORDER BY table_name;



\echo ""
\echo "========== CONSTRAINTS =========="
SELECT 
    table_name,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints
WHERE table_schema = '"'"'public'"'"'
ORDER BY table_name, constraint_type;

\echo ""
\echo "========== ROW COUNTS =========="
\echo ""
SELECT table_name
FROM information_schema.tables
WHERE table_schema = '"'"'public'"'"'
ORDER BY table_name;
\echo ""
\echo "========== Apartments data =========="
\echo ""
SELECT * FROM "Apartments";

\echo ""
\echo "========== Reviews data =========="
\echo ""
SELECT * FROM "Reviews";

\echo ""
\echo "========== Reservations data =========="
\echo ""
SELECT * FROM "Reservations";

\echo ""
\echo "========== Users data =========="
\echo ""
SELECT * FROM "Users";
'

if [ "$NODE_ENV" = "local" ]; then
  if command -v docker >/dev/null 2>&1 && docker ps --format '{{.Names}}' | grep -q '^jp-postgres$'; then
    echo "Using Docker Postgres..."
    echo "$SQL" | docker exec -i jp-postgres psql \
      -v ON_ERROR_STOP=1 \
      -U "$DB_USER" \
      -d "$DB_NAME"
  else
    echo "Docker Postgres container jp-postgres is not running."
    exit 1
  fi
else
  echo "Using DATABASE_URL..."
  echo "$SQL" | psql "$DATABASE_URL" -v ON_ERROR_STOP=1
fi