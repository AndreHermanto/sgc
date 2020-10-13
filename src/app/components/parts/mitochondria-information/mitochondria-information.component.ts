import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-mitochondria-information',
    templateUrl: './mitochondria-information.component.html',
    styleUrls: ['./mitochondria-information.component.css']
})
export class MitochondriaInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'mito/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Gender', 'gender', 'Gender', 'pie'),
        new ClinicalFields('Diagnosis status', 'diagnosisStatus', 'Diagnosis status', 'pie'),
        new ClinicalFields('Condition', 'conditions', 'Conditions', 'row', true, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        },
        325,
        200,
    ),
        new ClinicalFields('Consent for future research', 'consent', 'Consent for future research', 'pie', false),
        new ClinicalFields('Test type', 'type', 'Test type', 'pie', false)
    ];
    phenoService: string = 'getMitochondria'

    constructor() {
    }

}

