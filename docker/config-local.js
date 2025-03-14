define([], function () {
    var configLocal = {};
    
    // WebAPI
    configLocal.api = {
        name: 'FEDER8',
		url: '/webapi/'
    };
    
    configLocal.cohortComparisonResultsEnabled = false;
    configLocal.userAuthenticationEnabled = true
    configLocal.plpResultsEnabled = false;
    configLocal.isLdapEnabled = false;
    configLocal.authProviders = [
        {
            "name": "Login with SSO",
            "url": "user/login/openid",
            "ajax": false,
            "icon": "",
            "isUseCredentialsForm": false
        }
    ];
    return configLocal;
});
     