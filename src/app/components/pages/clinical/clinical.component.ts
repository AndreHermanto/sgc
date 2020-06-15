import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs/Subscription';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from '../../../services/search-bar-service';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SnackbarDemoComponent } from '../../parts/snackbar-demo/snackbar-demo.component';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';

const SMALL_WIDTH = 720;

@Component({
  selector: 'app-clinical',
  templateUrl: './clinical.component.html',
  styleUrls: ['./clinical.component.css'],
})
export class ClinicalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  sbSub: Subscription = null;
  autocomplete: GenericAutocompleteResult<any>[];
  error = '';
  searching = false;
  loadingParseParams: boolean = false;
  sb: MatSnackBarRef<SnackbarDemoComponent> = null;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH}px)`);
  selectedOption: string;

  constructor(public searchBarService: SearchBarService,
              public auth: Auth,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              public snackBar: MatSnackBar,
              private router: Router,
              private clinicalFilteringService: ClinicalFilteringService
          ) {
      if (auth.authenticated()) {
          this.subscriptions.push(route.params.subscribe(p => this.parseParams(p)));
      }
  }
  ngOnInit(): void {
      this.selectedOption = this.searchBarService.options[0].getValue();

      this.subscriptions.push(this.auth.getSavedSearches().subscribe(savedSearches => {
          this.clinicalFilteringService.initSaveSearches(savedSearches);
      }))
      }

  parseParams(params: Params) {
      if (!params['query'] && !params['cohort'] && !params['panel']) {
        this.searchBarService.query = '';
        this.searchBarService.panel = '';
        this.searchBarService.panelGroup ='';
        this.searchBarService.setGeneList('');
        this.searchBarService.altInput = '';
        this.searchBarService.refInput = '';
          return;
      }else{
        this.loadingParseParams = true;
      }
      this.error = '';
      this.autocomplete = null;
      this.searching = true;
      this.searchBarService.setCohort(params['cohort']);
      this.searchBarService.searchWithMultipleParams(params).then((v) => {
        this.autocomplete = v;
        this.loadingParseParams = false;
        this.cd.detectChanges();
      }).catch(() => {
      });
  }

  ngOnDestroy() {
      this.subscriptions.forEach((s => s.unsubscribe()));
      this.clinicalFilteringService.clearFilters();
      this.dismissSnackBar();
  }

  handleError(e: string) {
      this.error = e;
  }

  isSmallScreen(): boolean {
      return this.mediaMatcher.matches;
  }

  private dismissSnackBar() {
      if (this.sb) {
          this.sbSub.unsubscribe();
          this.sbSub = null;
          this.sb.dismiss();
          this.sb = null;
      }
  }

}
