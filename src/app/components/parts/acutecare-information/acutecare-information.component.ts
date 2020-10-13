import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-acutecare-information',
    templateUrl: './acutecare-information.component.html',
    styleUrls: ['./acutecare-information.component.css']
})
export class AcutecareInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'acutecare/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Diagnosis status', 'diagnosisStatus', 'Diagnosis status', 'pie'),
        new ClinicalFields('Consent for future research', 'consent', 'Consent for future research', 'pie'),
        new ClinicalFields('Test type', 'type', 'Test type', 'pie', false),
        new ClinicalFields('Participant Ethnicity', 'ethnicity', 'Ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'Maternal Ethnicity', 'row'),
        new ClinicalFields('Paternal Ethnicity', 'paternalEthnicity', 'Paternal Ethnicity', 'row'),
        new ClinicalFields('Is mother affected?', 'motherAffected', 'Mother Affected', 'pie', false),
        new ClinicalFields('Is father affected?', 'fatherAffected', 'Father Affected', 'pie', false),
        new ClinicalFields('Consanguinity', 'consanguinity', 'Consanguinity', 'pie', true),
        new ClinicalFields('Number of variants reported', 'numberOfVariantsReported', 'Number of variants reported', 'row', false),
        new ClinicalFields('Variant type', 'variantType', 'Reported Variant Type', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('Variant Zygosity', 'variantZygosity', 'Reported Variant Zygosity', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('Variant class', 'variantClass', 'Reported Variant Class', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('Relevant pregnancy information', 'rpi', 'Relevant pregnancy information', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
        new ClinicalFields('Principal phenotypic features', 'rpf', 'Principal phenotypic features', 'row', false, true, (dimension, filters) => {
            dimension.filter(null);   
            if (filters.length === 0)
                dimension.filter(null);
            else
                dimension.filterFunction(function (d) {
                    if (_.difference(filters, d).length === 0) return true;
                    return false; 
                });
            return filters;  
        }),
    ];
    phenoService: string = 'getAcutecare'

    constructor() {
    }

}
