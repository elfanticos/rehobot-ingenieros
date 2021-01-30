import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientService } from "./client/client.service";

@Injectable()
export class ClientFacadeService {
    constructor(
        private _clientService: ClientService
    ) { }

    list(): Observable<any> {
        return this._clientService.list();
    }
}