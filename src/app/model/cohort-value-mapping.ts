export const COHORT_VALUE_MAPPING_VSAL = {
    Demo: 'demo',
    Mitochondria: 'mito',
    ['Acute Care Trios']: 'acutecare',
    ['Acute Care Probands']: 'acutecarepro',
    Neuromuscular: 'demo',
    ['Epileptic Encephalopathies']: 'ee',
    ['Brain Malformations']: 'bm',
    Leukodystrophies: 'leukodystrophies',
    ICCon: 'demo',
    Childranz: 'demo',
    HIDDEN: 'demo',
    ['Genetic Immunology']: 'demo',
    Cardiac: 'demo',
    KidGen: 'demo',
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
    ICCon: 'demo',
    Childranz: 'demo',
    HIDDEN: 'demo',
    ['Genetic Immunology']: 'demo',
    Cardiac: 'demo',
    KidGen: 'demo'
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
    ICCon: 'demo',
    Childranz: 'demo',
    HIDDEN: 'demo',
    ['Genetic Immunology']: 'demo',
    Cardiac: 'demo',
    KidGen: 'demo'
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
    Demo: {
        gen: '51',
        phen: '51'
    },
    Mitochondria: {
        gen: '82',
        phen: '82'
    },
    Neuromuscular: null,
    ['Acute Care Trios']: {
        gen: '256',
        phen: '86'
    },
    ['Acute Care Probands']: {
        gen: '86',
        phen: '86'
    },
    ['Epileptic Encephalopathies']: {
        gen: '82',
        phen: '82'
    },
    ['Brain Malformations']: {
        gen: '83',
        phen: '83'
    },
    Leukodystrophies: {
        gen: '19',
        phen: '19'
    },
    Childranz: null,
    ICCon: null,
    HIDDEN: null,
    ['Genetic Immunology']: null,
    Cardiac: null,
    KidGen: null
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