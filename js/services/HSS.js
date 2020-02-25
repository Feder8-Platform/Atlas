define(function (require, exports) {

    var ko = require('knockout');
    var config = require('appConfig');

    var userName = ko.observable('');
    var userPassword = ko.observable('');

    var usernameInvalid = ko.observable(false);
    var passwordInvalid = ko.observable(false);
    var submitted = ko.observable(false);

    var validSubmit = ko.observable(false);
    var invalidSubmit = ko.observable(false);
    var error = ko.observable();

    var isValidating = ko.observable(false);
    var isValidHSSUser = ko.observable(false);

    var submit = function () {
        this.validSubmit(false);
        this.invalidSubmit(false);
        if (this.userPassword() === '') {
            this.passwordInvalid(true);
        } else {
            this.passwordInvalid(false)
        }
        if (this.userName() === '') {
            this.usernameInvalid(true);
        } else {
            this.usernameInvalid(false)
        }
        this.submitted(true);
        if (this.userName() === '' || this.userPassword() === '') {
            return;
        }

        return $.ajax({
            url: config.api.url + 'hss/user',
            data: JSON.stringify({ "username": this.userName(), "plainTextPassword": this.userPassword() }),
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

    var validationCheck = function () {
        this.isValidating(true);
        $.ajax({
            url: config.api.url + 'hss/token',
            method: 'GET',
            contentType: 'application/json',
            success: () => {
                this.error(undefined);
                this.isValidating(false);
                this.isValidHSSUser(true);
            },
            error: (err) => {
                this.error(err.responseJSON.message);
                this.isValidating(false);
                this.isValidHSSUser(false);
            }
        })
    }

    var hss = {
        userName: userName,
        userPassword, userPassword,
        usernameInvalid: usernameInvalid,
        passwordInvalid: passwordInvalid,
        submitted: submitted,
        validSubmit: validSubmit,
        invalidSubmit: invalidSubmit,
        error: error,
        submit: submit,
        validationCheck: validationCheck,
        isValidating: isValidating,
        isValidHSSUser: isValidHSSUser
    };

    return hss;
});
