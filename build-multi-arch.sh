#!/usr/bin/env bash
set -eux

VERSION=1.0.0
TAG=2.15.0-$VERSION
THERAPEUTIC_AREA_URL="${THERAPEUTIC_AREA_URL:=harbor.esfurn.org}"
THERAPEUTIC_AREA="${THERAPEUTIC_AREA:=esfurn}"

docker buildx build --rm --platform linux/amd64,linux/arm64 --pull --push -f "Dockerfile" -t $THERAPEUTIC_AREA_URL/$THERAPEUTIC_AREA/atlas:$TAG .