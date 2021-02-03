import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdvanceService } from "./advance/advance.service";

@Injectable()
export class AdvanceFacadeService {
    constructor(
        private _advanceService: AdvanceService,
    ) { }

    insert(values: any): Observable<any> {
        return this._advanceService.insert(values);
    }
}