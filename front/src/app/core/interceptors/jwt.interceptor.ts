import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private _localStorageService: LocalStorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = request.url.startsWith(environment.api);
        const token = this._localStorageService.get('token');
        let headers = request.headers;
        
        if (token && isApiUrl && !request.url.includes(environment.apiService.oauth.login)) {
            headers = request.headers
                .set('Authorization', `Bearer ${token}`);
        }

        const _PARAMS = { headers };
        const req$ = request.clone(_PARAMS);
        return next.handle(req$);
    }
}