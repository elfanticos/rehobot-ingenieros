import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IncidenceService } from "./incidence/incidence.service";

@Injectable()
export class IncidenceFacadeService {
    constructor(
        private _incidenceService: IncidenceService,
    ) { }

    list(projectId: number, dateRegister: any): Observable<any> {
        const params = new HttpParams()
            .set('projectId', String(projectId || ''))
            .set('dateRegister', dateRegister || '')
        return this._incidenceService.list(params);
    }

    insert(values: any): Observable<any> {
        return this._incidenceService.insert(values);
    }

    update(values: any, projectId: number): Observable<any> {
        return this._incidenceService.update(values, projectId);
    }

    delete(clientId: number): Observable<any> {
        return this._incidenceService.delete(clientId);
    }
}