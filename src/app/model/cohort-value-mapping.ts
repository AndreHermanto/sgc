export const COHORT_VALUE_MAPPING_VSAL = {
    Demo: 'demo',
    Mitochondria: 'mito',
    ['Acute Care Trios']: 'acutecare',
    ['Acute Care Probands']: 'acutecarepro',
    Neuromuscular: 'demo',
    ['Epileptic Encephalopathies']: 'ee',
    ['Brain Malformations']: 'bm',
    Leukodystrophies: 'leukodystrophies',
    ICCon: 'iccon',
    Childranz: 'demo',
    HIDDEN: 'demo',
    ['Genetic Immunology']: 'gi',
    Cardiac: 'cardiac',
    KidGen: 'kidgen',
}

export const COHORT_VALUE_MAPPING_SSVS = {
    Demo: 'demo',
    Mitochondria: 'mito',
    ['Acute Care Trios']: 'acutecare',
    ['Acute Care Probands']: 'acutecarepro',
    Neuromuscular: 'demo',
    ['Epileptic Encephalopathies']: 'ee',
    ['Brain Malformations']: 'bm',
    Leukodystrophies: 'leukodystrophies',
    ICCon: 'iccon',
    Childranz: 'demo',
    HIDDEN: 'demo',
    ['Genetic Immunology']: 'gi',
    Cardiac: 'cardiac',
    KidGen: 'kidgen'
}

export const COHORT_VALUE_MAPPING_MAPD = {
    Demo: 'demo',
    Mitochondria: 'mito',
    ['Acute Care Trios']: 'acutecare',
    ['Acute Care Probands']: 'acutecarepro',
    Neuromuscular: 'demo',
    ['Epileptic Encephalopathies']: 'ee',
    ['Brain Malformations']: 'bm',
    Leukodystrophies: 'leukodystrophies',
    ICCon: 'iccon',
    Childranz: 'demo',
    HIDDEN: 'demo',
    ['Genetic Immunology']: 'gi',
    Cardiac: 'cardiac',
    KidGen: 'kidgen'
}

export const COHORT_PERMISSION_SUMMARY_MAPPING = {
    Demo: '',
    Mitochondria: 'mito/summary',
    ['Acute Care Trios']: 'acutecare/summary',
    ['Acute Care Probands']: 'acutecare/summary',
    Neuromuscular: 'neuromuscular/summary',
    ['Epileptic Encephalopathies']: 'ee/summary',
    ['Brain Malformations']: 'bm/summary',
    Leukodystrophies: 'leukodystrophies/summary',
    ICCon: 'iccon/summary',
    Childranz: 'childranz/summary',
    HIDDEN: 'hidden/summary',
    ['Genetic Immunology']: 'gi/summary',
    Cardiac: 'cardiac/summary',
    KidGen: 'kidgen/summary'
}

export const COHORT_PERMISSION_VSAL_PHENO_MAPPING = {
    Demo: '',
    Mitochondria: 'mito/pheno',
    ['Acute Care Trios']: 'acutecare/pheno',
    ['Acute Care Probands']: 'acutecare/pheno',
    Neuromuscular: 'neuromuscular/pheno',
    ['Epileptic Encephalopathies']: 'ee/pheno',
    ['Brain Malformations']: 'bm/pheno',
    Leukodystrophies: 'leukodystrophies/pheno',
    ICCon: 'iccon/pheno',
    Childranz: 'childranz/pheno',
    HIDDEN: 'hidden/pheno',
    ['Genetic Immunology']: 'gi/pheno',
    Cardiac: 'cardiac/pheno',
    KidGen: 'kidgen/pheno'
}

export const COHORT_PERMISSION_UNCONSENTED_SAMPLES = {
    Demo: '',
    Mitochondria: 'mito/unconsented',
    ['Acute Care Trios']: 'acutecare/unconsented',
    ['Acute Care Probands']: 'acutecare/unconsented',
    Neuromuscular: 'neuromuscular/unconsented',
    ['Epileptic Encephalopathies']: 'ee/unconsented',
    ['Brain Malformations']: 'bm/unconsented',
    Leukodystrophies: 'leukodystrophies/unconsented',
    ICCon: 'iccon/unconsented',
    Childranz: 'childranz/unconsented',
    HIDDEN: 'hidden/unconsented',
    ['Genetic Immunology']: 'gi/unconsented',
    Cardiac: 'cardiac/unconsented',
    KidGen: 'kidgen/unconsented'
}

export const COHORT_PHENO_GET_MAPPING = {
    Demo: 'getDemo',
    Mitochondria: 'getMitochondria',
    ['Acute Care Trios']: 'getAcutecare',
    ['Acute Care Probands']: 'getAcuteCareProband',
    Neuromuscular: 'getNeuromuscular',
    ['Epileptic Encephalopathies']: 'getEpilepticEncephalopathies',
    ['Brain Malformations']: 'getBrainMalformations',
    Leukodystrophies: 'getLeukodystrophies',
    ICCon: 'getIccon',
    Childranz: 'getChildranz',
    HIDDEN: 'getHidden',
    ['Genetic Immunology']: 'getGeneticImmunology',
    Cardiac: 'getCardiac',
    KidGen: 'getKidgen'
}

export const COHORT_SAMPLES_INFO = {
    GRCh37:{
        Demo: {
            gen: '51',
            phen: '51',
            wgs: 51,
            wes: 0
        },    
        Mitochondria: {
            gen: '82',
            phen: '82',
            wgs: 30,
            wes: 52
        },
        Neuromuscular: null,
        ['Acute Care Trios']: {
            gen: '256',
            phen: '86',
            wgs: 0,
            wes: 256
        },
        ['Acute Care Probands']: {
            gen: '86',
            phen: '86',
            wgs: 0,
            wes: 86
        },
        ['Epileptic Encephalopathies']: {
            gen: '82',
            phen: '82',
            wgs: 0,
            wes: 82
        },
        ['Brain Malformations']: {
            gen: '83',
            phen: '83',
            wgs: 0,
            wes: 83
        },
        Leukodystrophies: {
            gen: '19',
            phen: '19',
            wgs: 0,
            wes: 19
        },
        Childranz: null,
        ICCon: {
            gen: '137',
            phen: '137',
            wgs: 137,
            wes: 0
        },
        HIDDEN: null,
        ['Genetic Immunology']: {
            gen: '90',
            phen: '90',
            wgs: 0,
            wes: 90
        },
        Cardiac: {        
            gen: '215',
            phen: '215',
            wgs: 215,
            wes: 0
        },
        KidGen: {
            gen: '200',
            phen: '200',
            wgs: 0,
            wes: 200
    },    
    GRCh38: null
    }
}

export const COHORT_FAMILY_WITH_PHENO = {
    Demo: true,
    Mitochondria: false,
    ['Acute Care Trios']: false,
    ['Acute Care Probands']: false,
    Neuromuscular: false,
    ['Epileptic Encephalopathies']: false,
    ['Brain Malformations']: false,
    Leukodystrophies: true,
    ICCon: false,
    Childranz: false,
    HIDDEN: false,
    ['Genetic Immunology']: false,
    Cardiac: false,
    KidGen: false
}

export const AVAILABLE_BUILD = {
    GRCh37: ['Demo', 'Mitochondria', 'Acute Care Trios', 'Acute Care Probands', 'Neuromuscular', 'Epileptic Encephalopathies', 'Brain Malformations', 'Leukodystrophies', 'ICCon', 'Childranz', 'HIDDEN', 'Genetic Immunology', 'Cardiac', 'KidGen'],
    GRCh38: []
}
export const COHORT_LABELS = {
    Demo: 'Demo',
    Mitochondria: 'Mitochondrial Disease',
    ['Acute Care Trios']: 'Acute Care Trios',
    ['Acute Care Probands']: 'Acute Care Probands',
    Neuromuscular: 'Neuromuscular',
    ['Epileptic Encephalopathies']: 'Epileptic Encephalopathies',
    ['Brain Malformations']: 'Brain Malformations',
    Leukodystrophies: 'Leukodystrophies',
    ICCon: 'Inherited Cancers (ICCon)',
    Childranz: 'Interstitial Lung Diseases (chILDRANZ)',
    HIDDEN: 'HIDDEN Renal',
    ['Genetic Immunology']: 'Genetic Immunology',
    Cardiac: 'Cardiac',
    KidGen: 'Renal (KidGen)'
}
