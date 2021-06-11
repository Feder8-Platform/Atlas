#!/usr/bin/env bash
set -e

docker tag feder8/atlas:latest 973455288590.dkr.ecr.eu-west-1.amazonaws.com/honeur/atlas:latest
export AWS_DEFAULT_REGION='eu-west-1'
aws ecr get-login --no-include-email | bash
docker push 973455288590.dkr.ecr.eu-west-1.amazonaws.com/honeur/atlas:latest
