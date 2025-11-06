define([], function () {
    var configLocal = {};

    // WebAPI base URL (no trailing slash)
    configLocal.api = {
        name: 'FEDER8',
        url: '/webapi/'
    };

    // Enable user authentication
    configLocal.userAuthenticationEnabled = true;
    configLocal.isLdapEnabled = false;

    configLocal.authProviders = [];
    configLocal.authProviders.push(openIdProvider = {
        name: "Login with SSO",
        url: "user/login/openid",
        ajax: false,
        icon: "",
        isUseCredentialsForm: false
    });

    return configLocal;
});