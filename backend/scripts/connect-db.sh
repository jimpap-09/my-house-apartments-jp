#!/bin/bash

# 📍 Find the absolute directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 🔍 Define the path for the .env file in the parent directory (one level up)
ENV_FILE="$(dirname "$SCRIPT_DIR")/.env"

# Check if .env file exists
if [ -f "$ENV_FILE" ]; then
    # Read .env, ignore comments/whitespace, and export DATABASE_URL
    export $(grep -v '^#' "$ENV_FILE" | grep 'DATABASE_URL' | xargs)
else
    echo "❌ Error: .env file not found at: $ENV_FILE"
    exit 1
fi

# Check if DATABASE_URL variable is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL is not defined in your .env file."
    exit 1
fi

echo "=================================================="
echo " Connecting to Neon PostgreSQL via .env URL...   "
echo "=================================================="

# Execute psql connection
psql "$DATABASE_URL"
