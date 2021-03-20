export const HOMOZYGOTES_KEY = '1/1';
export const HETEROZYGOTES_KEY = '0/1';
const DB_SNP_URL = 'https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';

export class VariantSummaryNew {
    chr: string;
    start: number;
    ref: string;
    alt: string;
    an: number;//2
    ac: number;
    af: number;
    variant_class: string;//3
    feature_type: string;//4
    consequences: string;
    impact: string;//5
    biotype: string;//6
    sift: string;
    polyPhen: string;
    cadd_raw: number;//7
    cadd_phred: number;//8
    gnomad_af: number;
    clin_sig: string;//9
    highlight = false;

    static displayName(variant: VariantSummaryNew) {
        return `${ variant.chr }-${ variant.start }-${ variant.ref }-${ variant.alt }`;
    }
}
/*
export class VariantSummaryNew {
    v: string;
    rsid: string;
    chr: string;
    start: number;
    ref: string;
    alt: string;
    type: string;
    highlight = false;
    ac: number;
    af: number;
    nHet: number;
    nHomVar: number;
    cato: number;
    eigen: number;
    sift: string;
    polyPhen: string;
    tgpAF: string;
    hrcAF: string;
    gnomadAF: string;
    consequences: string;
    geneSymbol: string;
    clinvar: string;

    static displayName(variant: VariantSummaryNew) {
        return `${ variant.chr }-${ variant.start }-${ variant.ref }-${ variant.alt }`;
    }
}*/