#!/usr/bin/env bash

set -e

: "${COMPOSE_FILE:="docker/docker-compose.prod.yml"}"

echo "Starting Deployment..."

echo "Building Docker images..."
docker compose --env-file .env -f $COMPOSE_FILE build

echo "Running database migrations..."
docker compose --env-file .env -f $COMPOSE_FILE run --rm app pnpm prisma migrate deploy

echo "Restarting containers..."
docker compose --env-file .env -f $COMPOSE_FILE up

echo "Deployed application!"
