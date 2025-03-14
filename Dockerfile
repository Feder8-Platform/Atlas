FROM ohdsi/atlas:2.14.1

HEALTHCHECK --start-period=30s --interval=1m --timeout=10s --retries=10 CMD curl -f "http://localhost:8080/atlas/" || exit

# Load Atlas local config with current user, so it can be modified
# with env substitution
COPY --chown=101 ./docker/config-local.js /usr/share/nginx/html/atlas/js/config-local.js
