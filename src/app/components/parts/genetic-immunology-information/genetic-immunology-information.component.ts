import { Component, Input, OnInit } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-genetic-immunology-information',
    templateUrl: './genetic-immunology-information.component.html',
    styleUrls: ['./genetic-immunology-information.component.css']
})
export class GeneticImmunologyInformationComponent implements OnInit{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    @Input() unconsentedAccess: boolean = false;
    permission: string = 'gi/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Consent for future research', 'consent', 'Consent for future research', 'pie'),
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('diagnosis', 'diagnosis', 'Diagnosis', 'row'),
        new ClinicalFields('Test Result', 'testResult', 'Test Result', 'pie'),
        new ClinicalFields('Test Type', 'testType','Test Type', 'pie', false)
    ];
    phenoService: string = 'getGeneticImmunology'

    constructor() {
    }

    ngOnInit(){
        if(!this.unconsentedAccess){
            this.clinicalFields = this.clinicalFields.filter(c => c.fieldName !== 'Consent for future research')
        }
  }

}
