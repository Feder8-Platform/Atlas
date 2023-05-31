#!/usr/bin/env bash
set -eux

VERSION=2.1.0
TAG=2.9.0-$VERSION

docker tag feder8/atlas:latest $THERAPEUTIC_AREA_URL/$THERAPEUTIC_AREA/atlas:$TAG
docker push $THERAPEUTIC_AREA_URL/$THERAPEUTIC_AREA/atlas:$TAG
