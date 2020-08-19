docker run --rm -v $(pwd):/opt/app node:12.15.0-buster-slim sh -c "set -eux; cd /opt/app; npm run build; chown -R $(id -u) /opt/app"
docker build --no-cache -t honeur/atlas .