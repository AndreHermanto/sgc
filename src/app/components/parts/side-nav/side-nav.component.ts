import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Auth } from '../../../services/auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SearchBarService } from '../../../services/search-bar-service';
import { Subscription } from 'rxjs/Subscription';
import { COHORT_PERMISSION_VSAL_PHENO_MAPPING, COHORT_PERMISSION_SUMMARY_MAPPING } from '../../../model/cohort-value-mapping';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
    termsDropdown = false;
    termsLinkActive = false;
    cohort = this.searchBarService.options[0].getValue();
    @Input() isMobile = false;
    cohortAccessSummary = ['Demo'];
    cohortAccessClinical = ['Demo'];

    constructor(public auth: Auth,
                private router: Router,
                public dialog: MatDialog,
                private searchBarService: SearchBarService,
                public cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.termsLinkActive = event.url.match(new RegExp(/^\/terms/, 'i'));
            });
        
        this.searchBarService.selectedCohort.subscribe(cohort => {
            this.cohort = cohort;
        })

        if(!this.auth.authenticated()){
            localStorage.removeItem('userPermissions')
        }

        this.checkPermissions();

    }

    checkPermissions(){
        if(JSON.parse(localStorage.getItem('userPermissions')) === null){
            this.cohortAccessClinical = ['Demo'];
            this.cohortAccessSummary = ['Demo'];
        }else{
            let permissions = localStorage.getItem('userPermissions');
            let cohorts = Object.keys(COHORT_PERMISSION_SUMMARY_MAPPING);
            cohorts.forEach(c => {
                if(c !== 'Demo'){
                    if(COHORT_PERMISSION_SUMMARY_MAPPING[c] === '' || permissions.includes(COHORT_PERMISSION_SUMMARY_MAPPING[c])){
                        this.cohortAccessSummary = [...this.cohortAccessSummary, c];
                    }
                    if(COHORT_PERMISSION_VSAL_PHENO_MAPPING[c] === '' || permissions.includes(COHORT_PERMISSION_VSAL_PHENO_MAPPING[c])){
                        this.cohortAccessClinical = [...this.cohortAccessClinical, c];
                    }
                }
            });
        }
        this.cd.detectChanges();
    }

    toggleTerms(event: Event) {
        event.stopPropagation();
        this.termsDropdown = this.termsDropdown ? false : true;
    }

    goToMgrbTerms(event: Event) {
        this.termsDropdown = false;
        this.router.navigate(['/terms/mgrb']);
    }

    openSignUpDialog() {
        this.dialog.open(
            SignUpComponent,
            {}
        );
    }

}
