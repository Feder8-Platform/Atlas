define(
    [
        'knockout',
        'text!./export-button.html',
        'appConfig',
        'webapi/AuthAPI',
        'knockout.dataTables.binding',
        'access-denied'],
    function (ko, view, config, authApi) {
        function exportButton(params) {
            var self = this;

            function jsonDataToFile(data) {
                var data = "text/json;charset=utf-8," + ko.toJSON(data);
                var link = document.createElement('a');
                link.href = "data:" + data;
                if (params.name) {
                    link.download = params.name().trim().split(' ').join('_');
                } else {
                    link.download = 'default';
                }
                if (params.extension) {
                    link.download += '.' + params.extension;
                }
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            self.export = function () {
                if(params.data) {
                    jsonDataToFile(params.data());
                    return;
                }
                if(params.endpoint){
                    $.ajax(params.endpoint(),{
                        headers: {
                            Authorization: authApi.getAuthorizationHeader()
                        },
                        error: authApi.handleAccessDenied,
                        success: function (data) {
                            jsonDataToFile(data);
                        }
                    });
                    return;
                }
            }
        }


        var component = {
            viewModel: exportButton,
            template: view
        };

        ko.components.register('export-button', component);
        return component;
    });