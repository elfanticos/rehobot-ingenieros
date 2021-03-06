import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HeadersService } from "src/app/core/services/headers.service";
import { environment } from "src/environments/environment";

@Injectable()
export class IncidenceService {
    constructor(
        private _http: HttpClient,
        private _headerService: HeadersService
    ){}

    list(params: HttpParams): Observable<any> {
        return this._http.get(`${environment.api}${environment.apiService.incidence.list}`, {params});
    }

    insert(body: any): Observable<any> {
        const headers = this._headerService.buildService();
        return this._http.post(`${environment.api}${environment.apiService.incidence.insert}`, body, headers);
    }

    update(body: any, incidenceId: number): Observable<any> {
        const headers = this._headerService.buildService();
        return this._http.put(`${environment.api}${environment.apiService.incidence.update}/${incidenceId}`, body, headers);
    }

    delete(incidenceId: number): Observable<any> {
        return this._http.delete(`${environment.api}${environment.apiService.incidence.delete}/${incidenceId}`)
    }
}