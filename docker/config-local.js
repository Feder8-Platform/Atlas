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
	configLocal.isCentralInstance = ${FEDER8_ATLAS_CENTRAL}

    if(configLocal.userAuthenticationEnabled) {
        if(configLocal.isCentralInstance) {
            configLocal.authProviders = [
                {
                    "name": "OPENID",
                    "url": "user/login/openid",
                    "ajax": false,
                    "icon": "",
                    "isUseCredentialsForm": false
                }];
        } else {
            configLocal.authProviders = [{
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

	return configLocal;
});
