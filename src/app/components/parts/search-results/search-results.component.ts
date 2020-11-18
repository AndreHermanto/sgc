import { Component, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { VariantSummary } from '../../../model/variant-summary';
import { MAXIMUM_NUMBER_OF_VARIANTS } from '../../../services/cttv-service';
import { VariantSummarySearchService } from '../../../services/variant-summary-search-service';
import { VariantSummaryTrackService } from '../../../services/genome-browser/variant-summary-track-service';
import { Subscription } from 'rxjs/Subscription';
import { SearchBarService } from '../../../services/search-bar-service';
import { VariantSummaryAutocompleteResult } from '../../../model/autocomplete-result';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { Auth } from '../../../services/auth-service';
import { VecticAnalyticsService } from '../../../services/analytics-service';
import { constants } from '../../../app.constants';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css'],
    providers: [VariantSummarySearchService, VariantSummaryTrackService]
})
export class SearchResultsComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() autocompleteSummary: VariantSummaryAutocompleteResult<any>;
    @Output() errorEvent = new EventEmitter();
    public variantsSummary: VariantSummary[] = [];
    public loadingVariantsSummary = false;
    private subscriptions: Subscription[] = [];
    maximumNumberOfVariants = MAXIMUM_NUMBER_OF_VARIANTS;
    selectedTabIndex = 0;
    timeout = null;
    selectedCohort = this.searchBarService.options[0].getValue();

    constructor(public searchSummaryService: VariantSummarySearchService,
                private cd: ChangeDetectorRef,
                private searchBarService: SearchBarService,
                private auth: Auth,
                private router: Router,
                private route: ActivatedRoute,
                private clinicalFilteringService: ClinicalFilteringService,
                public vas: VecticAnalyticsService
            ) {
    }

    ngOnInit(): void {
        this.variantsSummary = this.searchSummaryService.variants;

        this.loadingVariantsSummary = true;
        let permissions = localStorage.getItem("userPermissions") ? JSON.parse(localStorage.getItem("userPermissions")) : [];
        if(
            this.auth.checkPermissions(this.selectedCohort, permissions)
        ){
            this.subscriptions.push(this.searchSummaryService.results.subscribe(v => {
                this.variantsSummary = v.variants;

                if(this.selectedCohort !== 'Demo'){
                    this.vas.addSearchQueries(this.searchBarService.query,'', '', this.selectedCohort, 'summary').subscribe((res) => {
                        return res;
                    })

                    this.auth.userProfile.subscribe(user => {
                        this.vas.addUserQuery(user.email, this.selectedCohort, 'summary').subscribe((res) => {
                            return res;
                        })
                    })
                }
                this.cd.detectChanges();
            }));
    
            this.autocompleteSummary.searchSummary(this.searchSummaryService, this.searchBarService.options)
                .then(() => {
                    this.loadingVariantsSummary = false;
                    this.cd.detectChanges();
                })
                .catch((e) => {
                    this.loadingVariantsSummary = false;
                    this.errorEvent.emit(e);
                });
        }else{
            if(permissions){
                this.errorEvent.emit(constants.PERMISSION_ERROR_MESSAGE)
                this.loadingVariantsSummary = false;
            }
        }



        
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    showGeneInformation() {
        return !this.searchSummaryService.hasMoved() && this.autocompleteSummary.result instanceof Gene;
    }

    showRegionInformation() {
        return this.searchSummaryService.hasMoved() || this.autocompleteSummary.result instanceof Region;
    }

    goToSmallerRegion() {
        const obj = {query: this.searchSummaryService.getSmallerRegionString(), timestamp: Date.now()};
        this.router.navigate(['/search/results', obj]);
    }
}
