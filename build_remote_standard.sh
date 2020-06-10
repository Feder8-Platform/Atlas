echo "define([], function () {">js/config-local.js
echo "   var config = {};">>js/config-local.js
echo "   config.api = {">>js/config-local.js
echo "       name: 'HONEUR',">>js/config-local.js
echo "       url: 'http://localhost:8080/webapi/'">>js/config-local.js
echo "   };">>js/config-local.js
echo "   config.userAuthenticationEnabled = false;">>js/config-local.js
echo "   config.honeurEnabled = true;">>js/config-local.js
echo "   config.isCentralInstance = false;">>js/config-local.js
echo "   return config;">>js/config-local.js
echo "});">>js/config-local.js

docker run --rm -v $(pwd):/opt/app node:12.15.0-alpine sh -c "cd /opt/app; npm run build; chown -R $(id -u) /opt/app"