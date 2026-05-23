#!/bin/bash

export NODE_ENV=${NODE_ENV:-development}

ENV_FILE=".env.dev"

if [ "$NODE_ENV" = "production" ]; then
  ENV_FILE=".env.prod"
fi

export $(grep -v '^#' "backend/$ENV_FILE" | xargs)

psql "$DATABASE_URL"