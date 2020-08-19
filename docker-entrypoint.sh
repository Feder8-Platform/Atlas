#!/usr/bin/env bash
set -e

sed -i -e "s@HONEUR_CHANGE_WEBAPI_URL@${WEBAPI_URL}@g" /usr/share/nginx/html/js/config-local.js
sed -i -e "s@HONEUR_CHANGE_USER_AUTHENTICATION_ENABLED@${USER_AUTHENTICATION_ENABLED}@g" /usr/share/nginx/html/js/config-local.js
sed -i -e "s@HONEUR_CHANGE_IS_CENTRAL_INSTANCE@${IS_CENTRAL_INSTANCE}@g" /usr/share/nginx/html/js/config-local.js

exec "$@"