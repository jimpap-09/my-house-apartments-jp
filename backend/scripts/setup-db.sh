#!/bin/bash

set -e

export NODE_ENV=${NODE_ENV:-development}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$(dirname "$SCRIPT_DIR")" && pwd)"

cd "$BACKEND_DIR"
echo "Setting up database for environment: $NODE_ENV"
echo "Backend directory: $BACKEND_DIR"

echo "Running migrations..."
npx sequelize-cli db:migrate

echo "Running seeders..."
npx sequelize-cli db:seed:all

echo "✅ Database setup completed."
