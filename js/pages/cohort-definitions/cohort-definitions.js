define([
	'knockout',
	'text!./cohort-definitions.html',
	'appConfig',
	'webapi/AuthAPI',
	'providers/Page',
	'utils/CommonUtils',
	'pages/cohort-definitions/const',
	'databindings',
	'faceted-datatable',
	'components/heading',
], function (
	ko,
	view,
	config,
	authApi,
	Page,
	commonUtils,
	constants,
) {
	class CohortDefinitions extends Page {
		constructor(params) {
			super(params);
			this.model = params.model;
			this.cohortDefinitionId = ko.observable();
			this.cohortDefinitionId.extend({
				notify: 'always'
			});
		
			this.cohortDefinitionId.subscribe((id) => {
				document.location = constants.paths.details(id);
			});
		
		
			this.newCohortButtonCaption = ko.computed(() => {
				if (this.model.currentCohortDefinition) {
					if (this.model.currentCohortDefinition() !== undefined) {
						return 'Please close your current cohort definition before creating a new one.';
					} else {
						return 'Create a new cohort definition.';
					}
				}
			});
		
			this.isAuthenticated 	= authApi.isAuthenticated;
			this.canReadCohorts 	= ko.pureComputed(() => (config.userAuthenticationEnabled && this.isAuthenticated() && authApi.isPermittedReadCohorts()) || !config.userAuthenticationEnabled);
			this.canCreateCohort 	= ko.pureComputed(() => (config.userAuthenticationEnabled && this.isAuthenticated() && authApi.isPermittedCreateCohort()) || !config.userAuthenticationEnabled);

			this.empty = ko.observable('');
		}

		newDefinition(data, event) {
			this.cohortDefinitionId('0');
		}

        getImportDataEndpoint(source) {
            return `${config.api.url}cohortdefinition/hss/list/all${this.empty()}`;
        }

        getSelectDataEndpoint(source) {
            return `${config.api.url}cohortdefinition/hss/select${this.empty()}`;
        }

        getFileDataEndpoint(source) {
            return `${config.api.url}cohortdefinition/${this.empty()}`;
        }

        isValid() {
            return (config.userAuthenticationEnabled && this.isAuthenticated() && authApi.isPermittedImportCohortDefinition()) || !config.userAuthenticationEnabled;
        }
		
	}

	commonUtils.build('cohort-definitions', CohortDefinitions, view);
});
