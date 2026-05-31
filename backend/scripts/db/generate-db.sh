#!/bin/bash

set -e

export NODE_ENV=${NODE_ENV:-development}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo SCRIPT_DIR: "$SCRIPT_DIR"
echo BACKEND_DIR: "$BACKEND_DIR"

cd "$BACKEND_DIR"
echo "Current directory: $(pwd)"

rm -rf models migrations seeders .sequelizerc
rm -f config/config.json config/config.js

npm install sequelize pg pg-hstore dotenv
npm install -D sequelize-cli

npx sequelize-cli init --force

rm -f config/config.json

node scripts/db/generate-db.js
