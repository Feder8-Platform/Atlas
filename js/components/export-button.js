define(
    [
        'knockout',
        'text!./export-button.html',
        'appConfig',
        'atlas-state',
        'webapi/AuthAPI',
        'databindings',
        'access-denied'],
    function (ko, view, config, sharedState, authApi) {
        function createJob(params) {
            var job = params.job;
            if (job) {
                job().status('RUNNING');
                sharedState.jobListing.queue(job());
            }
            return job;
        }

        function setJob(job, status){
            job().status(status);
            sharedState.jobListing.queue(job);
        }

        function exportButton(params) {
            var self = this;

            self.multiSelect = params.multiSelect;
            self.endpoint = params.endpoint;
            self.exporting = ko.observable(false);

            self.exportToFile = function () {
                const endpoint = params.endpoint();
                self.exporting(true);

                var results = params.uuid;

                $.ajax(endpoint, {
                    success: function (response, status, headers) {

                        a = document.createElement("a");
                        a.style.display = 'none';
                        var file = new Blob([JSON.stringify(response)]);
                        a.href = URL.createObjectURL(file);
                        a.download = response.name+"."+(results? "results" : "cohort");
                        a.click();
                        a.remove();
                    }
                }).always(function(){
                    self.exporting(false);
                });
            };

            self.exportToCloud = function () {

                const endpoint = params.endpoint() + "?toCloud=true" + (params.uuid ? "&uuid="+params.uuid() : "");
                self.exporting(true);
                var refreshPromise = null;
                var res = null;

                var job = createJob(params);

                $.ajax(endpoint, {
                    success: function (response, status, headers) {
                        refreshPromise = authApi.retrievePermissions();
                        res = response;
                        if (job) {
                            setJob(job, 'COMPLETE')
                        }
                    },
                    error: function (err) {
                        if (job) {
                            setJob(job, 'ERROR')
                        }
                    }
                }).always(function(){
                    if(refreshPromise === null){
                        self.exporting(false);
                    } else {
                        refreshPromise.then(function () {
                            self.exporting(false);
                            if(params.callbackURL && res){
                                window.location = params.callbackURL(res);
                            }
                        })
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