#!/usr/bin/env bash
set -ex

touch atlas.env

echo "FEDER8_WEBAPI_URL=/webapi" >> atlas.env
echo "WEBAPI_URL=http://localhost:8080/webapi" >> atlas.env
echo "GIS_ENABLED=false" >> atlas.env

docker run --rm --name atlas --network feder8-net \
  -p 8081:8080 \
  feder8/atlas:testing

rm -rf atlas.env

