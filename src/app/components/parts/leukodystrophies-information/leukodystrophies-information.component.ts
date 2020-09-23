import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';

@Component({
    selector: 'app-leukodystrophies-information',
    templateUrl: './leukodystrophies-information.component.html',
    styleUrls: ['./leukodystrophies-information.component.css']
})
export class LeukodystrophiesInformationComponent {
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'leukodystrophies/pheno'
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('gender', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Diagnosis status', 'diagnosisStatus', 'Diagnosis status', 'pie'),
        new ClinicalFields('Age of onset of presenting symptoms', 'ageOfOnsetOfPresentingSymptoms', 'Age of onset of presenting symptoms', 'row'),
        new ClinicalFields('Delayed early motor milestones', 'delayedEarlyMilestones', 'Delayed early motor milestones', 'pie'),
        new ClinicalFields('Intellectual disability', 'intellectualDisability', 'Intellectual disability', 'pie'),
        new ClinicalFields('Seizures', 'seizures', 'Seizures', 'pie', false),
        new ClinicalFields('Nystagmus', 'nystagmus', 'Nystagmus', 'pie', false),
        new ClinicalFields('Head size (OFC)', 'headSize', 'Head size (OFC)', 'row', false),
        new ClinicalFields('Axial hypotonia', 'axialHypotonia', 'Axial hypotonia', 'pie', false),
        new ClinicalFields('Appendicular hypotonia', 'appendicularHypotonia', 'Appendicular hypotonia', 'pie', false),
        new ClinicalFields('Peripheral neuropathy', 'peripheralNeuropathy', 'Peripheral neuropathy', 'pie', false),
        new ClinicalFields('Trunk/ axial ataxia', 'axialAtaxia', 'Trunk/ axial ataxia', 'pie', false),
        new ClinicalFields('Dental abnormalities', 'dentalAbnormalities', 'Dental abnormalities', 'pie', false),
        new ClinicalFields('Venous lactate and CSF lactate', 'vecnousLactateAndCSFLactate', 'Venous lactate and CSF lactate', 'pie', false),
        new ClinicalFields('Venous pyruvate and CSF pyruvate', 'venousPyruvateandCSFPyruvate', 'Venous pyruvate and CSF pyruvate', 'pie', false),
        new ClinicalFields('Is posterior fossa involvement predominant', 'isPosteriorfossa', 'Is posterior fossa involvement predominant', 'pie', false),
        new ClinicalFields('Corpus callosum affected?', 'corpusCallosumAffected', 'Corpus callosum affected?', 'pie', false),
        new ClinicalFields('Internal capsule affected?', 'internalCapsuleAffected', 'Internal capsule affected?', 'pie', false),
        new ClinicalFields('External capsule affected?', 'externalCapsuleAffected', 'External capsule affected?', 'pie', false),
        new ClinicalFields('Is there contrast enhancement?', 'isThereContrastEnhancement', 'Is there contrast enhancement?', 'pie', false),
        new ClinicalFields('Is there restricted diffusion?', 'restrictedDiffusion', 'Is there restricted diffusion?', 'pie', false),
        new ClinicalFields('MR Spectroscopy', 'MRSpectroscopy', 'MR Spectroscopy', 'pie', false),
        new ClinicalFields('State of myelination', 'stateOfMyelination', 'State of myelination', 'pie', false),
        new ClinicalFields('Is there atrophy?', 'isThereAtrophy', 'Is there atrophy?', 'pie', false),
        new ClinicalFields('Cysts', 'cysts', 'Cysts', 'row', false),
        new ClinicalFields('Evidence of calcification', 'evidenceOfCalcification', 'Evidence of calcification', 'pie', false),
        new ClinicalFields('Variant 1 class', 'variant1Class', 'Reported Variant 1 class', 'row', false),
        new ClinicalFields('Variant 2 class', 'variant2Class', 'Reported Variant 2 class', 'row', false),
    ];
    phenoService: string = 'getLeukodystrophies'

    constructor() {
    }

}
