define([
    'knockout',
    'text!./hss-user-service.html',
    'appConfig',
    'webapi/AuthAPI'
], function (ko, view, config, authApi) {
    function hssServiceUser(params) {
        var self = this;

        self.userName = ko.observable('');
        self.userPassword = ko.observable('');

        self.usernameInvalid = ko.observable(false);
        self.passwordInvalid = ko.observable(false);
        self.submitted = ko.observable(false);

        self.validSubmit = ko.observable(false);
        self.invalidSubmit = ko.observable(false);
        self.error = ko.observable();

        self.submit = function(){
            self.validSubmit(false);
            self.invalidSubmit(false);
            if(self.userPassword() === ''){
                self.passwordInvalid(true);
            } else {
                self.passwordInvalid(false)
            }
            if(self.userName() === ''){
                self.usernameInvalid(true);
            } else {
                self.usernameInvalid(false)
            }
            self.submitted(true);
            if(self.userName() === '' || self.userPassword() === ''){
                return;
            }

            $.ajax({
                url: config.api.url + 'hss/user',
                data: JSON.stringify({"username":self.userName(), "plainTextPassword":self.userPassword()}),
                method: 'POST',
                contentType: 'application/json',
                success: function () {
                    self.validSubmit(true);
                    self.invalidSubmit(false);
                    self.userName('');
                    self.userPassword('');
                },
                error: function (err) {
                    self.invalidSubmit(true);
                    self.validSubmit(false);
                    self.error(err.status + " - " + err.responseText);
                }
            })
        }
    }


    var component = {
        viewModel: hssServiceUser,
        template: view
    };

    ko.components.register('hss-user-service', component);
    return component;
});
