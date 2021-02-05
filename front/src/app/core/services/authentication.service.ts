import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject</* User */any>;
    public user: Observable</* User */any>;

    constructor(
        private router: Router,
        private _http: HttpClient,
        private _localStorageService: LocalStorageService
    ) {
        this.userSubject = new BehaviorSubject</* User */any>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): /* User */any {
        return this.userSubject.value;
    }

    login(user: string, password: string) {
        const body = { user, password };
        return this._http.post<any>(`${environment.api}${environment.apiService.oauth.login}`, body);
    }

    logout(): void {
        this._localStorageService.clear();
        this.router.navigate(['/login']);
    }
}