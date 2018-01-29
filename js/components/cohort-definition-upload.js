define([
    'knockout',
    'text!./cohort-definition-upload.html',
    'appConfig',
    'webapi/AuthAPI',
    'knockout.dataTables.binding',
    'access-denied'], function (ko, view, config, authApi) {
    function cohortDefinitionUpload() {

        var self = this;
        self.showLightBox = ko.observable(false);
        self.content = ko.observable();
        self.draggedOver = ko.observable(false);
        self.config = config;

        self.show = function(){
            self.showLightBox(true);
        }

        self.close = function(){
            self.showLightBox(false);
        }

        self.showModal = function(){
            if(self.showLightBox()) {
                document.getElementById('fileUploadModal').style.display = "block";
            } else {
                document.getElementById('fileUploadModal').style.display = "none";
            }
        }

        self.submitFile = function() {
            var file = document.getElementById('cohortInput').files[0];
            if (typeof file == "undefined") {
                alert("Please select a file.");
                return;
            }
            var reader = new FileReader();
            reader.readAsText(file);
            console.log(file);
            reader.onload = function (evt) {
                $.ajax({
                    type: "POST",
                    url: self.config.api.url + 'cohortdefinition/',
                    dataType: "json",
                    data: JSON.stringify({
                            expressionType: "SIMPLE_EXPRESSION",
                            name: file.name.replace('.cohort', '').split('_').join(' '),
                            expression: evt.target.result
                        }),
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        window.location.href = "#/cohortdefinition/"+result.id;
                    }
                });
            };
            self.close();
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
