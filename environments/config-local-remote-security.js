define([], function () {
   var config = {};
   config.api = {
       name: 'HONEUR',
       url: 'http://localhost:8085/webapi/'
   };
   config.userAuthenticationEnabled = false;
   config.honeurEnabled = true;
   config.isCentralInstance = false;

   config.authProviders = [{
       "name": "Local Security DB",
       "url": "user/login/db",
       "ajax": true,
       "icon": "fa fa-database",
       "isUseCredentialsForm": true
   },
   {
       "name": "LDAP",
       "url": "user/login/ldap",
       "ajax": true,
       "icon": "fa fa-cubes",
       "isUseCredentialsForm": true
   }];
   return config;
});