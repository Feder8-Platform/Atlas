define(
    [
        'knockout',
        'text!./export-button.html',
        'appConfig',
        'webapi/AuthAPI',
        'databindings',
        'access-denied'],
    function (ko, view, config, authApi) {
        function exportButton(params) {
            var self = this;

            self.multiSelect = params.multiSelect;
            self.endpoint = params.endpoint

            self.export = function () {

                const endpoint = params.endpoint() + "?toCloud=true" + (params.uuid ? "&uuid="+params.uuid() : "");
                $.ajax(endpoint, {
                    headers: {
                        Authorization: authApi.getAuthorizationHeader()
                    },
                    error: authApi.handleAccessDenied,
                    success: function (response, status, headers) {
                        if(params.callbackURL){
                            window.location = params.callbackURL(response);
                        }
                    }
                });
            }
        }


        var component = {
            viewModel: exportButton,
            template: view
        };

        ko.components.register('export-button', component);
        return component;
    });