import { Component, OnInit, Input } from '@angular/core';
import { VariantSummarySearchNewService } from '../../../services/variant-summary-search-new-service';
import { VariantSummaryNew } from '../../../model/variant-summary-new';
import { SearchBarService } from '../../../services/search-bar-service';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';

@Component({
    selector: 'app-gene-information-new',
    templateUrl: './gene-information-new.component.html',
    styleUrls: ['./gene-information-new.component.css', '../../../shared/meta-information.css']
})
export class GeneInformationNewComponent implements OnInit {
    @Input() variants: VariantSummaryNew[];
    @Input() autocomplete: GenericAutocompleteResult<Gene>;

    constructor(public searchService: VariantSummarySearchNewService,
                public searchBarService: SearchBarService) {
    }

    ngOnInit() {

    }

    geneLocation(gene: Gene) {
        let r = new Region(gene.chromosome, gene.start, gene.end);
        return r.name();
    }

}
