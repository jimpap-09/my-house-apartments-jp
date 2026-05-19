#!/bin/bash

# Check if .env file exists
if [ -f .env ]; then
    # Read .env, ignore comments/whitespace, and export DATABASE_URL
    export $(grep -v '^#' .env | grep 'DATABASE_URL' | xargs)
else
    echo "❌ Error: .env file not found in the current directory."
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