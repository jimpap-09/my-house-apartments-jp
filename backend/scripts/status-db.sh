#!/bin/bash
set -e

export NODE_ENV=${NODE_ENV:-development}

ENV_FILE=".env.dev"

if [ "$NODE_ENV" = "production" ]; then
  ENV_FILE=".env.prod"
fi

export $(grep -v '^#' "backend/$ENV_FILE" | xargs)

echo "====================================="
echo " Database Status - $NODE_ENV"
echo "====================================="

psql "$DATABASE_URL" << 'EOF'

-- 1. All schemas
SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name;

-- 2. All tables in public schema
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 3. All tables with their columns in one row
SELECT 
    table_name,
    string_agg(column_name, ', ' ORDER BY ordinal_position) AS columns
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name
ORDER BY table_name;

-- 4. Full column details for all tables
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

-- 5. Primary keys / foreign keys / unique constraints
SELECT 
    table_name,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'public'
ORDER BY table_name, constraint_type;

-- 6. Row count per table
SELECT 'Apartments' AS table_name, COUNT(*) AS rows FROM "Apartments"
UNION ALL
SELECT 'Reviews', COUNT(*) FROM "Reviews"
UNION ALL
SELECT 'Reservations', COUNT(*) FROM "Reservations"
UNION ALL
SELECT 'Users', COUNT(*) FROM "Users";

-- 7. Apartments data
SELECT * FROM "Apartments";

-- 8. Reviews data
SELECT * FROM "Reviews";

-- 9. Reservations data
SELECT * FROM "Reservations";

-- 10. Users data
SELECT * FROM "Users";

EOF