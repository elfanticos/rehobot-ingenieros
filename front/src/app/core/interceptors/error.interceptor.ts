import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { SnackBarService } from '../services/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private _localStorageService: LocalStorageService,
        private _snackBarService: SnackBarService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            // if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
            //     // auto logout if 401 or 403 response returned from api
            //     this.authenticationService.logout();
            // }
            const error = (err && err.error && err.error.msg) || err.statusText;
            console.error(err);
            this._snackBarService.show({message: error});
            if ((err.error || {}).error === 'invalid_token' && this._localStorageService.get('token')) {
                this._localStorageService.clear();
                this.router.navigate(['/login']);
            }
            return throwError(error);
        }))
    }
}