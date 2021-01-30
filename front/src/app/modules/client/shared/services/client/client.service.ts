import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HeadersService } from "src/app/core/services/headers.service";
import { environment } from "src/environments/environment";

@Injectable()
export class ClientService {
    constructor(
        private _http: HttpClient,
        private _headerService: HeadersService
    ){}

    list(): Observable<any> {
        return this._http.get(`${environment.api}${environment.apiService.client.list}`);
    }

    insert(body: any): Observable<any> {
        const headers = this._headerService.buildService();
        return this._http.post(`${environment.api}${environment.apiService.client.insert}`, body, headers);
    }

    update(body: any, clientId: number): Observable<any> {
        const headers = this._headerService.buildService();
        return this._http.put(`${environment.api}${environment.apiService.client.update}/${clientId}`, body, headers);
    }

    delete(clientId: number): Observable<any> {
        return this._http.delete(`${environment.api}${environment.apiService.client.delete}/${clientId}`)
    }
}