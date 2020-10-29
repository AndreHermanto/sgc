import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from '../../../services/search-bar-service';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';
import { SnackbarDemoComponent } from '../../parts/snackbar-demo/snackbar-demo.component';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';

const SMALL_WIDTH = 720;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements  OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    sbSub: Subscription = null;
    autocomplete: GenericAutocompleteResult<any>;
    error = '';
    searching = false;
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH}px)`);
    selectedOption: string = this.searchBarService.options[0].getValue();
    authors = [];

    constructor(public searchBarService: SearchBarService,
                public auth: Auth,
                private route: ActivatedRoute,
                private cd: ChangeDetectorRef,
                private router: Router,
                private clinicalFilteringService: ClinicalFilteringService
            ) {
        if (auth.authenticated()) {
            this.subscriptions.push(route.params.subscribe(p => this.parseParams(p)));
        }
    }
    ngOnInit(): void {

        this.auth.userSavedSearches.subscribe(savedSearches => {
            this.clinicalFilteringService.initSaveSearches(savedSearches);
        })
        this.searchBarService.query ="";
        }

    parseParams(params: Params) {
        if (!params['query'] && !params['cohort']) {
            return;
        }
        this.searchBarService.setCohort(params['cohort']);
        this.error = '';
        this.autocomplete = null;
        this.searching = true;
        this.searchBarService.searchWithParams(params).then((v) => {
            this.autocomplete = v;
            this.cd.detectChanges();
        }).catch(() => {
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s => s.unsubscribe()));
        this.clinicalFilteringService.clearFilters();
    }

    handleError(e: string) {
        this.error = e;
    }

    isSmallScreen(): boolean {
        return this.mediaMatcher.matches;
    }
}