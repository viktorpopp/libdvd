#!/usr/bin/env bash

set -e

: "${SERVER:="viktor@homelab"}"
: "${REMOTE_DIR:="/home/viktor/libdvd"}"
: "${COMPOSE_FILE:="docker/docker-compose.prod.yml"}"

echo "Starting Deployment..."

echo "Building Docker images..."
docker compose --env-file .env -f $COMPOSE_FILE build

echo "Saving application image..."
docker save libdvd-app:latest -o /tmp/libdvd-images.tar

echo "Transferring application image to server..."
scp /tmp/libdvd-images.tar $SERVER:/tmp/libdvd-images.tar
scp $COMPOSE_FILE $SERVER:$REMOTE_DIR/

ssh $SERVER << EOF
    set -e
    cd /home/viktor/libdvd
    git pull

    echo "Loading Docker images..."
    docker load -i /tmp/libdvd-images.tar
    rm /tmp/libdvd-images.tar

    echo "Running database migrations..."
    docker compose --env-file .env -f docker/docker-compose.prod.yml run --rm app pnpm prisma migrate deploy

    echo "Restarting containers..."
    docker compose --env-file .env -f docker/docker-compose.prod.yml up -d
EOF

echo "Removing locally saved image..."
rm /tmp/libdvd-images.tar

echo "Deployed application!"
