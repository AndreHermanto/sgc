import { VariantSummaryNew } from '../model/variant-summary-new';
import { TableSharedService } from '../shared/table-service';
import { Injectable } from "@angular/core";

@Injectable()
export class TableSummaryNewService {
    private tableService = new TableSharedService();
    showScales = true;

    private displayMap: any = {
        'Location': (v: VariantSummaryNew) => this.locationString(v),
        'Reference': (v: VariantSummaryNew) => v.ref,
        'Alternate': (v: VariantSummaryNew) => v.alt,
        'sift': (v: VariantSummaryNew) => v.sift,
        'Variant Class': (v: VariantSummaryNew) => v.variant_class,
        'Feature Type': (v: VariantSummaryNew) => v.feature_type,
        'polyPhen': (v: VariantSummaryNew) => v.polyPhen,
        'impact': (v: VariantSummaryNew) => v.impact,
        'biotype': (v: VariantSummaryNew) => v.biotype,
        'CADD Raw': (v: VariantSummaryNew) => v.cadd_raw,
        'CADD PHRED': (v: VariantSummaryNew) => v.cadd_phred,
        'clin_sig': (v: VariantSummaryNew) => v.clin_sig,
        'consequences': (v: VariantSummaryNew) => v.consequences,
        'Allele Count': (v: VariantSummaryNew) => v.ac,
        'Allele Number': (v: VariantSummaryNew) => v.an,
        'GnomadAF': (v: VariantSummaryNew) => v.gnomad_af,
        'Allele Freq': (v: VariantSummaryNew) => v.af.toExponential(4),
    };

    private searchResultKeys: any[] = [
        ['Location', true],
        ['Reference', true],
        ['Alternate', true],
        ['sift', false],
        ['Variant Class', true],
        ['Feature Type', false],
        ['polyPhen', false],
        ['impact', false],
        ['biotype', false],
        ['CADD Raw', false],
        ['CADD PHRED', false],
        ['clin_sig', false],
        ['consequences', true],
        ['Allele Count', false],
        ['Allele Number', false],
        ['GnomadAF', true],
        ['Allele Freq', true],
    ];

    private columns: Map<string, boolean> = new Map<string, boolean>(this.searchResultKeys);

    readonly sortMap: any = {
        'Location': (v: VariantSummaryNew) => v.start,
        'Reference': (v: VariantSummaryNew) => v.ref,
        'Alternate': (v: VariantSummaryNew) => v.alt,
        'sift': (v: VariantSummaryNew) => v.sift ? v.sift : '',
        'Variant Class': (v: VariantSummaryNew) => v.variant_class ? v.variant_class : '',
        'Feature Type': (v: VariantSummaryNew) => v.feature_type ? v.feature_type : '',
        'polyPhen': (v: VariantSummaryNew) => v.polyPhen ? v.polyPhen : '',
        'impact': (v: VariantSummaryNew) => v.impact ? v.impact : '',
        'biotype': (v: VariantSummaryNew) => v.biotype ? v.biotype : '',
        'CADD Raw': (v: VariantSummaryNew) => v.cadd_raw,
        'CADD PHRED': (v: VariantSummaryNew) => v.cadd_phred,
        'consequences': (v: VariantSummaryNew) => v.consequences ? v.consequences : '',
        'Allele Count': (v: VariantSummaryNew) => v.ac,
        'Allele Number': (v: VariantSummaryNew) => v.an,
        'GnomadAF': (v: VariantSummaryNew) => v.gnomad_af,
        'Allele Freq': (v: VariantSummaryNew) => v.af,
    };

    private tooltips = this.tableService.afTooltips(this.showScales);

    private lastSortedLabel = '';
    private lastSortedOrder = true;

    constructor() {

    }

    tooltip(key) {
        return this.tableService.tooltip(key, this.tooltips);
    }

    display(label: string, variant: VariantSummaryNew): string {
        return this.tableService.display(label, variant, this.displayMap);
    }

    sort(label: string, variants: VariantSummaryNew[]) {
        if (this.lastSortedLabel === label) {
            this.lastSortedOrder = !this.lastSortedOrder;
        } else {
            this.lastSortedLabel = label;
            this.lastSortedOrder = true;
        }
        const fn = this.sortMap[label];
        if (this.lastSortedOrder) {
            variants.sort((a: any, b: any) => {
                if (fn(a) < fn(b)) {
                    return -1;
                } else if (fn(a) > fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            variants.sort((a: any, b: any) => {
                if (fn(a) > fn(b)) {
                    return -1;
                } else if (fn(a) < fn(b)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
    }

    keys() {
        return this.tableService.keys(this.columns);
    }

    get(k: string) {
        return this.tableService.get(k, this.columns);
    }

    set(k: string, v: boolean) {
        this.tableService.set(k, v, this.columns);
    }

    minimalView() {
        const keys: any[] = [
            ['Location', true],
            ['Reference', true],
            ['Alternate', true],
            ['Allele Count', false],
            ['Allele Number', false],
            ['Allele Freq', false],
            ['sift', false],
            ['Variant Class', false],
            ['Feature Type', false],
            ['polyPhen', false],
            ['impact', false],
            ['biotype', false],
            ['CADD Raw', false],
            ['CADD PHRED', false],
            ['clin_sig', false],
            ['GnomadAF', false],
            ['consequences', false]
        ];
        this.columns = new Map<string, boolean>(keys);
    }

    activeColumns(): string[] {
        return this.tableService.activeColumns(this.columns);
    }

    private locationString(variant: VariantSummaryNew) {
        return `${variant.chr} : ${variant.start}`;
    }
}