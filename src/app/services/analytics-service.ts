import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, forkJoin } from "rxjs";
import {map, catchError} from 'rxjs/operators';
import { ignoredEmails } from '../shared/ignoredMail';

const PLATFORM = "AGHA";

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
            data_access: data_access,
            platform: PLATFORM
        }
        if(ignoredEmails.includes(email)){
            return of({});
        }
        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/search-query`, body,{headers: headers}).pipe(
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
            data_access: data_access,
            platform: PLATFORM
        }
        if(ignoredEmails.includes(email)){
            return of({});
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/user-query`, body,{headers: headers}).pipe(
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

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/user-login`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getData(query): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            query: query
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/temp-query`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getTopLogin(start,end, limit): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            limit: limit,
            platform: PLATFORM,
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/top-login`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getLoginLocation(start,end): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM,
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/login-location`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getSinglePanel(panel,start,end, cohorts = null, cohortsFilterOpt = null): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM,
            panel: panel,
        }

        if(cohorts){
            body['cohorts'] = cohorts;
        }
        if(cohortsFilterOpt){
            body['cohortsOpt']= cohortsFilterOpt;
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/single-panel`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getPanelData(start,end, cohorts = null, cohortsFilterOpt = null): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM
        }

        if(cohorts){
            body['cohorts'] = cohorts;
        }
        if(cohortsFilterOpt){
            body['cohortsOpt']= cohortsFilterOpt;
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/panel-data`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getQueryType(start,end, cohorts = null, cohortsFilterOpt = null): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM
        }
        if(cohorts){
            body['cohorts'] = cohorts;
        }
        if(cohortsFilterOpt){
            body['cohortsOpt']= cohortsFilterOpt;
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/query-type`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getGeneCount(start,end, cohorts = null, cohortsFilterOpt = null): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            limit: 10,
            platform: PLATFORM
        }
        if(cohorts){
            body['cohorts'] = cohorts;
        }
        if(cohortsFilterOpt){
            body['cohortsOpt']= cohortsFilterOpt;
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/gene-count`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getDailyLogin(start,end): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/daily-login`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getDomainLogin(start,end): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/email-domain`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getCohortSearch(start,end, cohorts = null, cohortsFilterOpt = null): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM
        }

        if(cohorts){
            body['cohorts'] = cohorts;
        }
        if(cohortsFilterOpt){
            body['cohortsOpt']= cohortsFilterOpt;
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/cohort-queries`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getMonthlyLogin(start,end,year): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            year:year,
            platform: PLATFORM
        }

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/monthly-login`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getLoginCount(start,end): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            start: start,
            end: end,
            platform: PLATFORM
        } 

        return this.http.post(`${environment.vectisAnalyticsUrl}/analytics/count-login`, body,{headers: headers}).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                Raven.captureMessage("Vectis Analytics: " + JSON.stringify(error));
                return of(error);
                })
            );
    }

    getUserRoles(email): Observable<any>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*')
        .append('Authorization', `Bearer ${localStorage.getItem('idToken')}`);

        const body = {
            email: email,
            platform: PLATFORM
        } 

        return this.http.post(`${environment.vectisAnalyticsUrl}/auth0/user-permissions`, body,{headers: headers}).pipe(
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


