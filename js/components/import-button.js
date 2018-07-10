define([
    'knockout',
    'text!./import-button.html',
    'appConfig',
    'webapi/AuthAPI',
    'databindings',
    'access-denied'], function (ko, view, config, authApi) {
    function importButton(params) {

        var self = this;

        self.showImportLightBox = ko.observable(false);
        self.content = ko.observable();
        self.draggedOver = ko.observable(false);
        self.config = config;
        self.name = params.name;
        self.type = params.type;
        self.importing = ko.observable(false);
        self.fileUuid = ko.observable('');
        self.disable = params.disable;
        self.isError = ko.observable(false);
        self.error = ko.observable('');

        self.currentTab = ko.observable('listTab');

        self.cohortDefinitions = ko.observableArray();

        self.breadCrumb = ko.observableArray();

        $.ajax(params.importUrl(), {
            headers: {
                Authorization: authApi.getAuthorizationHeader()
            },
            contentType: 'application/json',
            error: authApi.handleAccessDenied,
            success: function(data) {
                var elements = []

                data.forEach(function (element){
                    elements.push(element)
                    var next = element.previous;
                    element.dataTargets=[]
                    while(next){
                        next.parent = element.uuid;
                        element.dataTargets.push(next);
                        // elements.push(next)
                        next = next.previous;
                    }
                })

                self.cohortDefinitions(elements);
            }
        });

        self.cohortDefinitions.subscribe(function(elements){
            elements.sort(function(def1,def2){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(def1.lastModified) - new Date(def2.lastModified);
            })
            var counter = 1;
            elements.forEach(function(cohortDefinition){
                cohortDefinition.version = cohortDefinition.parent ? counter++ : counter;
                cohortDefinition.groupKey = cohortDefinition.key.split('/')[1];
                cohortDefinition.selected = ko.observable(false);
                cohortDefinition.selected.subscribe(function(value){
                    if(value) {
                        self.selectNone(cohortDefinition);
                    }
                })
            });
        })

        self.showImportLightBox.subscribe(function(value) {
            if (!value && document.getElementById('cohortInput')) {
                document.getElementById('cohortInput').value = '';
            }
            if(!value){
                self.isError(false);
            }
        });

        self.show = function(){
            self.showImportLightBox(true);
        }

        self.close = function(){
            self.isError(false);
            self.showImportLightBox(false);
        }

        self.selectNone = function(cohortDefinition){
            self.cohortDefinitions().forEach(function(definition){
                if(cohortDefinition.uuid !== definition.uuid){
                    definition.selected(false);
                }
            })
        }

        self.renderCheckbox = function (field, editable) {
            return editable
                ? '<span data-bind="click: function(d, e) { d.' + field + '(!d.' + field + '()); e.stopPropagation(); } , css: { selected: ' + field + '}" class="fa fa-check"></span>'
                : '<span data-bind="css: { selected: ' + field + '}" class="fa fa-check readonly"></span>';
        }

        self.renderVersion = function (data, type, row, meta) {
            if (type === 'display' || type === 'filter') {
                return row.version === self.cohortDefinitions.length || !row.parent ? "Current" : "V" + row.version;
            }
            return data;
        }

        self.rowClick = function(d){
            var breadCrumb = self.breadCrumb();
            breadCrumb.push(self.cohortDefinitions());
            self.breadCrumb(breadCrumb);

            var targets = d.dataTargets.slice();
            targets.push(d);
            self.cohortDefinitions(targets);
        }

        self.back = function() {
            self.cohortDefinitions(self.breadCrumb.pop());
        }

        self.doClick = function(d){
            console.log(d)
        }

        self.submitFile = function() {
            self.importing(true);
            if (self.currentTab() === "listTab" && self.cohortDefinitions().filter(definition => definition.selected()).length !== 1){
                alert("Please select one file.");
                return;
            }
            let input = document.getElementById('cohortInput');
            if (self.currentTab() === "fileTab" && input && typeof input.files[0] === "undefined") {
                alert("Please select a file.");
                return;
            }
            let endpoint;
            let data;
            if(self.currentTab() === "listTab"){
                endpoint = params.selectUrl();
                data = JSON.stringify(self.cohortDefinitions().filter(definition => definition.selected())[0]);
                upload(endpoint, data);
            } else {
                var reader = new FileReader();
                reader.readAsText(input.files[0]);
                reader.onload = function (evt) {
                    endpoint = params.fileUrl();
                    if(self.type === 'definition') {
                        data = JSON.stringify({
                            expressionType: "SIMPLE_EXPRESSION",
                            name: input.files[0].name.replace('.cohort', '').split('_').join(' '),
                            expression: evt.target.result
                        });
                    } else {
                        data = evt.target.result;
                    }
                    upload(endpoint, data);
                };
            }
        }

        function upload(endpoint, data){
            var refreshPromise = null;
            var id;
            $.ajax({
                url: endpoint,
                method: "POST",
                headers: {
                    Authorization: authApi.getAuthorizationHeader()
                },
                contentType: 'application/json',
                data: data,
                success: function (result) {
                    refreshPromise = authApi.retrievePermissions();
                    id = result.id;
                },
                error: function(jqXHR, exception) {
                    self.isError(true);
                    self.error(jqXHR.responseText);
                }
            }).then(function(){
                if(refreshPromise === null){
                    self.importing(false);
                } else {
                    refreshPromise.then(function () {
                        self.importing(false);
                        if(id){
                            window.location.href = "#/cohortdefinition/" + id;
                        } else {
                            window.location.reload(true);
                        }
                        self.close();
                    })
                }
            });
        }

        self.drop = function(data, event){
            self.toggleInDropZone(event);
            console.log(data, event.originalEvent.dataTransfer.files)
            document.getElementById('cohortInput').files = event.originalEvent.dataTransfer.files;
        }

        self.dragOver = function(e){
            e.preventDefault();
        }

        self.toggleInDropZone = function(e){
            e.preventDefault();
            self.draggedOver(!self.draggedOver());
        }
    }
    var component = {
        viewModel: importButton,
        template: view
    };

    ko.components.register('import-button', component);
    return component;
});
