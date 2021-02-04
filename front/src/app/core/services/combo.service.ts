import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ComboService {
    constructor(
        private _http: HttpClient
    ) {}

    projects(): Observable<any> {
        return this._http.get(`${environment.api}${environment.apiService.combo.projects}`);
    }

    clients(): Observable<any> {
        return this._http.get(`${environment.api}${environment.apiService.combo.clients}`);
    }

    roles(): Observable<any> {
        return this._http.get(`${environment.api}${environment.apiService.combo.roles}`);
    }
}