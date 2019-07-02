define([
    'knockout',
    'text!./hss-service-user.html',
    'components/Component',
    'appConfig',
    'services/AuthAPI',
    'utils/CommonUtils',
    'utils/AutoBind',
    'services/HSS'
], function (ko, view, Component, config, authApi, commonUtils, AutoBind, hssService) {

    class HssServiceUser extends AutoBind(Component) {
        constructor(params) {
            super(params);
            this.userName = hssService.userName;
            this.userPassword = hssService.userPassword;

            this.usernameInvalid = hssService.usernameInvalid;
            this.passwordInvalid = hssService.passwordInvalid;
            this.submitted = hssService.submitted;

            this.validSubmit = hssService.validSubmit;
            this.invalidSubmit = hssService.invalidSubmit;
            this.error = hssService.error;
        }

        submit() {
            hssService.submit();
        }
    }


    return commonUtils.build('hss-service-user', HssServiceUser, view);
});
