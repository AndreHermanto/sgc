import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-epileptic-encephalopathies-information',
    templateUrl: './epileptic-encephalopathies-information.component.html',
    styleUrls: ['./epileptic-encephalopathies-information.component.css']
})
export class EpilepticEncephalopathiesInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'ee/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Sex', 'sex', 'pie'),
        new ClinicalFields('Ethnicity', 'ethnicity', 'row'),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'row', false),
        new ClinicalFields('Paternal Ethnicity', 'PaternalEthnicity', 'row', false),
        new ClinicalFields('Is mother affected?', 'isMotherAffected', 'pie', false),
        new ClinicalFields('Is father affected?', 'isFatherAffected', 'pie', false),
        new ClinicalFields('Consanguinity', 'consanguinity', 'pie'),
        new ClinicalFields('Age of onset', 'ageOfOnset', 'row'),
        new ClinicalFields('Seizure type', 'seizureType', 'row'),
        new ClinicalFields('Was development ever normal?', 'wasDevelopmentEverNormal', 'pie', false),
        new ClinicalFields('Tone Abnormality', 'toneAbnormality', 'pie', false),
        new ClinicalFields('Epileptic syndrome at presentation', 'epilepticSyndromeAtPresentation' , 'row', false),
        new ClinicalFields('Epileptic syndrome at evolution', 'epilepticSyndromeAtEvolution', 'row', false),
        new ClinicalFields('Beneficial treatment', 'beneficialTreatment', 'row', false),
        new ClinicalFields('Exacerbating treatment', 'exacerbatingTreatment', 'row', false),
        new ClinicalFields('Developmental regressed', 'developmentalRegressed', 'pie', false),
        new ClinicalFields('Developmental outcome', 'developmentalOutcome', 'pie', false),
        new ClinicalFields('Autism spectrum disorder', 'autismSpectrumDisorder', 'pie', false),
        new ClinicalFields('Movement disorder', 'movementDisorder', 'row', false),
        new ClinicalFields('Head size', 'headSize', 'row', false),
        new ClinicalFields('Dysmorphic features', 'dysmorphicFeatures', 'row', false),
        new ClinicalFields('Growth abnormality', 'growthAbnormality', 'pie', false),
        new ClinicalFields('Psychiatric behavioural problems', 'psychiatricBehaviouralProblems', 'row', false),
        new ClinicalFields('Number of variants reported', 'numberOfVariantsReported', 'row'),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'row'),
        new ClinicalFields('Variant 2 class', 'variant2Class', 'row'),
        new ClinicalFields('Variant 3 class', 'variant3Class', 'row'),
        new ClinicalFields('Variant 4 class', 'variant4Class', 'row'),
        new ClinicalFields('Variant 5 class', 'variant5Class', 'row'),
    ];
    phenoService: string = 'getEpilepticEncephalopathies'

    constructor() {
    }

}