define([
  "knockout",
  "../options",
  "../utils",
  "../InputTypes/Range",
  "../InputTypes/Text",
  "../CriteriaGroup",
  "text!./TreatmentLineTemplate.html",
  "../const",
], function (
  ko,
  options,
  utils,
  Range,
  Text,
  CriteriaGroup,
  template,
  constants
) {
  function TreatmentLineViewModel(params) {
    var self = this;
    self.formatOption = function (d) {
      return (
        '<div class="optionText">' +
        d.text +
        "</div>" +
        '<div class="optionDescription">' +
        d.description +
        "</div>"
      );
    };

    self.addActions = [
      {
        ...constants.treatmentlineAttributes.addFirstDiagnosis,
        selected: false,
        action: function () {
          if (self.Criteria.First() == null) self.Criteria.First(true);
        },
      },
      {
        ...constants.treatmentlineAttributes.addAge,
        selected: false,
        action: function () {
          if (self.Criteria.Age() == null) self.Criteria.Age(new Range());
        },
      },
      {
        ...constants.treatmentlineAttributes.addGender,
        selected: false,
        action: function () {
          if (self.Criteria.Gender() == null)
            self.Criteria.Gender(ko.observableArray());
        },
      },
      {
        ...constants.treatmentlineAttributes.addStartDate,
        selected: false,
        action: function () {
          if (self.Criteria.TreatmentLineStartDate() == null)
            self.Criteria.TreatmentLineStartDate(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        ...constants.treatmentlineAttributes.addEndDate,
        selected: false,
        action: function () {
          if (self.Criteria.TreatmentLineEndDate() == null)
            self.Criteria.TreatmentLineEndDate(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        ...constants.treatmentlineAttributes.addDrugEraStartDate,
        selected: false,
        action: function () {
          if (self.Criteria.TreatmentLineDrugEraStartDate() == null)
            self.Criteria.TreatmentLineDrugEraStartDate(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        ...constants.treatmentlineAttributes.addDrugEraEndDate,
        selected: false,
        action: function () {
          if (self.Criteria.TreatmentLineDrugEraEndDate() == null)
            self.Criteria.TreatmentLineDrugEraEndDate(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        ...constants.treatmentlineAttributes.addLineNumber,
        selected: false,
        action: function () {
          if (self.Criteria.TreatmentLineNumber() == null)
            self.Criteria.TreatmentLineNumber(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        ...constants.treatmentlineAttributes.addNumberOfCycles,
        selected: false,
        action: function () {
          if (self.Criteria.TotalCycleNumber() == null)
            self.Criteria.TotalCycleNumber(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        ...constants.treatmentlineAttributes.addNumberOfDrugExposures,
        selected: false,
        action: function () {
          if (self.Criteria.DrugExposureCount() == null)
            self.Criteria.DrugExposureCount(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        ...constants.treatmentlineAttributes.addType,
        selected: false,
        action: function () {
          if (self.Criteria.TreatmentLineType() == null)
            self.Criteria.TreatmentLineType(ko.observableArray());
        },
      },
      {
        ...constants.treatmentlineAttributes.addVisit,
        selected: false,
        action: function () {
          if (self.Criteria.VisitType() == null)
            self.Criteria.VisitType(ko.observableArray());
        },
      },
      {
        ...constants.treatmentlineAttributes.addProviderSpecialty,
        selected: false,
        action: function () {
          if (self.Criteria.ProviderSpecialty() == null)
            self.Criteria.ProviderSpecialty(ko.observableArray());
        },
      },
      {
        ...constants.treatmentlineAttributes.addNested,
        selected: false,
        action: function () {
          if (self.Criteria.CorrelatedCriteria() == null)
            self.Criteria.CorrelatedCriteria(
              new CriteriaGroup(null, self.expression.ConceptSets)
            );
        },
      },
    ];

    self.expression = ko.utils.unwrapObservable(params.expression);
    self.Criteria = params.criteria.TreatmentLine;
    self.options = options;

    self.removeCriterion = function (propertyName) {
      self.Criteria[propertyName](null);
    };
    self.indexMessage = ko.i18nformat(
      'components.conditionTreatmentLine.indexDataText',
      'The index date refers to the treatment line of <%= conceptSetName %>.',
      {
        conceptSetName: utils.getConceptSetName(
          self.Criteria.CodesetId,
          self.expression.ConceptSets,
          ko.i18n('components.conditionTreatmentLine.anyTreatment', 'Any Treatment')
        ),
      }
    );
  }

  // return compoonent definition
  return {
    viewModel: TreatmentLineViewModel,
    template: template,
  };
});
