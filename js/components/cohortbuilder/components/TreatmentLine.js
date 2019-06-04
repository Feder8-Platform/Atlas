define(['knockout', '../options', '../InputTypes/Range', '../InputTypes/Text', '../CriteriaGroup', 'text!./TreatmentLineTemplate.html'], function (ko, options, Range, Text, CriteriaGroup, template) {

	function TreatmentLineViewModel(params) {
		var self = this;
		self.formatOption = function (d) {
			return '<div class="optionText">' + d.text + '</div>' +
				'<div class="optionDescription">' + d.description + '</div>';
		};

		self.addActions = [{
			text: "Add First Exposure Criteria",
			value: 5,
			selected: false,
			description: "Limit Treatment Lines to the first exposure in history."
		},
		{
			text: "Add Age at Occurrence Criteria",
			value: 6,
			selected: false,
			description: "Filter Drug Exposures by age at occurrence."
		},
		{
			text: "Add Gender Criteria",
			value: 7,
			selected: false,
			description: "Filter Treatment Lines based on Gender."
		},
		{
			text: "Add Start Date Criteria",
			value: 0,
			selected: false,
			description: "Filter Treatment Lines by the Treatment Line Start Date."
		},
		{
			text: "Add End Date Criteria",
			value: 1,
			selected: false,
			description: "Filter Treatment Lines by the Treatment Line End Date"
		},
		{
			text: "Add Drug Era Start Date Criteria",
			value: 21,
			selected: false,
			description: "Filter Treatment Lines by the Drug Era Start Date."
		},
		{
			text: "Add Drug Era End Date Criteria",
			value: 22,
			selected: false,
			description: "Filter Treatment Lines by the Drug Era End Date"
		},
		{
			text: "Add Treatment Line Number Criteria",
			value: 20,
			selected: false,
			description: "Filter Treatment Lines by Treatment Line Numbers."
		},
		{
			text: "Add Total Number of Cycles Criteria",
			value: 23,
			selected: false,
			description: "Filter Treatment Lines by Total number of cycles."
		},
		{
			text: "Add Total Number of Drug Exposures",
			value: 24,
			selected: false,
			description: "Filter Treatment Lines by Total number of drug exposures."
		},
		{
			text: "Add type id of Treatment Line",
			value: 25,
			selected: false,
			description: "Filter Treatment Lines by its type id."
		},
		{
			text: "Add Nested Criteria...",
			value: 19,
			selected: false,
			description: "Apply criteria using the condition occurrence as the index date",
		}
		];

		self.actionHandler = function (data) {
			var criteriaType = data.value;
			switch (criteriaType) {
				case 0:
					if (self.Criteria.TreatmentLineStartDate() == null)
						self.Criteria.TreatmentLineStartDate(new Range({
							Op: "lt"
						}));
					break;
				case 1:
					if (self.Criteria.TreatmentLineEndDate() == null)
						self.Criteria.TreatmentLineEndDate(new Range({
							Op: "lt"
						}));
					break;
				case 5:
					if (self.Criteria.First() == null)
						self.Criteria.First(true);
					break;
				case 6:
					if (self.Criteria.Age() == null)
						self.Criteria.Age(new Range());
					break;
				case 7:
					if (self.Criteria.Gender() == null)
						self.Criteria.Gender(ko.observableArray());
					break;
				case 19:
					if (self.Criteria.CorrelatedCriteria() == null)
						self.Criteria.CorrelatedCriteria(new CriteriaGroup(null, self.expression.ConceptSets));
					break;
				case 20:
					if (self.Criteria.TreatmentLineNumber() == null)
						self.Criteria.TreatmentLineNumber(new Range({
							Op: "lt"
						}));
					break;
				case 21:
					if (self.Criteria.TreatmentLineDrugEraStartDate() == null)
						self.Criteria.TreatmentLineDrugEraStartDate(new Range({
							Op: "lt"
						}));
					break;
				case 22:
					if (self.Criteria.TreatmentLineDrugEraEndDate() == null)
						self.Criteria.TreatmentLineDrugEraEndDate(new Range({
							Op: "lt"
						}));
					break;
				case 23:
					if (self.Criteria.TotalCycleNumber() == null)
						self.Criteria.TotalCycleNumber(new Range({
							Op: "lt"
						}));
					break;
				case 24:
					if (self.Criteria.DrugExposureCount() == null)
						self.Criteria.DrugExposureCount(new Range({
							Op: "lt"
						}));
					break;
				case 25:
					if (self.Criteria.TreatmentTypeId() == null)
						self.Criteria.TreatmentTypeId(new Range({
							Op: "lt"
						}));
					break;
			}
		}

		self.expression = ko.utils.unwrapObservable(params.expression);
		self.Criteria = params.criteria.TreatmentLine;
		self.options = options;

		self.removeCriterion = function (propertyName) {
			self.Criteria[propertyName](null);
		}

	}

	// return compoonent definition
	return {
		viewModel: TreatmentLineViewModel,
		template: template
	};
});
