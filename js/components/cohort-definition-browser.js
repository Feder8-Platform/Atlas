define(['knockout', 'text!./cohort-definition-browser.html', 'appConfig', 'webapi/AuthAPI', 'faceted-datatable'], function (ko, view, config, authApi) {
	function cohortDefinitionBrowser(params) {
		var self = this;
		self.reference = ko.observableArray();
		self.selected = params.cohortDefinitionSelected;
		self.loading = ko.observable(false);
		self.config = config;

		self.loading(true);

		$.ajax({
			url: config.api.url + 'cohortdefinition',
			headers: {
				Authorization: authApi.getAuthorizationHeader()
			},
			method: 'GET',
			error: authApi.handleAccessDenied,
			success: function (d) {
				self.reference(d);
			},
			complete: function () {
				self.loading(false);
			}
		});


		self.options = {
			Facets: [{
					'caption': 'Last Modified',
					'binding': function (o) {
						var createDate = new Date(o.createdDate);
						var modDate = new Date(o.modifiedDate);
						var dateForCompare = (createDate > modDate) ? createDate : modDate;
						var daysSinceModification = (new Date()
							.getTime() - dateForCompare.getTime()) / 1000 / 60 / 60 / 24;
						if (daysSinceModification < 7) {
							return 'This Week';
						} else if (daysSinceModification < 14) {
							return 'Last Week';
						} else {
							return '2+ Weeks Ago';
						}
					}
				},
				{
					'caption': 'Author',
					'binding': function (o) {
						return o.createdBy;
					}
				}
			]
		};

        self.renderCohortDefinitionLink = function (s, p, d) {
            return '<span class="linkish">' + d.name + '</span>';
        }

        self.exportButton = function (s, p, d) {
            return '<span id="export" class="linkish">Export</span>';
        }

        self.exportClicked = function(d){
            $.ajax({
                type: "GET",
                url: self.config.api.url + 'cohortdefinition/'+d.id,
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var data = "text/json;charset=utf-8,"+ko.toJSON(JSON.parse(result.expression));
                    var link = document.createElement('a');
                    link.href="data:" + data;
                    link.download=d.name.split(' ').join('_')+".cohort";
                    link.style.display = "none";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
		}

		self.rowClick = function (d, e) {
        	if(e.originalEvent.target.getAttribute('id') === "export"){
        		self.exportClicked(d);
        		return;
			}
			self.selected(d.id);
		}

		self.columns = [{
				title: 'Id',
				data: 'id'
			},
			{
				title: 'Name',
				render: self.renderCohortDefinitionLink
			},
			{
				title: 'Created',
				render: function (s, p, d) {
					return new Date(d.createdDate)
						.toLocaleDateString();
				}
			},
			{
				title: 'Updated',
				render: function (s, p, d) {
					return new Date(d.modifiedDate)
						.toLocaleDateString();
				}
			},
			{
				title: 'Author',
				data: 'createdBy'
			},
            {
                title: 'Export',
                render: self.exportButton
            }
		];

	}

	var component = {
		viewModel: cohortDefinitionBrowser,
		template: view
	};

	ko.components.register('cohort-definition-browser', component);
	return component;
});
