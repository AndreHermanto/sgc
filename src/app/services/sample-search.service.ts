import { Injectable } from '@angular/core';
import { VsalService } from './vsal-service';
import { Subject } from 'rxjs/Subject';
import { SearchQueries } from '../model/search-query';
import { Region } from '../model/region';
import { of, Observable } from "rxjs";
import { SampleRequest } from '../model/sample-request';

const DEBOUNCE_TIME = 100;

@Injectable()
export class SampleSearch {
    ids: string[] = [];
    results: Observable<SampleRequest>;
    errors = new Subject<any>();
    commenced = false;
    lastQuery: SearchQueries;
    startingRegion: Region;
    private searchQuery = new Subject<SearchQueries>();
    refInput: string = "";
    altInput: string = "";

    constructor(private vsal: VsalService) {
        this.results = this.searchQuery
        .debounceTime(DEBOUNCE_TIME)
        .switchMap((query: SearchQueries) => {
            return this.vsal.getSamples(query, this.refInput, this.altInput).map((sr: SampleRequest) => {
                return sr;
            });
        })
        .catch(e => {
            this.errors.next(e);
            return of<SampleRequest>(new SampleRequest([], e));
        })
        .share();

        this.results.subscribe((sr) => {
            this.ids = sr.samples;
            this.commenced = true;
        });
     }

    getSamples(query: SearchQueries, ref='', alt='') {
        this.refInput = ref;
        this.altInput = alt;
        this.lastQuery = query;
        const promise = new Promise<any[]>((resolve, reject) => {
            this.results.take(1).subscribe(
                (sr: SampleRequest) => {
                    if (sr.error) {
                        this.errors.next(sr.error);
                        resolve([]);
                        return;
                    }
                    resolve(sr.samples);
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
}
