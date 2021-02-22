import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { constants } from '../app.constants';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/parts/error-dialog/error-dialog.component';
import * as jwtDecode from 'jwt-decode';
import * as auth0 from 'auth0-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { COHORT_PERMISSION_SUMMARY_MAPPING } from '../model/cohort-value-mapping'
import {VecticAnalyticsService} from './analytics-service';

export const expiredAtKey = 'expired_at';
export const uidKey = 'uid';
export const urlStateKey = 'urlState';

@Injectable()
export class Auth {
    auth0 = new auth0.WebAuth({
        clientID: environment.auth0ClientId,
        domain: environment.auth0Domain,
        responseType: 'token id_token',
        redirectUri: `${constants.ORIGIN_URL}/auth`,
        scope: 'openid email'
    });

    private userProfileSource = new BehaviorSubject<any>(null);
    userProfile = this.userProfileSource.asObservable();

    private userSavedSearchesSource = new BehaviorSubject<any>(null);
    userSavedSearches = this.userSavedSearchesSource.asObservable();
    
    constructor(private router: Router,
                public dialog: MatDialog,
                private vas: VecticAnalyticsService,
                private http: HttpClient) {
    }

    public handleAuthentication(): void {
        console.log(`Built: ${environment.version}`)
        console.log("Your token is: " + localStorage.getItem('idToken'))
        this.auth0.parseHash(this.handleAuthResult);
    }

    public login() {
        localStorage.setItem(urlStateKey, location.pathname);
		this.auth0.authorize();
    };

    public signUp(email, password, cb) {
        this.auth0.signupAndAuthorize({
            email: email,
            password: password,
            connection: environment.auth0Connection
        }, cb);
    }

    public authenticated() {     
        const exp = localStorage.getItem(expiredAtKey);
        if (!exp) {
            return false;
        }
        const expiresAt = JSON.parse(localStorage.getItem(expiredAtKey));
        return new Date().getTime() < expiresAt;
    };

    public logout() {
      this.clearLocalStorage();
      window.location.href = `https://${ environment.auth0Domain }/v2/logout?returnTo=${ constants.ORIGIN_URL }`;
    };

    public setSession(authResult): void {
        const idToken = jwtDecode(authResult.idToken);
        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem(uidKey, idToken.email);
        localStorage.setItem('userId', idToken.sub);
        const expiresAt = JSON.stringify(idToken.exp * 1000);
        localStorage.setItem(expiredAtKey, expiresAt);
    }

    public getUser(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${localStorage.getItem('idToken')}`
            })
        };
        if(localStorage.getItem('userId') && this.authenticated()){
            return this.http.get(`https://${environment.auth0Domain}/api/v2/users/${localStorage.getItem('userId')}`, httpOptions);
        }else{
            return of(null);
        }
    }

    public getSavedSearches(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${localStorage.getItem('idToken')}`
            })
        };
        if(localStorage.getItem('userId') && this.authenticated()){
            return this.http.get(`https://${environment.auth0Domain}/api/v2/users/${localStorage.getItem('userId')}`, httpOptions)
            .catch((e) => {
                console.error(e);
                return [];
            })
            .map((res: any) => res.user_metadata.savedSearches);
        }else{
            return of([])
        }
    }

    public updateSavedSearches(savedSearches){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${localStorage.getItem('idToken')}`
            })
        };
        
        return this.http.patch(`https://${environment.auth0Domain}/api/v2/users/${localStorage.getItem('userId')}`, {
            "user_metadata": {
                "savedSearches": savedSearches
        }}, httpOptions)
        .map(res => res);
    }

    public getUserPermissions(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${localStorage.getItem('idToken')}`
            })
        };

        if(localStorage.getItem('userId') && this.authenticated()){
            return this.http.get(`https://${environment.auth0Domain}/api/v2/users/${localStorage.getItem('userId')}`, httpOptions)
            .catch((e) => {
                return [];
            })
            .map((res: any) => res.app_metadata.authorization.permissions);
        }else{
            return of([])
        }
        
    }

    public updatePassword(email){
        return this.http.post(`https://${environment.auth0Domain}/dbconnections/change_password`, {
            client_id: environment.auth0ClientId,
            email: email,
            connection: 'Username-Password-Authentication'}
            , {responseType:'text'})
        .map(res => {
            return res
        });
    }

    private handleAuthResult = (err, authResult) => {
        if (err) {
            if (!environment.production) {
                console.log(err);
            }
            if(err.errorDescription === "Please verify your email before logging in."){
                this.dialog.open(
                    ErrorDialogComponent,
                    { data: "Please verify your email before logging in."}
                );
                this.router.navigate(['/initiatives'])
            }else{
                this.dialog.open(
                    ErrorDialogComponent,
                    { data: "An error occurred while trying to authenticate. Please ensure private browsing is disabled and try again."}
                );
                this.router.navigate(['/initiatives'])
            }
        } else if (authResult && authResult.idToken && authResult.idToken !== 'undefined') {
            this.setSession(authResult);
            this.getUserPermissions().subscribe(permissions => {
                localStorage.setItem('userPermissions', JSON.stringify(permissions));
                const path = localStorage.getItem(urlStateKey);
                this.router.navigateByUrl(path);
            })
            
            this.userProfile.subscribe(user=>{
                if(user){
                    let signupFlag = true;
                    if(user.logins_count > 1){
                        signupFlag = false;
                    }
                    this.vas.addUserLogin(user.email, signupFlag, user.user_metadata.geoip.longitude, user.user_metadata.geoip.latitude).subscribe(res => res);
                }
            })
        }
        this.getUser().subscribe(user=>{ 
            this.userProfileSource.next(user);
        });
        this.getSavedSearches().subscribe(savedSearches => {
            this.userSavedSearchesSource.next(savedSearches);
        });
    };

    public checkPermissions(selectedCohort, permissions): boolean{
        let permitted = false;

        if((COHORT_PERMISSION_SUMMARY_MAPPING[selectedCohort] !== undefined && permissions.includes(COHORT_PERMISSION_SUMMARY_MAPPING[selectedCohort])) || COHORT_PERMISSION_SUMMARY_MAPPING[selectedCohort] === ''){
            permitted = true;
        }
        return permitted;
    }

    public hasAnalyticsAccess(): boolean{
        let permitted = false;
        if(localStorage.getItem('userPermissions') && localStorage.getItem('userPermissions').includes('admin-stats')){
            permitted = true;
        }
        return permitted;
    }

    clearLocalStorage() {
        localStorage.removeItem(expiredAtKey);
        localStorage.removeItem(uidKey);
        localStorage.removeItem(urlStateKey);
        localStorage.removeItem('userId')
        localStorage.removeItem('userPermissions')
    }
}
