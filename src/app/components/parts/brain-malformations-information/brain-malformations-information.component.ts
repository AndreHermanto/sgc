import { Component, Input, OnInit } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
  selector: 'app-brain-malformations-information',
  templateUrl: './brain-malformations-information.component.html',
  styleUrls: ['./brain-malformations-information.component.css']
})
export class BrainMalformationsInformationComponent implements OnInit {
  //Internal IDs
  @Input() samples: string[] = [];
  //pheno file
  @Input() pheno: any[] = [];
  @Input() unconsentedAccess: boolean = false;
  permission: string = 'bm/pheno'

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
      new ClinicalFields('Sex of patient:', 'sex', 'Sex', 'pie'),
      new ClinicalFields('Diagnosis status', 'diagnosisStatus', 'Diagnosis status', 'pie'),
      new ClinicalFields('Test type', 'type', 'Test type', 'pie', false),
      new ClinicalFields('Seizure type', 'seizureType', 'Seizure type', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Conditions', 'conditions', 'Conditions', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Abnormalities', 'abnormalities', 'Abnormalities', 'row', true, true, this.multiValueFilter),
      new ClinicalFields('Variant 1 class', 'variant1Class', 'Reported Variant 1 class', 'row', false),
      new ClinicalFields('Variant 2 class', 'variant2Class', 'Reported Variant 2 class', 'row', false),
  ];
  phenoService: string = 'getBrainMalformations'

  constructor() {
  }

  ngOnInit(){
        if(!this.unconsentedAccess){
            this.clinicalFields = this.clinicalFields.filter(c => c.fieldName !== 'Consent for future research')
        }
  }

}