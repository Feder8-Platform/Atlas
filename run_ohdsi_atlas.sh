docker run --rm --name atlas --network feder8-net \
  -v ./docker/config-local.js:/etc/atlas/config-local.js \
  -p 8081:8080 \
  ohdsi/atlas:latest