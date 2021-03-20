import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MapdService } from '../../../services/mapd.service';
import { CrossfilterService } from '../../../services/crossfilter.service';
import { SearchBarService } from '../../../services/search-bar-service';
import { VariantSummaryNew } from '../../../model/variant-summary-new';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import {COHORT_PERMISSION_VSAL_PHENO_MAPPING} from '../../../model/cohort-value-mapping';

@Component({
    selector: 'app-variants-table-paginated-new',
    templateUrl: './variants-table-paginated-new.component.html',
    styleUrls: ['./variants-table-paginated-new.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantsTablePaginatedNewComponent implements OnInit, OnDestroy {
    variants = [];
    error = '';
    loading = true;
    subscriptions: Subscription[] = [];
    limit = 100;
    offset = 0;
    @Input() cohort: string;
    selectedCohort: string;
    cohortAccessClinical = ['Demo'];

    constructor(private mapd: MapdService,
                private cf: CrossfilterService,
                private cd: ChangeDetectorRef,
                private router: Router,
                private searchBarService: SearchBarService) {
        // let cols = this.cf.x.getColumns();
        // for (let k of Object.keys(cols)) {
        //     let c = {name: cols[k].column, prop: cols[k].column};
        //     this.columns.push(c);
        // }
    }

    ngOnInit() {
        this.getServerResult();
        this.subscriptions.push(this.cf.updates.debounceTime(500).subscribe(() => {
            this.offset = 0;
            this.getServerResult();
        }));

        this.subscriptions.push(this.searchBarService.selectedCohort.subscribe((cohort) => {
            this.selectedCohort = cohort;
        }));

        let permissions = localStorage.getItem('userPermissions');
        let cohorts = Object.keys(COHORT_PERMISSION_VSAL_PHENO_MAPPING);
            cohorts.forEach(c => {
                if(c !== 'Demo'){
                    if(permissions.includes(COHORT_PERMISSION_VSAL_PHENO_MAPPING[c])){
                        this.cohortAccessClinical = [...this.cohortAccessClinical, c];
                    }
                }
            });
    }

    getServerResult() {
        this.loading = true;
        this.cd.detectChanges();
        const fs = this.cf.getFilterString();
        this.mapd.session.query(`SELECT CHROMOSOME, c3_START, c4_REF, alt, variant_class, AF, consequences FROM ${this.cohort} ${fs} LIMIT ${this.limit}`,
            {},
            (error, data) => {
                if (error) {
                    this.error = error;
                    return;
                }
                data.map((v) => {
                    v.VARIANT = `${ v.CHROMOSOME }:${ v.c3_START }:${ v.c4_REF }:${ v.alt }`
                    return v;
                });
                this.variants = data;
                this.loading = false;
                if (!this.cd['destroyed']) {
                    this.cd.detectChanges();
                }
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    variantVarsomeUrl(v: string) {
        let varName = v.replace(/:/g, '-').toString();
        return `https://varsome.com/variant/hg38/${varName}`;
    }

    variantUrl(v: string) {
        return this.router.createUrlTree(['/search/variant-summary38', {query: v.replace(/:/g, '-'), cohort: this.selectedCohort}]).toString();
    }

    onChange(event: any): void {
        this.offset = event.offset;
    }

    rsidUrl(v: string) {
        return `https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=${v}`;
    }

    searchCLinical(variant){
        if(this.cohortAccessClinical.includes(this.selectedCohort)){
            let query = variant.split(':');
            const obj = {query: `${query[0]}:${query[1]}`, cohort: this.selectedCohort, panel:"",ref:query[2], alt:query[3], het: 'true', hom: 'true', conj:'false', conjSamples: 'false', timestamp: Date.now()};
            this.router.navigate(['/clinical/results', obj]);
        }
    }

    downloadFile() {
        const data = this.variants.map((v: any) => {
            let variant = v.VARIANT.split(':');
            return {
                'Position': `${variant[0]}:${variant[1]}`,
                'Ref': variant[2],
                'Alt': variant[3],
                'Type': v.variant_class,
                'AF': v.AF,
                'consequences': v.consequences
            };
        });
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], {type: 'text/plain'});
        saveAs(blob, 'data_' + this.cf.getFilterString().replace(' ', '_') + '_' + new Date().getTime() + '.csv');
    }

}
