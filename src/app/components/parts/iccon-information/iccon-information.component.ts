import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-iccon-information',
    templateUrl: './iccon-information.component.html',
    styleUrls: ['./iccon-information.component.css']
})
export class IcconInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'iccon/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Case', 'case', 'Case', 'row', true, true, (dimension, filters) => {
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
        200),
        new ClinicalFields('Consent for future research', 'consent', 'Consent for future research', 'pie'),
        new ClinicalFields('Test type', 'type', 'Test type', 'pie', false),
    ];
    phenoService: string = 'getIccon'

    constructor() {
    }

}
