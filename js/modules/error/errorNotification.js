define(function (require, exports) {

    var ko = require('knockout');

    function errorNotification(data) {
        var self = this;
        var data = data || {};

        self.message = data.message || "";
        self.statusCode = data.statusCode || "";
        self.type = data.type || "";
        self.viewed = ko.observable(data.viewed != null ? data.viewed : false);
    }


    return errorNotification;
});
