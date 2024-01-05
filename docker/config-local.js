define([], function () {
	var configLocal = {};

	// WebAPI
	configLocal.api = {
		name: 'FEDER8',
		url: '${FEDER8_WEBAPI_URL}'
	};

	configLocal.cohortComparisonResultsEnabled = false;
	configLocal.plpResultsEnabled = false;

	configLocal.userAuthenticationEnabled = ${FEDER8_ATLAS_SECURE};
	configLocal.isCentralInstance = ${FEDER8_ATLAS_CENTRAL};
    configLocal.isLdapEnabled = ${FEDER8_ATLAS_LDAP_ENABLED};

    if(configLocal.userAuthenticationEnabled) {
        if(configLocal.isCentralInstance) {
            configLocal.authProviders = [
                {
                    "name": "Login with Central",
                    "url": "user/login/openid",
                    "ajax": false,
                    "icon": "",
                    "isUseCredentialsForm": false
                }];
        } else {
            configLocal.authProviders = [
                {
                    "name": "Login with SSO",
                    "url": "user/login/openid",
                    "ajax": false,
                    "icon": "",
                    "isUseCredentialsForm": false
                }];
        }
    }

	return configLocal;
});
