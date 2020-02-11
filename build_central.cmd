@ECHO off
ECHO define([], function () {>js/config-local.js
ECHO     var config = {};>>js/config-local.js
ECHO     config.api = {>>js/config-local.js
ECHO         name: 'HONEUR',>>js/config-local.js
ECHO         url: 'https://atlas-local.honeur.org/webapi/'>>js/config-local.js
ECHO     };>>js/config-local.js
ECHO     config.userAuthenticationEnabled = true;>>js/config-local.js
ECHO     config.honeurEnabled = true;>>js/config-local.js
ECHO     config.isCentralInstance = true;>>js/config-local.js
ECHO     config.authProviders = [>>js/config-local.js
ECHO         {>>js/config-local.js
ECHO             "name": "CAS",>>js/config-local.js
ECHO             "url": "user/login/cas",>>js/config-local.js
ECHO             "ajax": false,>>js/config-local.js
ECHO             "icon": "",>>js/config-local.js
ECHO             "isUseCredentialsForm": false>>js/config-local.js
ECHO         }];>>js/config-local.js
ECHO     return config;>>js/config-local.js
ECHO });>>js/config-local.js

CALL docker run --rm -v %CD%:/opt/app node:12.15.0-alpine sh -c "cd /opt/app && npm run build"