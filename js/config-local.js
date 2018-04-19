define([], function () {
    var config = {};
    config.api = {
        name: 'Continuum - Janssen Pharmaceutica',
        url: 'http://cas-dev.eu-west-1.elasticbeanstalk.com/webapi'
    };
    config.userAuthenticationEnabled = true;
    config.honeurEnabled = true;
    return config;
});