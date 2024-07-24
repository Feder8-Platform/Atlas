define([], function () {
	var configLocal = {};

	// WebAPI
	configLocal.api = {
		name: 'OHDSI',
		url: '/webapi/'
	};

	configLocal.cohortComparisonResultsEnabled = false;
	configLocal.userAuthenticationEnabled = true;
	configLocal.plpResultsEnabled = false;

	configLocal.authProviders = [
		{
			"name": "Login with Central",
			"url": "user/login/openid",
			"ajax": false,
			"icon": "",
			"isUseCredentialsForm": false
		}
	];

	return configLocal;
});
