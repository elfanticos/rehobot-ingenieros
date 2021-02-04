import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject</* User */any>;
    public user: Observable</* User */any>;

    constructor(
        private router: Router,
        private _http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject</* User */any>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): /* User */any {
        return this.userSubject.value;
    }

    login(user: string, password: string) {
        const body = { user, password};
        return this._http.post<any>(`${environment.api}${environment.apiService.oauth.login}`, body);
    }

    logout(): void {
        // let token = this._localStorageService.get('token');
        // let headers = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   });
        // this._httClient.get<any>(`${environment.api}${environment.apiService.usuarios.anularToken}/${token}`, {headers}).subscribe();
        // this._localStorageService.clear();
        // this.router.navigate(['/login']);
        // // this.stopRefreshTokenTimer();
        // // this.userSubject.next(null);
    }

    // refreshToken() {
    //     const uri = `${environment.api}${environment.apiService.oauth.token}`;
    //     let headers = new HttpHeaders({
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': 'Basic cnJoaHByb3NwZWN0b2FwcDpycmhocHJvc3BlY3RvY29kZXg='
    //     });
    //     return this._http.post<any>(`${environment.api}${environment.apiService.oauth.token}`, {
    //         grant_type: 'password',
    //         username: 'UsuAdmin',
    //         password: '123'
    //     })
    //         .pipe(map((user) => {
    //             this.userSubject.next(user);
    //             this.startRefreshTokenTimer();
    //             return user;
    //         }));
    // }

    // // helper methods

    // private refreshTokenTimeout;

    // private startRefreshTokenTimer() {
    //     // parse json object from base64 encoded jwt token
    //     const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    //     // set a timeout to refresh the token a minute before it expires
    //     const expires = new Date(jwtToken.exp * 1000);
    //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
    //     this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    // }

    // private stopRefreshTokenTimer() {
    //     clearTimeout(this.refreshTokenTimeout);
    // }
}