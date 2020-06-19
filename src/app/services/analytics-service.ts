import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, forkJoin } from "rxjs";
import {map, catchError} from 'rxjs/operators';

const PLATFORM = "CIRCA";

@Injectable()
export class VecticAnalyticsService {
    constructor(private http: HttpClient
    ) {
    }

    addSearchQueries(gene, panel, panel_source, cohort, data_access): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            gene: gene,
            panel_source: panel_source,
            panel: panel,
            platform: PLATFORM,
            cohort: cohort,
            data_access: data_access
        }
        return this.http.post(`${environment.vectisAnalyticsUrl}/search-query`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
              })
            );

    }

    addUserQuery(email, cohort): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);
        const body = {
            email: email,
            cohort: cohort,
            platform: PLATFORM
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/user-query`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );

    }

    addUserLogin(email): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            email: email,
            platform: PLATFORM
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/user-login`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }


}


