#!/usr/bin/env bash
set -ex

VERSION=latest
TAG=$VERSION

touch atlas.env

echo "FEDER8_WEBAPI_URL=http://localhost:8080/" >> atlas.env
echo "FEDER8_ATLAS_SECURE=true" >> atlas.env
echo "FEDER8_ATLAS_CENTRAL=true" >> atlas.env

docker run \
--rm \
--name atlas \
-p 8081:8080 \
--env-file atlas.env \
--network honeur-net \
feder8/atlas:$TAG

rm -rf atlas.env

