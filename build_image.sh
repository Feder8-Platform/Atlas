#!/usr/bin/env bash
set -e

/kaniko/executor -f $(pwd)/Dockerfile -c $(pwd) --cache=true --destination=973455288590.dkr.ecr.eu-west-1.amazonaws.com/honeur/storage:latest
