import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "./user/user.service";

@Injectable()
export class UserFacadeService {
    constructor(
        private _userService: UserService,
    ) { }

    list(): Observable<any> {
        return this._userService.list();
    }

    insert(values: any): Observable<any> {
        return this._userService.insert(values);
    }

    update(values: any, userId: number): Observable<any> {
        return this._userService.update(values, userId);
    }

    delete(userId: number): Observable<any> {
        return this._userService.delete(userId);
    }
}