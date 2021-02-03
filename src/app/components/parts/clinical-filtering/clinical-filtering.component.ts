import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Variant } from '../../../model/variant';
import { MAXIMUM_NUMBER_OF_VARIANTS } from '../../../services/cttv-service';

import { VariantSearchService } from '../../../services/variant-search-service';
import { VsalService } from '../../../services/vsal-service';

import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';
import { RegionService } from '../../../services/autocomplete/region-service';
import { VariantAutocompleteResult } from '../../../model/autocomplete-result';
import { SearchQueries } from '../../../model/search-query';
import { SampleRequest } from '../../../model/sample-request';
import { Region, GeneDetails } from '../../../model/region';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Auth } from '../../../services/auth-service';
import { ClinapiService } from '../../../services/clinapi.service';
import { VecticAnalyticsService } from '../../../services/analytics-service';
import {COHORT_PERMISSION_VSAL_PHENO_MAPPING, COHORT_PHENO_GET_MAPPING, COHORT_FAMILY_WITH_PHENO, COHORT_PERMISSION_UNCONSENTED_SAMPLES} from '../../../model/cohort-value-mapping';
import { of, Observable, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-clinical-filtering',
    templateUrl: './clinical-filtering.component.html',
    styleUrls: ['./clinical-filtering.component.css'],
    providers: [VariantSearchService, ClinapiService]
})
export class ClinicalFilteringComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() autocomplete: VariantAutocompleteResult<any>[];
    @Output() errorEvent = new EventEmitter();
    private geneFilter = [];
    public variants: Variant[] = [];
    public ids: string[] = [];
    public loadingVariants = false;
    private subscriptions: Subscription[] = [];
    maximumNumberOfVariants = MAXIMUM_NUMBER_OF_VARIANTS;
    timeout = null;
    selectedCohort = this.searchBarService.options[0].getValue();
    pheno: any;
    denied = false;
    error = false;
    mappingSamples = [];
    mappingSamplesOnlyToAvailableFamily = [];
    searchQueries : SearchQueries;
    unconsentedAccess = false;


    constructor(public searchService: VariantSearchService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private router: Router,
                private route: ActivatedRoute,
                private clinicalFilteringService: ClinicalFilteringService,
                private auth: Auth,
                public cs: ClinapiService,
                public rs: RegionService,
                public vas: VecticAnalyticsService,
                public vsal: VsalService
            ) {
    }

    ngOnInit(): void {
        this.variants = this.searchService.variants;

        this.subscriptions.push(this.searchService.results.subscribe(v => {
            this.variants = v.variants;
            this.cd.detectChanges();
        }));

        this.subscriptions.push(this.searchService.errors.subscribe((e) => {
            this.errorEvent.emit(e);
        }));

        this.loadingVariants = true;

        const allQueries = this.autocomplete.map(ac => ac.getRegion())

        Promise.all(allQueries).then((regions: Region[]) => {
                let permissions = localStorage.getItem('userPermissions') ? JSON.parse(localStorage.getItem('userPermissions')) : [];
                let permitted = false;
                if(permissions.includes(COHORT_PERMISSION_VSAL_PHENO_MAPPING[this.selectedCohort]) || COHORT_PERMISSION_VSAL_PHENO_MAPPING[this.selectedCohort] === ''){
                    permitted = true;
                }else{
                    permitted = false;
                }

                if(permissions.includes(COHORT_PERMISSION_UNCONSENTED_SAMPLES[this.selectedCohort]) || COHORT_PERMISSION_UNCONSENTED_SAMPLES[this.selectedCohort] === ''){
                    this.unconsentedAccess = true;
                }else{
                    this.unconsentedAccess = false;
                }

                let regionsWithGenes = forkJoin(regions.map(region => {
                    if(region.genes.length === 0){
                        return this.rs.getGenesInRegion(region).pipe(map(genes => new Region(region.chromosome, region.start, region.end, genes.map(gene => {
                           return new GeneDetails(region.chromosome, gene.start, gene.end, gene.symbol);
                        }))
                    ),catchError(error => {
                        this.loadingVariants = false;
                        this.errorEvent.emit("Failed to connect to Ensembl service. Please try again later."); 
                        return of(error);      
                    }));
                    }else{
                        return of(region)
                    }
                }))
    
                regionsWithGenes.subscribe(genesregion => {
                    this.searchQueries = new SearchQueries(genesregion, this.searchBarService.options)

                    this.cs[COHORT_PHENO_GET_MAPPING[this.selectedCohort]](false,permitted).subscribe(pheno => {
                        this.pheno = pheno;

                        if(this.pheno[0]['Consent for future research']){
                            if(this.unconsentedAccess === false){
                                this.pheno = this.pheno.filter(samples => samples['Consent for future research'].trim().toLowerCase() === 'yes')
                            }
                        }

                        let familyIDsCount = {}
                        if(COHORT_FAMILY_WITH_PHENO[this.selectedCohort]){
                            this.pheno.forEach(sample => {
                                if(familyIDsCount[sample.familyId]){
                                    familyIDsCount[sample.familyId] = familyIDsCount[sample.familyId] + 1;
                                }else{
                                    familyIDsCount[sample.familyId] = 1; 
                                }
                            })

                           this.pheno = this.pheno.map(sample => {
                                switch(familyIDsCount[sample.familyId]){
                                    case 1:
                                        sample['familyData'] = 'Singleton';
                                        break;
                                    case 2:
                                        sample['familyData'] = 'Duo';
                                        break;
                                    case 3:
                                        sample['familyData'] = 'Trio'
                                        break;
                                    case 4:
                                        sample['familyData'] = 'Quartet'
                                        break;
                                    case 5:
                                    case 6:
                                    case 7:
                                    case 8:
                                    case 9:
                                    case 10:
                                        sample['familyData'] = '5+ Family'
                                        break;
                                    default: 
                                        sample['familyData'] = 'No family data'
                                        break;

                                }
                                return sample;
                           })
                        }
                        if(this.searchBarService.conjSamples){
                            let queries = this.searchQueries.regions.map(q => {
                                let sq = new SearchQueries([q], this.searchQueries.options)
                                return this.vsal.getSamples(sq, this.searchBarService.refInput, this.searchBarService.altInput, this.searchBarService.hetInput, this.searchBarService.homInput).map((sr: SampleRequest) => {
                                    return sr;
                                })
                            })

                            return forkJoin(queries).subscribe(s => {
                                let samplesIntersection = _.intersection.apply(_, s.map(sample => sample.samples));
                                let error = {flag: false, e: null};

                                s.forEach(sample => {
                                    if(sample.error && !error){
                                        error.flag = true;
                                        error.e = sample.error;
                                    }
                                })
                                if(error.flag){
                                    this.loadingVariants = false;
                                    this.errorEvent.emit(error.e);
                                }else{
                                    this.getVariantsFromSamples(samplesIntersection);
                                }

                            }, e => {
                                this.loadingVariants = false;
                                this.errorEvent.emit(e);
                            })
                        }else{
                            return this.vsal.getSamples(this.searchQueries, this.searchBarService.refInput, this.searchBarService.altInput, this.searchBarService.hetInput, this.searchBarService.homInput).subscribe((result) => {
                                if(result.error){
                                    this.loadingVariants = false;
                                    this.errorEvent.emit(result.error);
                                }else{
                                    this.getVariantsFromSamples(result.samples);
                                }
                            },(e) => {
                                this.loadingVariants = false;
                                this.errorEvent.emit(e);
                            });
                        }
                    },
                    e => {
                        this.loadingVariants = false;
                        if (e.status && e.status === 401) {
                            this.denied = true;
                        } else {
                            this.error = e;
                        }
                        this.cd.detectChanges();
                    })
                })
            
        })
    }

    getVariantsFromSamples(result){
        this.ids = result;
        const list_pheno_ids = this.pheno.map(sample => sample.internalIDs)
        this.mappingSamples = result.filter(r => {
            return list_pheno_ids.includes(r);
        })
        const list_pheno_ids_have_family = this.pheno.filter(sample => sample.familyId).map(sample => sample.internalIDs);
        this.mappingSamplesOnlyToAvailableFamily = result.filter(r => {
            return list_pheno_ids_have_family.includes(r);
        })
        
        return this.searchService.getVariants(this.searchQueries, this.mappingSamples.join(), false, this.searchBarService.refInput, this.searchBarService.altInput, this.searchBarService.hetInput, this.searchBarService.homInput, this.searchBarService.conj)
        .then(() => {
            if(this.selectedCohort !== 'Demo'){
                this.auth.userProfile.subscribe(user => {
                    this.vas.addUserQuery(user.email, this.selectedCohort, 'clinical').subscribe((res) => {
                        return res;
                    })

                    if(this.searchBarService.query){
                        const terms = this.searchBarService.query.split(',');
                        terms.forEach(t => {
                            if(!this.searchBarService.isRegion(t) && !this.searchBarService.isCoord(t)){
                                this.vas.addSearchQueries(t,'', '', this.selectedCohort, 'clinical', user.email).subscribe((res) => {
                                    return res;
                                })
                            }
                        })
                    }
                    if(this.searchBarService.panel && this.searchBarService.panelGroup){
                        this.vas.addSearchQueries('', this.searchBarService.panelGroup, this.searchBarService.panel, this.selectedCohort, 'clinical', user.email).subscribe((res) => {
                            return res;
                        })
                    }

                })
            }
        
            this.loadingVariants = false;
            this.cd.detectChanges();
        })
        .catch((e) => {
            this.loadingVariants = false;
            this.errorEvent.emit(e);
        });
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    goToSmallerRegion() {
        const obj = {query: this.searchService.getSmallerRegionString(), timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }
}
