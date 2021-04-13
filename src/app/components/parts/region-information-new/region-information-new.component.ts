import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VariantSummaryNew } from '../../../model/variant-summary-new';
import { Gene } from '../../../model/gene';
import { Subscription } from 'rxjs/Subscription';
import { RegionService } from '../../../services/autocomplete/region-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { VariantSummarySearchNewService } from '../../../services/variant-summary-search-new-service';
import { Region } from '../../../model/region';

@Component({
  selector: 'app-region-information-new',
  templateUrl: './region-information-new.component.html',
  styleUrls: ['./region-information-new.component.css', '../../../shared/meta-information.css']
})
export class RegionInformationNewComponent implements OnInit, OnDestroy {
    variants: VariantSummaryNew[] = [];
    region: Region;
    genes: Gene[];
    private subscriptions: Subscription[] = [];


    constructor(public searchService: VariantSummarySearchNewService,
                public searchBarService: SearchBarService,
                public regionService: RegionService,
                public cd: ChangeDetectorRef) {

        this.subscriptions.push(this.searchService.results.subscribe(() => {
            this.variants = this.searchService.variants;
            this.region = this.searchService.getCurrentRegion();
            this.getGenes();
            this.cd.detectChanges();
        }));
        this.region = this.searchService.getCurrentRegion();
        this.variants = this.searchService.variants;
        this.getGenes();
    }

    ngOnInit() {

    }

    getGenes() {
        this.genes = null;
        this.subscriptions.push(this.regionService.getGenesInRegion(this.region).subscribe((genes) => {
            this.genes = genes;
            this.cd.detectChanges();
        }, (e) => {}));
    }

    gotoGene(gene: Gene) {
        this.searchBarService.search(gene.symbol);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

}
