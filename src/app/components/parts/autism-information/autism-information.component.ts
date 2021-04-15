import { Component, Input, OnInit } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-autism-information',
    templateUrl: './autism-information.component.html',
    styleUrls: ['./autism-information.component.css']
})
export class AutismInformationComponent implements OnInit{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    @Input() unconsentedAccess: boolean = false;
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('familyData', 'familyData', 'Family Data', 'pie'),
        new ClinicalFields('gender', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Relationship', 'relationship', 'Relationship', 'row'),
    ];
    phenoService: string = 'getAutism'

    constructor() {
    }

    ngOnInit(){
        if(!this.unconsentedAccess){
            this.clinicalFields = this.clinicalFields.filter(c => c.fieldName !== 'Consent for future research')
        }
  }

}
