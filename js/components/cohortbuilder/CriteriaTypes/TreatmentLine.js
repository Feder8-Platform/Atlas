define(['knockout', './Criteria', '../InputTypes/Range','conceptpicker/InputTypes/Concept', '../InputTypes/Text'], function (ko, Criteria, Range, Concept, Text) {

	function TreatmentLine(data, conceptSets) {
		var self = this;
		data = data || {};

		Criteria.call(this, data, conceptSets);
		
		// set up subscription to update CodesetId and TreatmentLineSourceConcept if the item is removed from conceptSets
		conceptSets.subscribe(function (changes) {
			changes.forEach(function(change) {
					if (change.status === 'deleted') {
					  if (ko.utils.unwrapObservable(self.CodesetId) == change.value.id)
							self.CodesetId(null);
						if (ko.utils.unwrapObservable(self.TreatmentLineSourceConcept()) == change.value.id)
							self.TreatmentLineSourceConcept(null);
					}
			});
		}, null, "arrayChange");

		// General Treatment Line Criteria
        self.TreatmentLineNumber = ko.observable(data.TreatmentLineNumber && new Range(data.TreatmentLineNumber));
        self.TotalCycleNumber = ko.observable(data.TotalCycleNumber && new Range(data.TotalCycleNumber));
        self.DrugExposureCount = ko.observable(data.DrugExposureCount && new Range(data.DrugExposureCount));

		// Verbatim fields
		self.CodesetId = ko.observable(data.CodesetId);

		self.TreatmentLineStartDate = ko.observable(data.TreatmentLineStartDate && new Range(data.TreatmentLineStartDate));
		self.TreatmentLineEndDate = ko.observable(data.TreatmentLineEndDate && new Range(data.TreatmentLineEndDate));
		self.TreatmentLineDrugEraStartDate = ko.observable(data.TreatmentLineDrugEraStartDate && new Range(data.TreatmentLineDrugEraStartDate));
		self.TreatmentLineDrugEraEndDate = ko.observable(data.TreatmentLineDrugEraEndDate && new Range(data.TreatmentLineDrugEraEndDate));
		self.TreatmentLineType = ko.observable(data.TreatmentLineType && ko.observableArray(data.TreatmentLineType.map(function (d) {
			return new Concept(d);
		})));
		self.TreatmentLineTypeExclude = ko.observable(data.TreatmentLineTypeExclude || null);
		self.TreatmentLineSourceConcept = ko.observable(data.TreatmentLineSourceConcept != null ? ko.observable(data.TreatmentLineSourceConcept) : null);

		// Derived Fields
		self.First = ko.observable(data.First || null);
		self.Age = ko.observable(data.Age && new Range(data.Age));

		// Linked Fields
		self.Gender = ko.observable(data.Gender && ko.observableArray(data.Gender.map(function (d) {
			return new Concept(d);
		})));

	  /* Do we still need prior enroll days inside the individual criteria?
		self.PriorEnrollDays = ko.observable((typeof data.PriorEnrollDays == "number") ? data.PriorEnrollDays : null);
		self.AfterEnrollDays = ko.observable((typeof data.AfterEnrollDays == "number") ? data.AfterEnrollDays : null);
		*/

		self.ProviderSpecialty = ko.observable(data.ProviderSpecialty && ko.observableArray(data.ProviderSpecialty.map(function (d) {
			return new Concept(d);
		})));
		self.VisitType = ko.observable(data.VisitType && ko.observableArray(data.VisitType.map(function (d) {
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