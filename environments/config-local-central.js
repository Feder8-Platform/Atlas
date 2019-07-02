define([], function () {
   var config = {};
   config.api = {
       name: 'HONEUR',
       url: 'https://localhost:8444/webapi/'
   };
   config.userAuthenticationEnabled = true;
   config.honeurEnabled = true;
   config.isCentralInstance = true;
   return config;
});