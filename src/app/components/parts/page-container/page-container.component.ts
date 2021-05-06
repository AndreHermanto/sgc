import { Component, HostListener, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';
import { SearchBarService } from '../../../services/search-bar-service';
import {MatSnackBar} from '@angular/material/snack-bar';

const MIN_NAV_WIDTH = 1285;
const MOBILE_WIDTH = 480;

@Component({
    selector: 'app-page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent implements OnInit {
    @Input() showTitle = true;
    @Input() showPrivacy = true;
    @Input() showBanner = false;
    title = '';
    smallTitle = '';
    showHamburger = false;
    isMobile = false;



    @HostListener('window:resize') windowResized() {
        this.showHamburger = window.innerWidth <= MIN_NAV_WIDTH;
        this.isMobile = window.innerWidth <= MOBILE_WIDTH;

        if(this.isMobile){
            this._snackBar.open("This site is not optimized for mobile. Some features might not be available", "Close", {
                duration: 2000,
            });
        }
    }

    constructor(private router: Router,
                private scrollService: ScrollService,
                public searchBarService: SearchBarService,
                public cd: ChangeDetectorRef,
                private _snackBar: MatSnackBar) {
        this.windowResized();
        this.router.events
            .filter((x, idx) => x instanceof NavigationEnd)
            .subscribe(() => {
                window.scrollTo(0, 0);
            });
    }
        
    ngOnInit() {
        
    }

    updateScroll($event: any) {
        this.scrollService.scroll($event);
    }
}
