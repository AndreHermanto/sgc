import {
  Component, OnInit, Input, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit,
} from '@angular/core';
import { VariantSummaryNew } from '../../../model/variant-summary-new';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { VariantSummaryTrackNewService } from '../../../services/genome-browser/variant-summary-track-new-service';
import { SearchBarService } from '../../../services/search-bar-service';
import * as Papa from 'papaparse';
import { VariantSummarySearchNewService } from '../../../services/variant-summary-search-new-service';
import { TableSummaryNewService } from '../../../services/table-summary-new-service';
import { FilterAutoSummaryNewComponent } from '../filter-auto-summary-new/filter-auto-summary-new.component';
import { ALLELEFREQ_DIFFERENCE_THRESHOLD } from '../../../shared/afThreshold';

const MINIMAL_VIEW = 500;

@Component({
  selector: 'app-variants-summary-table-new',
  templateUrl: './variants-summary-table-new.component.html',
  styleUrls: ['./variants-summary-table-new.component.css', '../../../shared/table-results.css']
})
export class VariantsSummaryTableNewComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() variants: VariantSummaryNew[];
  @ViewChild(FilterAutoSummaryNewComponent, {static: false}) filterComponent: FilterAutoSummaryNewComponent;
  pageSize = 10;
  currentPage = 1;
  showSettings = true;
  private highlightedVariant: VariantSummaryNew;
  private subscriptions: Subscription[] = [];

  constructor(public  ts: TableSummaryNewService,
              private searchService: VariantSummarySearchNewService,
              private variantTrack: VariantSummaryTrackNewService,
              private cd: ChangeDetectorRef,
              private router: Router,
              private searchBarService: SearchBarService,) {
  }

  ngOnInit() {
      if (window.screen.width < MINIMAL_VIEW) {
          this.ts.minimalView();
          this.showSettings = false;
      }

      this.subscriptions.push(this.variantTrack.highlightedVariant.subscribe((v: VariantSummaryNew) => {
          if (v.highlight) {
              this.highlightedVariant = v;
          } else {
              this.highlightedVariant = null;
          }
          this.cd.detectChanges();
      }));

      this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((variant: VariantSummaryNew) => {
          const index = this.variants.findIndex((v => this.compare(v, variant)));
          this.currentPage = Math.ceil((index + 1) / this.pageSize);
          this.cd.detectChanges();
      }));

      this.subscriptions.push(this.variantTrack.clickedVariant.subscribe((variant: VariantSummaryNew) => {
          const index = this.variants.findIndex((v => this.compare(v, variant)));
          this.currentPage = Math.ceil((index + 1) / this.pageSize);
          this.cd.detectChanges();
      }));

  }

  ngAfterViewInit() {
      this.subscriptions.push(this.searchService.results.subscribe(() => {
          this.currentPage = 0;
          this.filterComponent.reset(this.variants);
          this.cd.detectChanges();
      }));
  }

  highlightVariant(variant: VariantSummaryNew) {
      variant.highlight = true;
      this.variantTrack.highlightedVariant.next(variant);
  }

  unHighlightVariant(variant: VariantSummaryNew) {
      variant.highlight = false;
      this.variantTrack.highlightedVariant.next(variant);
  }

  sortVariants(label: string) {
      this.ts.sort(label, this.variants);
  }

  downloadFile() {
      const data = this.variants.map((v: VariantSummaryNew) => {
          return {
              'Chrom': v.chr,
              'Position': v.start,
              'Reference': v.ref,
              'Alternate': v.alt,
              'Allele Count': v.ac,
              'Allele Number': v.an,
              'Allele Frequency': v.af,
              'Variant Class': v.variant_class,
              'Feature Type': v.feature_type,
              'impact': v.impact,
              'biotype': v.biotype,
              'CADD Raw': v.cadd_raw,
              'CADD PHRED': v.cadd_phred,
              'GnomadAF': v.gnomad_af,
              'clin_sig': v.clin_sig,
              'sift': v.sift,
              'polyPhen': v.polyPhen,
              'consequences': v.consequences,
          };
      });
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], {type: 'text/plain'});
      saveAs(blob, 'data_' + this.searchService.getCurrentRegion().name() + '_' + new Date().getTime() + '.csv');
  }

  compare(a: VariantSummaryNew, b: VariantSummaryNew) {
      return JSON.stringify(a) === JSON.stringify(b);
  }

  compareAlleleFreq(variant: VariantSummaryNew, self: number, comparator: number) {
    if(variant[self] && variant[comparator]){
        if(Math.abs(variant[self] - variant[comparator]) > ALLELEFREQ_DIFFERENCE_THRESHOLD){
            if(variant[self] > variant[comparator]){
                return true;
            }    
        }
    }
    return false;
}

  ngOnDestroy() {
      this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onFilter(filtered: VariantSummaryNew[]) {
      this.variants = filtered;
  }

  variantUrl(v: VariantSummaryNew) {
      return this.router.createUrlTree(['/search/variant-summary38', {query: VariantSummaryNew.displayName(v), cohort: this.searchBarService.options[0].getValue()}]).toString();
  }

  variantVarsomeUrl(v: VariantSummaryNew) {
    return `https://varsome.com/variant/hg38/${VariantSummaryNew.displayName(v)}`;
  }

  toggleScales($event) {
      $event.stopPropagation();
      this.ts.showScales = !this.ts.showScales;
  }

  activateColumn($event, key) {
      $event.stopPropagation();
      this.ts.set(key, !this.ts.get(key))
  }

}