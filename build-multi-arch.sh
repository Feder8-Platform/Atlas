#!/usr/bin/env bash
set -eux

VERSION=2.0.1
TAG=2.9.0-$VERSION

REGISTRY=harbor.honeur.org
REPOSITORY=honeur
docker buildx build --platform linux/amd64,linux/arm64 --rm --pull --push  -f "Dockerfile" -t $REGISTRY/$REPOSITORY/atlas:$TAG "."

REGISTRY=harbor.athenafederation.org
REPOSITORY=athena
docker buildx build --platform linux/amd64,linux/arm64 --rm --pull --push  -f "Dockerfile" -t $REGISTRY/$REPOSITORY/atlas:$TAG "."

REGISTRY=harbor.lupusnet.org
REPOSITORY=lupus
docker buildx build --platform linux/amd64,linux/arm64 --rm --pull --push  -f "Dockerfile" -t $REGISTRY/$REPOSITORY/atlas:$TAG "."

REGISTRY=harbor.esfurn.org
REPOSITORY=esfurn
docker buildx build --platform linux/amd64,linux/arm64 --rm --pull --push  -f "Dockerfile" -t $REGISTRY/$REPOSITORY/atlas:$TAG "."

REGISTRY=harbor.phederation.org
REPOSITORY=phederation
docker buildx build --platform linux/amd64,linux/arm64 --rm --pull --push  -f "Dockerfile" -t $REGISTRY/$REPOSITORY/atlas:$TAG "."
