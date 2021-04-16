@ECHO off
CALL docker run --rm -v %CD%:/opt/app node:12.15.0-buster-slim sh -c "cd /opt/app && npm run build"