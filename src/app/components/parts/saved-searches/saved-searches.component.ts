import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ClinicalFilteringService } from '../../../services/clinical-filtering.service';
import { SearchBarService } from '../../../services/search-bar-service';
import * as dc from 'dc';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Auth } from '../../../services/auth-service';
import { Router } from '@angular/router'; 
import {COHORT_PERMISSION_VSAL_PHENO_MAPPING} from '../../../model/cohort-value-mapping'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.css']
})
export class SavedSearchesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  filters = {};
  savedSearches = {};
  selectedCohort = this.searchBarService.options[0].getValue();
  objectKeys= Object.keys;
  @ViewChild("saveSearchForm") saveSearchForm: NgForm;
  selectedSaveSearch: string;
  denied: boolean;

  constructor(private clinicalFilteringService: ClinicalFilteringService, private auth: Auth, private searchBarService: SearchBarService, private router: Router) { }

  saveNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {

    this.subscriptions.push(this.clinicalFilteringService.filters.subscribe(filter => {
        this.filters = filter
    }))

    this.subscriptions.push(this.clinicalFilteringService.savedSearches.subscribe(savedSearches => {
        this.savedSearches = savedSearches
    },
    error => {
        this.router.navigate(['/error']);
    }))

    this.auth.getUserPermissions().subscribe(permissions => {
        const selectedCohort = this.searchBarService.options[0].getValue();
        if(permissions.includes(COHORT_PERMISSION_VSAL_PHENO_MAPPING[selectedCohort])){
            this.denied = false;
        }else {
            this.denied = true;
        }
    }) 

  }

  ngOnDestroy() {
    this.subscriptions.forEach((s => s.unsubscribe()));
  }

  deleteFilter(name: string){
      return this.clinicalFilteringService.deleteFilter(name);
  }

  saveSearches(){
      return this.clinicalFilteringService.saveSearches(this.selectedCohort, this.saveNameFormControl.value);
  }

  applySavedSearches(savedFilterName){
      return this.clinicalFilteringService.applySavedSearches(this.selectedCohort, savedFilterName)
  }

  deleteSavedSearches(savedFilterName){
    this.selectedSaveSearch = null;
    return this.clinicalFilteringService.deleteSaveSearches(this.selectedCohort, savedFilterName)
}

}
