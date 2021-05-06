import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { VariantSummarySearchNewService } from '../../../services/variant-summary-search-new-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { SearchQueries } from '../../../model/search-query';
import { VariantSummaryNew } from '../../../model/variant-summary-new';
import { BeaconCache, BeaconSearchService } from '../../../services/beacon/beacon-search-service';
import { Gene } from '../../../model/gene';
import { RegionService } from '../../../services/autocomplete/region-service';
import { Region } from '../../../model/region';
import { SearchOption } from '../../../model/search-option';
import { Auth } from '../../../services/auth-service';
import { COHORT_VALUE_MAPPING_SSVS } from '../../../model/cohort-value-mapping';

@Component({
    selector: 'app-variant-summary-new',
    templateUrl: './variant-summary-new.component.html',
    styleUrls: ['./variant-summary-new.component.css', '../../../shared/meta-information.css'],
    providers: [VariantSummarySearchNewService, BeaconSearchService]
})
export class VariantSummaryNewComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    variant: VariantSummaryNew;
    beacons: BeaconCache;
    gene: Gene;
    showBeacon = false;
    error = '';
    beaconError = '';
    loading = true;
    beaconSupported = true;
    displayName = VariantSummaryNew.displayName;
    cohort= '';

    constructor(private route: ActivatedRoute,
                private vss: VariantSummarySearchNewService,
                private bss: BeaconSearchService,
                private rs: RegionService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private auth: Auth) {
    }

    ngOnInit() {
        this.searchBarService.setBuild('GRCh38');
        this.searchBarService.buildOptions[0].setValue('GRCh38')
        if (!this.auth.authenticated()) {
            this.auth.login();
        } else {
            this.subscriptions.push(this.bss.errors.subscribe((e: any) => {
                this.beaconError = e.message ? e.message : e;
            }));
            this.subscriptions.push(this.route.params.subscribe(p => this.parseParams(p)));
        }
    }

    parseParams(params: Params) {
        try {
            this.cohort = params['cohort'];
            const r = /([\dxymt]*)-(\d*)-([AGTC\*]*)-([AGTC\*]*)+/ig;
            const m = r.exec(params['query']);
            const chromo = m[1];
            const start = Number(m[2]);
            const reference = m[3];
            const alternate = m[4];
            let searchOption = [new SearchOption('', 'returnAnnotations', [], 'true')];
            if(COHORT_VALUE_MAPPING_SSVS[this.cohort]){
                searchOption = [new SearchOption('', 'dataset', [], this.cohort), new SearchOption('', 'returnAnnotations', [], 'true')];
            }
            const sq = new SearchQueries([new Region (chromo, start, start)], searchOption);


            this.getVariant(sq, reference, alternate);
        } catch (e) {
            this.error = 'Could not find specified variant';
            this.loading = false;
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    beaconQuery(v: VariantSummaryNew) {
        return `${ v.chr }:${ v.start }>${v.alt}`;
    }

    toggleBeacon() {
        this.showBeacon = !this.showBeacon;
    }

    private getVariant(sq: SearchQueries, reference: string, alternate: string) {
        this.vss.getVariants(sq).then(variants => {
            this.loading = false;
            const vf = variants.filter((v) => v.alt === alternate && v.ref === reference);
            if (vf.length > 1) {
                this.error = 'Found more than one variant for query';
            } else if (vf.length > 0) {
                this.variant = vf[0];
                if (this.variant.variant_class !== 'SNV' && this.variant.variant_class !== 'SNP') {
                    this.beaconSupported = false;
                } else {
                    this.beacons = this.bss.searchBeacon(this.beaconQuery(this.variant));
                    this.subscriptions.push(this.beacons.results.debounceTime(500).subscribe(() => {
                        this.cd.detectChanges();
                    }));
                }

                const r = new Region(this.variant.chr, this.variant.start, this.variant.start);
                this.rs.getGenesInRegion(r).subscribe((g) => {
                    if (g.length > 0) {
                        this.gene = g[0];
                    }
                }, (e) => {});
            } else {
                this.error = 'Found no variants for query';
            }
            this.cd.detectChanges();
        });
    }
}
