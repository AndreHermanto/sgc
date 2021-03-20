import { VariantSummaryNew } from './variant-summary-new';

export class VariantSummaryRequestNew {
    constructor(public variants: VariantSummaryNew[], public error: string = '', public total: number = null) {}
}