import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboService } from 'src/app/core/services/combo.service';
import { ModalCofirmComponent } from 'src/app/shared/components/modal-cofirm/modal-cofirm.component';
import { ModalProjectRegisterComponent } from '../../shared/components/modal-project-register/modal-project-register.component';

import {KEY_TABLE, TITLE_COLUMNS_TABLE} from '../../shared/constants/project-constant';
import { ProjectFacadeService } from '../../shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  KEY_TABLE = KEY_TABLE;
  TITLE_COLUMNS_TABLE = TITLE_COLUMNS_TABLE;
  constructor(
    private _dialog: MatDialog,
    private _projectService: ProjectFacadeService,
    private _comboService: ComboService
  ) { }

  ngOnInit(): void {
    this.loadProjectList();
  }

  loadProjectList(): void {
    this._projectService.list().subscribe(projects => {
      this.projects = projects;
    });
  }

  openModalRegister(project?: any): void {
    const dialogRef = this._dialog.open(ModalProjectRegisterComponent, {
      width: '520px',
      data: {
        project
      }
    });
    let clients = [];
    this._comboService.clients().subscribe((res: any[]) => {
      clients = res;
      dialogRef.componentInstance.clientList = clients;
    });

    dialogRef.componentInstance.send.subscribe(values => {
      if (project) {
        this.editProject(dialogRef, values, project.project_id);
      } else {
        this.registerProject(dialogRef, values);
      }
    });
  }


  openModalEdit(project: any): void {
    this.openModalRegister(project);
  }

  openModalConfirmDelete(project: any): void {
    const dialogRef = this._dialog.open(ModalCofirmComponent, {
      width: '420px',
      data: {
        title: 'Desea borrar el proyecto?',
        body: 'Recuerda al confirmar no podrá recuperarlo'
      }
    });

    dialogRef.componentInstance.send.subscribe(() => {
      this.removeProject(dialogRef, project.project_id);
    })
  }

  registerProject(dialogRef: MatDialogRef<ModalProjectRegisterComponent, any>, values): void {
    this._projectService.insert(values).subscribe(res => {
      this.loadProjectList();
      dialogRef.close();
    });
  }

  editProject(dialogRef: MatDialogRef<ModalProjectRegisterComponent, any>, values, projectId: number): void {
    this._projectService.update(values, projectId).subscribe(res => {
      this.loadProjectList();
      dialogRef.close();
    });
  }

  removeProject(dialogRef: MatDialogRef<ModalCofirmComponent, any>, projectId: number): void {
    this._projectService.delete(projectId).subscribe(res => {
      this.loadProjectList();
      dialogRef.close();
    });
  }
}
