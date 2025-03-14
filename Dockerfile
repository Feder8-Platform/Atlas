FROM golang:1.16-buster as golang-build

WORKDIR /go/src/app
COPY cmd cmd

RUN go env -w GO111MODULE=auto; \
    go install -v ./...

FROM ohdsi/atlas:2.14.1

COPY --chown=101 --from=golang-build /go/bin/healthcheck /app/healthcheck
HEALTHCHECK --start-period=30s --interval=1m --timeout=10s --retries=10 CMD ["/app/healthcheck"]

# Load Atlas local config with current user, so it can be modified
# with env substitution
COPY --chown=101 ./docker/config-local.js /usr/share/nginx/html/atlas/js/config-local.js
COPY --chown=101 ./docker/config-gis.js /usr/share/nginx/html/atlas/js/config-gis.js
