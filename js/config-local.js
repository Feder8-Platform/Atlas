define([], function () {
    var config = {};
    config.api = {
        name: 'HONEUR',
        url: 'HONEUR_CHANGE_WEBAPI_URL'
    };
    config.userAuthenticationEnabled = HONEUR_CHANGE_USER_AUTHENTICATION_ENABLED;
    config.honeurEnabled = true;
    config.isCentralInstance = HONEUR_CHANGE_IS_CENTRAL_INSTANCE;
    if(config.userAuthenticationEnabled) {
        if(config.isCentralInstance) {
            config.authProviders = [
                {
                    "name": "CAS",
                    "url": "user/login/cas",
                    "ajax": false,
                    "icon": "",
                    "isUseCredentialsForm": false
                }];
        } else {
            config.authProviders = [{
                'name': 'Local Security DB',
                'url': 'user/login/db',
                'ajax': true,
                'icon': 'fa fa-database',
                'isUseCredentialsForm': true
            },
            {
                'name': 'LDAP',
                'url': 'user/login/ldap',
                'ajax': true,
                'icon': 'fa fa-cubes',
                'isUseCredentialsForm': true
            }];
        }
    }
    return config;
});
