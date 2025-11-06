FROM ohdsi/atlas:2.15.0

HEALTHCHECK --start-period=30s --interval=1m --timeout=10s --retries=10 CMD curl -f "http://localhost:8080/atlas/" || exit

# Load Atlas local config with current user, so it can be modified
# with env substitution
COPY --chown=101 ./docker/config-local.js /usr/share/nginx/html/atlas/js/config-local.js
COPY --chown=101 ./docker/config-gis.js /usr/share/nginx/html/atlas/js/config-gis.js