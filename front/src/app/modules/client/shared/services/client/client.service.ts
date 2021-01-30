import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ClientService {
    constructor(
        private _http: HttpClient
    ){}

    list(): Observable<any> {
        return this._http.get(`${environment.api}${environment.apiService.client.list}`);
    }
}