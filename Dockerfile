FROM golang:1.16-alpine as golang-build

WORKDIR /go/src/app
COPY cmd cmd

RUN go env -w GO111MODULE=auto; \
    go install -v ./...

# Build the source
FROM node:12-alpine as builder

WORKDIR /code

# First install dependencies. This part will be cached as long as
# the package(-lock).json files remain identical.
COPY package*.json /code/
RUN npm install

# Build code
COPY ./build /code/build
COPY ./js /code/js
RUN npm run build:docker

# Statically pre-compress all output files to be served
COPY ./index.html /code/index.html
RUN find . -type f "(" \
        -name "*.css" \
        -o -name "*.html" \
        -o -name "*.js" ! -name "config-local.js" \
        -o -name "*.json" \
        -o -name "*.svg" \
        -o -name "*.xml" \
      ")" -print0 \
      | xargs -0 -n 1 gzip -kf

# Production Nginx image
FROM nginxinc/nginx-unprivileged:1.19-alpine

COPY --from=golang-build /go/bin/healthcheck /app/healthcheck
HEALTHCHECK --start-period=30s --interval=1m --timeout=10s --retries=10 CMD ["/app/healthcheck"]

LABEL org.opencontainers.image.title="OHDSI-Atlas"
LABEL org.opencontainers.image.authors="Joris Borgdorff <joris@thehyve.nl>, Lee Evans - www.ltscomputingllc.com"
LABEL org.opencontainers.image.description="ATLAS is an open source software tool for researchers to \
conduct scientific analyses on standardized observational data"
LABEL org.opencontainers.image.licenses="Apache-2.0"
LABEL org.opencontainers.image.vendor="OHDSI"
LABEL org.opencontainers.image.source="https://github.com/OHDSI/Atlas"

# Configure webserver
COPY ./docker/optimization.conf /etc/nginx/conf.d/optimization.conf
COPY ./docker/30-atlas-env-subst.sh /docker-entrypoint.d/30-atlas-env-subst.sh

# Load code
COPY ./images /usr/share/nginx/html/images
COPY ./README.md ./LICENSE /usr/share/nginx/html/
COPY --from=builder /code/index.html* /usr/share/nginx/html/
COPY --from=builder /code/node_modules /usr/share/nginx/html/node_modules
COPY --from=builder /code/js /usr/share/nginx/html/js

# Load Atlas local config with current user, so it can be modified
# with env substitution
COPY --chown=101 docker/config-local.js /usr/share/nginx/html/js/config-local.js
