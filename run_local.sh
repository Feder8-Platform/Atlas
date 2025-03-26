#!/usr/bin/env bash
set -ex

touch atlas.env

docker run --rm --name atlas --network feder8-net \
  -p 8081:8080 \
  feder8/atlas:testing

rm -rf atlas.env

