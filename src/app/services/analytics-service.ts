import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, forkJoin } from "rxjs";
import {map, catchError} from 'rxjs/operators';
import { ignoredEmails } from '../shared/ignoredMail';

const PLATFORM = "SGC";

@Injectable()
export class VecticAnalyticsService {
    constructor(private http: HttpClient
    ) {
    }

    addSearchQueries(gene, panel, panel_source, cohort, data_access, email): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            gene: gene,
            panel_source: panel_source,
            panel: panel,
            cohort: cohort,
            data_access: data_access
        }
        if(ignoredEmails.includes(email)){
            return of({});
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

    addUserQuery(email, cohort, data_access): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);
        const body = {
            email: email,
            cohort: cohort,
            data_access: data_access
        }
        if(ignoredEmails.includes(email)){
            return of({});
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

    addUserLogin(email, signup, geoLng, geoLat): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            email: email,
            platform: PLATFORM,
            signup: signup,
            geoLng: geoLng,
            geoLat: geoLat
        }
        if(ignoredEmails.includes(email)){
            return of({});
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


