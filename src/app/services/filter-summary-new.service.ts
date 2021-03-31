import { Injectable } from '@angular/core';
import { VariantSummaryNew } from '../model/variant-summary-new';
import SearchApi from 'js-worker-search';
import { isUndefined } from 'util';
import { TableSummaryNewService } from './table-summary-new-service';
import { FilterSharedService, FilterOperator, COMMAND_TOKEN } from '../shared/filter-shared-service';


@Injectable()
export class FilterSummaryNewService {
    filterSharedService = new FilterSharedService();

    private searchApi: any;

    constructor(public ts: TableSummaryNewService) {
        this.searchApi = new SearchApi();
        this.keys().sort().forEach((k) => {
            this.searchApi.indexDocument(k, COMMAND_TOKEN + k);
        });

        this.filterSharedService.operators.forEach((op) => {
            this.searchApi.indexDocument(op, op);
        });
    }

    keys= () => this.filterSharedService.keys(this.ts);

    isValidCommand = (s: string): boolean => this.filterSharedService.isValidCommand(s, this.ts);

    nextTokens = (s: string): Promise<string[]> => this.filterSharedService.nextTokens(s, this.searchApi, this.ts);

    isCommand = (s: string) => this.filterSharedService.isCommand(s);

    filterVariants = (command: string, variants: VariantSummaryNew[]) => this.filterSharedService.filterVariants(command, variants, this.ts);

    filter = (command: string, op: FilterOperator, value: string | number, variants: VariantSummaryNew[]) => this.filterSharedService.filter(command, op, value, variants, this.ts);

    clean = (s: string): string => this.filterSharedService.clean(s, this.ts);

}
