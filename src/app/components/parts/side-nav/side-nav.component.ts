import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Auth } from '../../../services/auth-service';
import { Router, NavigationEnd } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SearchBarService } from '../../../services/search-bar-service';

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

    constructor(public auth: Auth,
                private router: Router,
                public dialog: MatDialog,
                private searchBarService: SearchBarService) {
    }

    ngOnInit() {
        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe((event: any) => {
                this.termsLinkActive = event.url.match(new RegExp(/^\/terms/, 'i'));
            });
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
