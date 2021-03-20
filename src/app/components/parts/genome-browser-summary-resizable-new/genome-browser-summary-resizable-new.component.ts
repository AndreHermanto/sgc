import {
  Component, ElementRef, ChangeDetectorRef, AfterContentInit,
  HostListener, OnDestroy, Input
} from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { ScrollService } from '../../../services/scroll-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { ElasticGeneSearch } from '../../../services/autocomplete/elastic-gene-search-service';

@Component({
  selector: 'app-genome-browser-summary-resizable-new',
  templateUrl: './genome-browser-summary-resizable-new.component.html',
  styleUrls: ['./genome-browser-summary-resizable-new.component.css'],
})
export class GenomeBrowserSummaryResizableNewComponent implements AfterContentInit, OnDestroy {
  width: number;
  loading = true;
  error = '';
  private widths = new Subject<number>();
  private subscriptions: Subscription[] = [];

  @HostListener('window:resize') onResize() {
      this.widths.next(this.elf.nativeElement.firstChild.offsetWidth);
  }

  constructor(private elf: ElementRef,
              private scrollService: ScrollService,
              private cd: ChangeDetectorRef,
              private elastic: ElasticGeneSearch,
              private searchBarService: SearchBarService,
            ) {

  }


  initObservers() {
      this.scrollService.scrolled.subscribe(e => {
          let gb = document.getElementsByClassName('tnt_svg')[0];
          if (!gb) {
              return;
          }
          if (e) {
              document.getElementsByClassName('tnt_svg')[0].setAttribute('style', 'pointer-events: none;');
          } else {
              document.getElementsByClassName('tnt_svg')[0].setAttribute('style', 'pointer-events: auto;');
          }
      });
      this.subscriptions.push(this.widths
          .debounceTime(300)
          .distinctUntilChanged()
          .subscribe(v => {
              // TODO: destroy component programatically instead of relying on ngif
              this.width = null;
              this.cd.detectChanges();
              this.width = v;
              this.cd.detectChanges();
          }));
  }

  ngAfterContentInit() {
      this.elastic.getChromosome('1', this.searchBarService.buildOptions[0].getValue())
          .toPromise()
          .then(() => {
              this.loading = false;
          })
          .catch(() => {
              this.error = 'Our genome browser is temporarily offline';
          })
          .then(() => {
              this.loading = false;
          });
      this.initObservers();
      this.onResize();
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s.unsubscribe());
  }
}
