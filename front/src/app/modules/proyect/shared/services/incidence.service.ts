import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IncidenceService } from "./incidence/incidence.service";

@Injectable()
export class IncidenceFacadeService {
    constructor(
        private _incidenceService: IncidenceService,
    ) { }

    list(): Observable<any> {
        return this._incidenceService.list();
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