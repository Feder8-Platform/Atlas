define([
    'knockout',
    'text!./cohort-definition-upload.html',
    'appConfig',
    'webapi/AuthAPI',
    'databindings',
    'access-denied'], function (ko, view, config, authApi) {
    function cohortDefinitionUpload(params) {

        var self = this;

        self.showLightBox = ko.observable(false);
        self.content = ko.observable();
        self.draggedOver = ko.observable(false);
        self.config = config;
        self.name = "Import Cohort";
        self.importing = ko.observable(false);
        self.fileUuid = ko.observable('');
        self.disable = params.disable;

        self.currentTab = ko.observable('listTab');

        self.cohortDefinitions = ko.observableArray();

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
                        element.dataTargets.push(next.uuid);
                        elements.push(next)
                        next = next.previous;
                    }
                })

                elements.forEach(function(cohortDefinition){
                    cohortDefinition.groupKey = cohortDefinition.key.split('/')[1];
                    cohortDefinition.selected = ko.observable(false);
                    cohortDefinition.selected.subscribe(function(value){
                        if(value) {
                            self.selectNone(cohortDefinition);
                        }
                    })
                });

                self.cohortDefinitions(elements);
            }
        });

        self.showLightBox.subscribe(function(value) {
            if (!value && document.getElementById('cohortInput')) {
                document.getElementById('cohortInput').value = '';
            }
        });

        self.show = function(){
            self.showLightBox(true);
        }

        self.close = function(){
            self.showLightBox(false);
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

        self.rowCreation = function (row, data, dataIndex) {
            if (data.parent) {
                $(row).attr('id',data.uuid);
                $(row).attr('class',"collapse");
            } else {
                var dtString = '';
                data.dataTargets.forEach(function(element){
                    dtString = dtString===''? '#'+element : dtString + ',#'+element;
                })
                $(row).attr('data-target', dtString);
                $(row).attr('data-toggle', 'collapse');
            }
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
                    data = JSON.stringify({
                        expressionType: "SIMPLE_EXPRESSION",
                        name: input.files[0].name.replace('.cohort', '').split('_').join(' '),
                        expression: evt.target.result
                    });
                    upload(endpoint, data);
                };
            }
        }

        function upload(endpoint, data){
            $.ajax({
                url: endpoint,
                method: "POST",
                headers: {
                    Authorization: authApi.getAuthorizationHeader()
                },
                contentType: 'application/json',
                data: data,
                success: function (result) {
                    if(result.id){
                        window.location.href = "#/cohortdefinition/" + result.id;
                    } else {
                        window.location.reload(true);
                    }
                },
                complete: self.close
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
        viewModel: cohortDefinitionUpload,
        template: view
    };

    ko.components.register('cohort-definition-upload', component);
    return component;
});
