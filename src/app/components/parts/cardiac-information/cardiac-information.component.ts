import { Component, Input, OnInit } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-cardiac-information',
    templateUrl: './cardiac-information.component.html',
    styleUrls: ['./cardiac-information.component.css']
})
export class CardiacInformationComponent implements OnInit{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    @Input() unconsentedAccess: boolean = false;
    permission: string = 'cardiac/pheno';

    multiValueFilter = (dimension, filters) => {
      dimension.filter(null);   
      if (filters.length === 0)
          dimension.filter(null);
      else
          dimension.filterFunction(function (d) {
              if (_.difference(filters, d).length === 0) return true;
              return false; 
          });
      return filters;  
  }
  
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Consent for future research', 'consent', 'Consent for future research', 'pie'),
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Clinical area', 'clinicalArea', 'Clinical Area', 'row'),
        new ClinicalFields('diagnosis', 'diagnosis', 'Diagnosis', 'row'),
        new ClinicalFields('Symptoms at diagnosis', 'symptomsAtDiagnosis', 'Symptoms at diagnosis', 'pie', false),
        new ClinicalFields('Family history of disease', 'famDiseaseHistory', 'Family history of disease', 'pie'),
        new ClinicalFields('Family history of sudden death', 'famSuddenDeathHistory', 'Family history of sudden death', 'pie'),
        new ClinicalFields('Tier 1 Result', 'tier1Result', 'Tier 1 Result', 'pie', false),
        new ClinicalFields('Test Type', 'testType', 'Test Type', 'pie', false)
    ];
    phenoService: string = 'getCardiac'

    constructor() {
    }

    ngOnInit(){
        if(!this.unconsentedAccess){
            this.clinicalFields = this.clinicalFields.filter(c => c.fieldName !== 'Consent for future research')
        }
  }

}
