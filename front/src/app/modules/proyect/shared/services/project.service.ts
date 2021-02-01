import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectService } from "./project/project.service";

@Injectable()
export class ProjectFacadeService {
    constructor(
        private _projectService: ProjectService,
    ) { }

    list(): Observable<any> {
        return this._projectService.list();
    }

    insert(values: any): Observable<any> {
        return this._projectService.insert(values);
    }

    update(values: any, projectId: number): Observable<any> {
        return this._projectService.update(values, projectId);
    }

    delete(clientId: number): Observable<any> {
        return this._projectService.delete(clientId);
    }
}