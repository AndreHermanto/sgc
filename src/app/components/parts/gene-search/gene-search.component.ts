import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import { SearchBarService, QUERY_LIST_ERROR } from '../../../services/search-bar-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';
import { Term } from '../../../model/term';
import {COHORT_PERMISSION_VSAL_PHENO_MAPPING} from '../../../model/cohort-value-mapping'
import { Auth } from '../../../services/auth-service';
import { ClinapiService } from '../../../services/clinapi.service';
import { VariantSearchService } from '../../../services/variant-search-service';

@Component({
    selector: 'app-gene-search',
    templateUrl: './gene-search.component.html',
    styleUrls: ['./gene-search.component.css'],
    providers: [ClinapiService, VariantSearchService]
})
export class GeneSearchComponent implements AfterViewInit, OnInit, OnDestroy {
    @Input() autocomplete: GenericAutocompleteResult<any>[];
    visible = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    private subscription: Subscription[] = [];
    queries: Term[] = [];
    permitted: boolean = false;
    selectedCohort: string;
    COHORT_PERMISSION_VSAL_PHENO_MAPPING = COHORT_PERMISSION_VSAL_PHENO_MAPPING;


    constructor(public router: Router,
                public clinicalFilteringService: ClinicalFilteringService,
                public searchBarService: SearchBarService,
                private route: ActivatedRoute,
                private auth: Auth,
                private cs: ClinapiService ) {
    }

    ngOnInit(): void {
      this.searchBarService.autocompleteError = '';
      this.subscription.push(this.route.params.subscribe(p => {
        if (p['query']) {
          const promiseQueries= this.searchBarService.query.split(',').map(q => {
            return this.searchBarService.verifyQuery(q).then(flag => {
              if(flag){
                return new Term(q, true)
              }else{
                return new Term(q, false);
              }
            })       
          })

          Promise.all(promiseQueries).then(results => {
            this.queries = results;
            let error: boolean = false
            this.queries.forEach(q => {
              if(!q.verified){
                error = true;
              }
            })
            if(error){
              this.searchBarService.autocompleteError = QUERY_LIST_ERROR;
            }
          })
        }
        if(p['panelGroup']){
          this.searchBarService.panelGroup = p['panelGroup'];
        }
        if(p['panel']){
          this.searchBarService.panel = p['panel'];
        }
        if(p['ref']){
          this.searchBarService.refInput = p['ref'];
        }
        if(p['alt']){
          this.searchBarService.altInput = p['alt'];
        }
        if(p['het'] === 'false'){
          this.searchBarService.hetInput = false;
        }
        if(p['hom'] === 'false'){
          this.searchBarService.homInput = false;
        }
        if(p['conj'] === 'true'){
          this.searchBarService.conj = true;
        }
        if(p['conjSamples'] === 'true'){
          this.searchBarService.conjSamples = true;
        }

      }));

      this.subscription.push(this.searchBarService.selectedCohort.subscribe(cohort => {
        this.selectedCohort = cohort;
        if(COHORT_PERMISSION_VSAL_PHENO_MAPPING[cohort] === '' && this.searchBarService.panelGroup === 'agha'){
          this.searchBarService.panelGroup = '';
          this.searchBarService.panel = '';
        }
      }))

          this.auth.getUserPermissions().subscribe(permissions => {
            let allCohorts = Object.keys(COHORT_PERMISSION_VSAL_PHENO_MAPPING);
            this.permitted = false;
            allCohorts.forEach(c => {
              if(c!== 'Demo' && permissions.includes(COHORT_PERMISSION_VSAL_PHENO_MAPPING[c])){
                this.permitted = true
              }
            })           
          })
    }

    ngAfterViewInit(): void {
      
    }

    addGene = (query) =>  {
      if(this.queries.indexOf(query) === -1){
        this.queries.push(new Term(query.toUpperCase(), true));
      }
    }

    search() {
      let error: boolean = false
      this.queries.forEach(q => {
        if(!q.verified){
          error = true;
        }
      })

      if(this.searchBarService.refInput !== '' && this.searchBarService.altInput !== '' && this.searchBarService.refInput.toUpperCase() === this.searchBarService.altInput.toUpperCase()){
        error = true;
      }

      if(this.checkErrorRefAlt(this.searchBarService.refInput) || this.checkErrorRefAlt(this.searchBarService.altInput)){
        error = true;
      }

      if(!error&&(this.queries.length || this.searchBarService.panel)){
        this.searchBarService.autocompleteError = '';
        this.searchBarService.query = this.queries.map(query => query.term).join();
        const cohort = this.searchBarService.options[0].getValue();
        const obj = {query: this.searchBarService.query, cohort: cohort, panelGroup: this.searchBarService.panelGroup, panel:this.searchBarService.panel, ref:this.searchBarService.refInput, alt: this.searchBarService.altInput, het: this.searchBarService.hetInput, hom: this.searchBarService.homInput, conj: this.searchBarService.conj, conjSamples: this.searchBarService.conjSamples, timestamp: Date.now()};
        this.clinicalFilteringService.clearFilters();
        this.router.navigate(['/clinical/results', obj]);
      }else{
        this.searchBarService.autocompleteError = QUERY_LIST_ERROR;
      }  

    }

    searchExample(query) {
      this.searchBarService.autocompleteError = '';
      this.searchBarService.query = query;
      const cohort = this.searchBarService.options[0].getValue();
      this.searchBarService.panel = "";
      this.searchBarService.panelGroup = '';
      this.searchBarService.refInput = '';
      this.searchBarService.altInput = '';
      this.searchBarService.hetInput = true;
      this.searchBarService.homInput = true;
      this.searchBarService.conj = false;
      this.searchBarService.setGeneList("");
      const obj = {query: this.searchBarService.query, cohort: cohort, panel:"",ref:"", alt:'', het: 'true', hom: 'true', conj:'false', conjSamples: 'false', timestamp: Date.now()};
      this.clinicalFilteringService.clearFilters();
      this.router.navigate(['/clinical/results', obj]);
 
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      const terms = this.queries.map(query => query.term);
      if ((value || '').trim()) {
        if(terms.indexOf(value) === -1){
          if(this.queries.map(q => q.term).indexOf(value.toUpperCase()) === -1){
            this.searchBarService.verifyQuery(value.toUpperCase()).then(flag => {
                if(flag){
                  this.queries.push(new Term(value.toUpperCase(), true));
                }else{
                  this.queries.push(new Term(value.toUpperCase(), false));
                }
              });      
          }
        }
      }

      if (input) {
        input.value = '';
      }
    }
  
    remove(query: string): void {
      const index = this.queries.map(query => query.term).indexOf(query);
  
      if (index >= 0) {
        this.queries.splice(index, 1);
      }
    }

    paste(event: ClipboardEvent): void {
      event.preventDefault();
      event.clipboardData
      .getData('Text')
      .split(/;|,|\n/)
      .forEach(value => {
        if(value.trim()){
          if(this.queries.map(q => q.term).indexOf(value.toUpperCase()) === -1){
            this.searchBarService.verifyQuery(value.trim().toUpperCase()).then(flag => {
              if(flag){
                this.queries.push(new Term(value.trim().toUpperCase(), true));
              }else{
                this.queries.push(new Term(value.trim().toUpperCase(), false));
              }
            });  
          }
        }
      })
    }

    onChange(event) {
      this.searchBarService.panelGroup = event.value;
      this.searchBarService.panel = '';
      this.searchBarService.setGeneList('');
    }

    clearFilter() {
      this.queries = [];
      this.searchBarService.query = '';
      this.searchBarService.panel = '';
      this.searchBarService.panelGroup ='';
      this.searchBarService.setGeneList('');
    }

    checkErrorRefAlt(input){
      var error = true;
      if(input !== ''){
        error = /^[actg]+$/i.test(input)
      }
      return !error;
    }

    ngOnDestroy() {
      this.subscription.forEach(s => {s.unsubscribe()});
    }

}
