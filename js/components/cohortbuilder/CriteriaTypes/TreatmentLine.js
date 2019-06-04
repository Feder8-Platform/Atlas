define(['knockout', './Criteria', '../InputTypes/Range','conceptpicker/InputTypes/Concept', '../InputTypes/Text'], function (ko, Criteria, Range, Concept, Text) {

	function TreatmentLine(data, conceptSets) {
		var self = this;
		data = data || {};

		console.log(data);

		Criteria.call(this, data, conceptSets);
		
		// set up subscription to update CodesetId and DrugSourceConcept if the item is removed from conceptSets
		conceptSets.subscribe(function (changes) {
			changes.forEach(function(change) {
					if (change.status === 'deleted') {
					  if (ko.utils.unwrapObservable(self.CodesetId) == change.value.id)
							self.CodesetId(null);
						if (ko.utils.unwrapObservable(self.DrugSourceConcept()) == change.value.id)
							self.DrugSourceConcept(null);
					}
			});
		}, null, "arrayChange");

		// General Treatment Line Criteria
		self.TreatmentLineNumber = ko.observable(data.TreatmentLineNumber && new Range(data.TreatmentLineNumber));
		self.TotalCycleNumber = ko.observable(data.TotalCycleNumber && new Range(data.TotalCycleNumber));
		self.DrugExposureCount = ko.observable(data.DrugExposureCount && new Range(data.DrugExposureCount));
		self.TreatmentTypeId = ko.observable(data.TreatmentTypeId && new Range(data.TreatmentTypeId));

		// Verbatim fields
		self.CodesetId = ko.observable(data.CodesetId);

		self.TreatmentLineStartDate = ko.observable(data.TreatmentLineStartDate && new Range(data.TreatmentLineStartDate));
		self.TreatmentLineEndDate = ko.observable(data.TreatmentLineEndDate && new Range(data.TreatmentLineEndDate));
		self.TreatmentLineDrugEraStartDate = ko.observable(data.TreatmentLineDrugEraStartDate && new Range(data.TreatmentLineDrugEraStartDate));
		self.TreatmentLineDrugEraEndDate = ko.observable(data.TreatmentLineDrugEraEndDate && new Range(data.TreatmentLineDrugEraEndDate));
		
		// Derived Fields
		self.First = ko.observable(data.First || null);
		self.Age = ko.observable(data.Age && new Range(data.Age));

		// Linked Fields
		self.Gender = ko.observable(data.Gender && ko.observableArray(data.Gender.map(function (d) {
			return new Concept(d);
		})));
	}

	TreatmentLine.prototype = new Criteria();
	TreatmentLine.prototype.constructor = TreatmentLine;
	TreatmentLine.prototype.toJSON = function () {
		return this;
	}

	return TreatmentLine;

});