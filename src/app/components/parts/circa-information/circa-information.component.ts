import { Component, Input, OnInit } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-circa-information',
    templateUrl: './circa-information.component.html',
    styleUrls: ['./circa-information.component.css']
})
export class CircaInformationComponent implements OnInit{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    @Input() unconsentedAccess: boolean = false;
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('familyData', 'familyData', 'Family Data', 'pie'),
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Referrer Name', 'referrerName', 'Referrer Name', 'row'),
        new ClinicalFields('Funding', 'funding', 'Funding', 'pie'),
        new ClinicalFields('name', 'patientName', 'Patient Name', 'row'),
        new ClinicalFields('birthyear', 'birthyear', 'Birthyear', 'row'),
        new ClinicalFields('Test Outcome', 'testOutcome', 'Test Outcome', 'row'),
        new ClinicalFields('affected', 'affected', 'Affected', 'pie'),
    ];
    phenoService: string = 'getCirca'

    constructor() {
    }

    ngOnInit(){
        if(!this.unconsentedAccess){
            this.clinicalFields = this.clinicalFields.filter(c => c.fieldName !== 'Consent for future research')
        }
  }

}
