import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { SearchBarService } from './search-bar-service';
import { VariantSummaryNew } from '../model/variant-summary-new';
import { Subject } from 'rxjs';
import { SearchQueries } from '../model/search-query';
import { VariantSearch } from '../shared/variant-search';
import { VariantSummaryRequestNew } from '../model/variant-summary-request-new';
import { Region } from '../model/region';
import { of, Observable } from "rxjs";

const DEBOUNCE_TIME = 100;

@Injectable()
export class VariantSummarySearchNewService {
    variants: VariantSummaryNew[] = [];
    results: Observable<VariantSummaryRequestNew>;
    errors = new Subject<any>();
    commenced = false;
    lastQuery: SearchQueries;
    startingRegion: Region;
    filter: any = null;
    private searchQuery = new Subject<SearchQueries>();
    private variantSearch = new VariantSearch();

    constructor(private vsal: VsalService,
                private searchBarService: SearchBarService
    ) {
        this.results = this.searchQuery
            .debounceTime(DEBOUNCE_TIME)
            .switchMap((query: SearchQueries) => {
                return this.vsal.getVariantsSummaryNew(query, this.searchBarService.getBuild()).map((vr: VariantSummaryRequestNew) => { 
                    if (this.filter) {
                        vr.variants = this.filter(vr.variants);
                    }
                    return vr;
                });
            })
            .catch(e => {
                this.errors.next(e);
                return of<VariantSummaryRequestNew>(new VariantSummaryRequestNew([], e));
            })
            .share();
        this.results.subscribe((cs) => {
            if (!this.startingRegion) {
                this.startingRegion = new Region(this.lastQuery.regions[0].chromosome, this.lastQuery.regions[0].start, this.lastQuery.regions[0].end);
            }
            this.variants = cs.variants;
            this.commenced = true;
        });
    }

    getVariants(query: SearchQueries): Promise<VariantSummaryNew[]> {
        this.lastQuery = query;
        return this.variantSearch.getVariants(query, this.results, this.errors, this.searchQuery)
    }

    getCurrentRegion = (): Region => this.variantSearch.getCurrentRegion(this.lastQuery.regions[0]);


    getSmallerRegionString= () => this.variantSearch.getSmallerRegionString(this.lastQuery.regions[0]);

    hasMoved = () => {
        return this.variantSearch.hasMoved(this.startingRegion, this.lastQuery.regions[0])
    };
}

