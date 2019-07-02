define([], function () {
   var config = {};
   config.api = {
       name: 'HONEUR',
       url: 'http://localhost:8085/webapi/'
   };
   config.userAuthenticationEnabled = false;
   config.honeurEnabled = true;
   config.isCentralInstance = false;
   return config;
});