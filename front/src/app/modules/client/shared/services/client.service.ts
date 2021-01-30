import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientService } from "./client/client.service";

@Injectable()
export class ClientFacadeService {
    constructor(
        private _clientService: ClientService,
    ) { }

    list(): Observable<any> {
        return this._clientService.list();
    }

    insert(values: any): Observable<any> {
        return this._clientService.insert(values);
    }

    update(values: any, clientId: number): Observable<any> {
        return this._clientService.update(values, clientId);
    }

    delete(clientId: number): Observable<any> {
        return this._clientService.delete(clientId);
    }
}