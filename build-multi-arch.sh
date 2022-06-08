#!/usr/bin/env bash
set -eux

VERSION=2.0.1
TAG=2.9.0-$VERSION
export REGISTRY=harbor-uat.honeur.org
export REPOSITORY=honeur
export REGISTRY_USERNAME=admin
export REGISTRY_PASSWORD=harbor_password

docker buildx build --platform linux/amd64,linux/arm64 --rm --pull --push  -f "Dockerfile" -t $REGISTRY/$REPOSITORY/atlas:$TAG "."
