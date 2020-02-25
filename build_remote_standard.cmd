@ECHO off
ECHO define([], function () {>js/config-local.js
ECHO    var config = {};>>js/config-local.js
ECHO    config.api = {>>js/config-local.js
ECHO        name: 'HONEUR',>>js/config-local.js
ECHO        url: 'http://localhost:8080/webapi/'>>js/config-local.js
ECHO    };>>js/config-local.js
ECHO    config.userAuthenticationEnabled = false;>>js/config-local.js
ECHO    config.honeurEnabled = true;>>js/config-local.js
ECHO    config.isCentralInstance = false;>>js/config-local.js
ECHO    return config;>>js/config-local.js
ECHO });>>js/config-local.js

docker run --rm -v $(pwd):/opt/app node:12.15.0-alpine sh -c "cd /opt/app && npm run build"
