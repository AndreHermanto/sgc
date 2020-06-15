import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { Variant } from '../model/variant';
import { Subject } from 'rxjs/Subject';
import { SearchQueries } from '../model/search-query';
import { VariantRequest } from '../model/variant-request';
import { Region } from '../model/region';
import { of, Observable } from "rxjs";
import { VariantSearch } from '../shared/variant-search';


const DEBOUNCE_TIME = 100;

@Injectable()
export class VariantSearchService {
    variants: Variant[] = [];
    results: Observable<VariantRequest>;
    errors = new Subject<any>();
    commenced = false;
    lastQuery: SearchQueries;
    startingRegion: Region;
    filter: any = null;
    samples: string = "";
    noSamples: boolean = false;
    refInput: string = "";
    altInput: string = "";
    private searchQuery = new Subject<SearchQueries>();
    private variantSearch = new VariantSearch();

    constructor(private vsal: VsalService
    ) {
        this.results = this.searchQuery
            .debounceTime(DEBOUNCE_TIME)
            .switchMap((query: SearchQueries) => {
                return this.vsal.getVariants(query, this.samples, this.noSamples, this.refInput, this.altInput).map((vr: VariantRequest) => {
                    if (this.filter) {
                        vr.variants = this.filter(vr.variants);
                    }
                    vr.variants.forEach(v =>{
                        query.regions.find(r =>{
                            return typeof r.genes.find(region => {
                                if(region.symbol && v.s >= region.start && v.s <= region.end){
                                    v.geneSymbol = region.symbol;
                                    return true
                                }
                                return false;
                            })!== 'undefined'
                        });
                        if(!v.geneSymbol){
                            v.geneSymbol = "None"
                        }
                    })
                    return vr;
                });
            })
            .catch(e => {
                this.errors.next(e);
                return of<VariantRequest>(new VariantRequest([], e));
            })
            .share();

        this.results.subscribe((cs) => {
            this.variants = cs.variants;
            this.commenced = true;
        });
    }

    getVariants(query: SearchQueries, samples, noSamples = false, ref='', alt=''): Promise<Variant[]> { 
        this.lastQuery = query;
        this.samples = samples;
        this.noSamples = noSamples;
        this.refInput = ref;
        this.altInput = alt;
        const promise = new Promise<any[]>((resolve, reject) => {
            this.results.take(1).subscribe(
                (vr: VariantRequest) => {
                    if (vr.error) {
                        this.errors.next(vr.error);
                        resolve([]);
                        return;
                    }
                    resolve(vr.variants);
                },
                (e: any) => {
                    this.errors.next(e);
                    resolve([]);
                }
            );
        });
        this.searchQuery.next(query);
        return promise;
    }

    getVariantsForFamily(query: SearchQueries, samples, ref= '', alt =''): Promise<Variant[]> { 
        this.lastQuery = query;
        this.samples = samples;
        const promise = new Promise<any[]>((resolve, reject) => {
            this.vsal.getVariants(query, samples, false, ref, alt).subscribe((vr: VariantRequest) => {
                vr.variants.forEach(v =>{
                    this.lastQuery.regions.find(r =>{
                        return typeof r.genes.find(region => {
                            if(region.symbol && v.s >= region.start && v.s <= region.end){
                                v.geneSymbol = region.symbol;
                                return true
                            }
                            return false
                        }) !== 'undefined'
                    });
                    if(!v.geneSymbol){
                        v.geneSymbol = "None"
                    }
                })
                this.variants = vr.variants;
                resolve(vr.variants);
            });
        })
        return promise
    }

    getCurrentRegion = (): Region => this.variantSearch.getCurrentRegion(this.lastQuery);


    getSmallerRegionString= () => this.variantSearch.getSmallerRegionString(this.lastQuery);
}

