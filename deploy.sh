#!/usr/bin/env bash

set -e

: "${SERVER:="viktor@homelab"}"
: "${REMOTE_DIR:="/home/viktor/libdvd"}"
: "${COMPOSE_FILE:="docker-compose.prod.yml"}"

echo "Starting Deployment..."

echo "Building Docker images..."
docker compose -f $COMPOSE_FILE build

echo "Saving application image..."
docker save libdvd-app:latest -o /tmp/libdvd-images.tar

echo "Transferring application image to server..."
scp /tmp/libdvd-images.tar $SERVER:/tmp/libdvd-images.tar
scp $COMPOSE_FILE $SERVER:$REMOTE_DIR/

ssh $SERVER << EOF
    set -e
    cd $REMOTE_DIR

    echo "Loading Docker images..."
    docker load -i /tmp/libdvd-images.tar
    rm /tmp/libdvd-images.tar

    echo "Running database migrations..."
    docker compose -f docker-compose.prod.yml run --rm app pnpm dlx prisma migrate deploy

    echo "Restarting containers..."
    docker compose -f docker-compose.prod.yml up -d

    echo "Pruning old images..."
    docker image prune -f
EOF

echo "Removing locally saved image..."
rm /tmp/libdvd-images.tar
