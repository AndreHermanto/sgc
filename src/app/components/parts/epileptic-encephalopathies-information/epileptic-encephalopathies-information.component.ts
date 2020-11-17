import { Component, Input, OnInit } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-epileptic-encephalopathies-information',
    templateUrl: './epileptic-encephalopathies-information.component.html',
    styleUrls: ['./epileptic-encephalopathies-information.component.css']
})
export class EpilepticEncephalopathiesInformationComponent implements OnInit{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    @Input() unconsentedAccess: boolean = false;
    permission: string = 'ee/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('Consent for future research', 'consent', 'Consent for future research', 'pie'),
        new ClinicalFields('Sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Diagnosis status', 'diagnosisStatus', 'Diagnosis status', 'pie'),
        new ClinicalFields('Test type', 'type', 'Test type', 'pie', false),
        new ClinicalFields('Ethnicity', 'ethnicity', 'Ethnicity', 'row', false),
        new ClinicalFields('Maternal Ethnicity', 'maternalEthnicity', 'Maternal Ethnicity', 'row', false),
        new ClinicalFields('Paternal Ethnicity', 'PaternalEthnicity', 'Paternal Ethnicity', 'row', false),
        new ClinicalFields('Is mother affected?', 'isMotherAffected', 'Is mother affected?', 'pie', false),
        new ClinicalFields('Is father affected?', 'isFatherAffected', 'Is father affected?', 'pie', false),
        new ClinicalFields('Consanguinity', 'consanguinity', 'Consanguinity', 'pie', false),
        new ClinicalFields('Age of onset', 'ageOfOnset', 'Age of Onset', 'row'),
        new ClinicalFields('Seizure type', 'seizureType', 'Seizure type', 'row', false),
        new ClinicalFields('Was development ever normal?', 'wasDevelopmentEverNormal', 'Was development ever normal?', 'pie', false),
        new ClinicalFields('Tone Abnormality', 'toneAbnormality', 'Tone Abnormality', 'pie', false),
        new ClinicalFields('Epileptic syndrome at presentation', 'epilepticSyndromeAtPresentation' , 'Epileptic Syndrome at Presentation', 'row'),
        new ClinicalFields('Epileptic syndrome at evolution', 'epilepticSyndromeAtEvolution', 'Epileptic Syndrome at Evolution', 'row'),
        new ClinicalFields('Beneficial treatment', 'beneficialTreatment', 'Beneficial Treatment', 'row', false),
        new ClinicalFields('Exacerbating treatment', 'exacerbatingTreatment', 'Exacerbating Treatment', 'row', false),
        new ClinicalFields('Developmental regressed', 'developmentalRegressed', 'Developmental Regressed', 'pie', false),
        new ClinicalFields('Developmental outcome', 'developmentalOutcome', 'Developmental Outcome', 'pie', false),
        new ClinicalFields('Autism spectrum disorder', 'autismSpectrumDisorder', 'Autism Spectrum Disorder', 'pie', false),
        new ClinicalFields('Movement disorder', 'movementDisorder', 'Movement Disorder', 'row', false),
        new ClinicalFields('Head size', 'headSize', 'Head Size', 'row', false),
        new ClinicalFields('Dysmorphic features', 'dysmorphicFeatures', 'Dysmorphic Features', 'row', false),
        new ClinicalFields('Growth abnormality', 'growthAbnormality', 'Growth Abnormality', 'pie', false),
        new ClinicalFields('Psychiatric behavioural problems', 'psychiatricBehaviouralProblems', 'Psychiatric Behavioural Problems', 'row', false),
        new ClinicalFields('Number of variants reported', 'numberOfVariantsReported', 'Number of Variants Reported', 'row', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'Reported Variant 1 Class', 'row', false),
        new ClinicalFields('Variant 2 class', 'variant2Class', 'Reported Variant 2 Class', 'row', false),
        new ClinicalFields('Variant 3 class', 'variant3Class', 'Reported Variant 3 Class', 'row', false),
        new ClinicalFields('Variant 4 class', 'variant4Class', 'Reported Variant 4 Class', 'row', false),
        new ClinicalFields('Variant 5 class', 'variant5Class', 'Reported Variant 5 Class', 'row', false),
    ];
    phenoService: string = 'getEpilepticEncephalopathies'

    constructor() {
    }

    ngOnInit(){
        if(!this.unconsentedAccess){
            this.clinicalFields = this.clinicalFields.filter(c => c.fieldName !== 'Consent for future research')
        }
  }

}
