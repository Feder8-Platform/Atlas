#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
    echo "No tag supplied, defaulting to latest"
    HONEUR_ENVIRONEMENT=latest
else
    HONEUR_ENVIRONEMENT=$1
fi

docker tag honeur/atlas:latest 973455288590.dkr.ecr.eu-west-1.amazonaws.com/honeur/atlas:$HONEUR_ENVIRONEMENT
export AWS_DEFAULT_REGION='eu-west-1'
aws ecr get-login --no-include-email | bash
docker push 973455288590.dkr.ecr.eu-west-1.amazonaws.com/honeur/atlas:$HONEUR_ENVIRONEMENT