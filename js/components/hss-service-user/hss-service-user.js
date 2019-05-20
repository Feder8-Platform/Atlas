define([
    'knockout',
    'text!./hss-service-user.html',
    'components/Component',
    'appConfig',
    'services/AuthAPI',
    'utils/CommonUtils',
    'utils/AutoBind',
], function (ko, view, Component, config, authApi, commonUtils, AutoBind) {

    class HssServiceUser extends AutoBind(Component) {
        constructor(params) {
            super(params);
            this.userName = ko.observable('');
            this.userPassword = ko.observable('');

            this.usernameInvalid = ko.observable(false);
            this.passwordInvalid = ko.observable(false);
            this.submitted = ko.observable(false);

            this.validSubmit = ko.observable(false);
            this.invalidSubmit = ko.observable(false);
            this.error = ko.observable();
        }

        submit() {
            this.validSubmit(false);
            this.invalidSubmit(false);
            if(this.userPassword() === ''){
                this.passwordInvalid(true);
            } else {
                this.passwordInvalid(false)
            }
            if(this.userName() === ''){
                this.usernameInvalid(true);
            } else {
                this.usernameInvalid(false)
            }
            this.submitted(true);
            if(this.userName() === '' || this.userPassword() === ''){
                return;
            }

            $.ajax({
                url: config.api.url + 'hss/user',
                data: JSON.stringify({"username":this.userName(), "plainTextPassword":this.userPassword()}),
                method: 'POST',
                contentType: 'application/json',
                success: () => {
                    this.validSubmit(true);
                    this.invalidSubmit(false);
                    this.userName('');
                    this.userPassword('');
                },
                error: (err) => {
                    this.invalidSubmit(true);
                    this.validSubmit(false);
                    this.error(err.status + " - " + err.responseText);
                }
            })
        }
    }


    return commonUtils.build('hss-service-user', HssServiceUser, view);
});
