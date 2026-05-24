#!/bin/bash
set -e



export NODE_ENV=${NODE_ENV:-development}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE}")" && pwd)"
BACKEND_DIR="$(dirname "$SCRIPT_DIR")"

echo "my current directory is: $(pwd)"

echo "====================================="
echo " Database Status - $NODE_ENV"
echo "====================================="

if [ "$NODE_ENV" = "development" ]; then
    ENV_FILE="$BACKEND_DIR/.env.dev"
else
    ENV_FILE="$BACKEND_DIR/.env.prod"
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

echo "DB_USER=$DB_USER"
echo "DB_NAME=$DB_NAME"

docker exec -i jp-postgres psql -U $DB_USER -d $DB_NAME << 'EOF'

\echo ''
\echo '========== SCHEMAS =========='
\echo ''

SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name;

\echo ''
\echo '========== TABLES =========='
\echo ''

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

\echo ''
\echo '========== TABLE COLUMNS =========='
\echo ''

SELECT 
    table_name,
    string_agg(column_name, ', ' ORDER BY ordinal_position) AS columns
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name
ORDER BY table_name;

\echo ''
\echo '========== COLUMN DETAILS =========='
\echo ''

SELECT 
    table_name,
    ordinal_position,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

\echo ''
\echo '========== CONSTRAINTS =========='
\echo ''

SELECT 
\echo ''
    table_name,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'public'
ORDER BY table_name, constraint_type;

\echo ''
\echo '========== ROW COUNTS =========='
\echo ''

SELECT 'Apartments' AS table_name, COUNT(*) AS rows FROM "Apartments"
UNION ALL
SELECT 'Reviews', COUNT(*) FROM "Reviews"
UNION ALL
SELECT 'Reservations', COUNT(*) FROM "Reservations"
UNION ALL
SELECT 'Users', COUNT(*) FROM "Users";

\echo ''
\echo '========== APARTMENTS =========='
\echo ''

SELECT * FROM "Apartments";

\echo ''
\echo '========== USERS =========='
\echo ''

SELECT * FROM "Users";

\echo ''
\echo '========== REVIEWS =========='
\echo ''

SELECT * FROM "Reviews";

\echo ''
\echo '========== RESERVATIONS =========='
\echo ''

SELECT * FROM "Reservations";

\echo ''
\echo '========== APARTMENT IMAGES =========='
\echo ''

SELECT * FROM "ApartmentImages"
EOF