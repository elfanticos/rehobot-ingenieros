import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboService } from 'src/app/core/services/combo.service';
import { ModalCofirmComponent } from 'src/app/shared/components/modal-cofirm/modal-cofirm.component';
import { ModalIncidenceRegisterComponent } from '../../shared/components/modal-incidence-register/modal-incidence-register.component';

import {KEY_TABLE, TITLE_COLUMNS_TABLE} from '../../shared/constants/incidence-constant';
import { IncidenceFacadeService } from '../../shared/services/incidence.service';

@Component({
  selector: 'app-incidence',
  templateUrl: './incidence.component.html',
  styleUrls: ['./incidence.component.scss']
})
export class IncidenceComponent implements OnInit {
  incidences: any[] = [];
  KEY_TABLE = KEY_TABLE;
  TITLE_COLUMNS_TABLE = TITLE_COLUMNS_TABLE;
  constructor(
    private _dialog: MatDialog,
    private _incidenceService: IncidenceFacadeService,
    private _comboService: ComboService
  ) { }

  ngOnInit(): void {
    // this.loadProjectList();
  }

  loadProjectList(): void {
    this._incidenceService.list().subscribe(incidences => {
      this.incidences = incidences;
    });
  }

  openModalRegister(incidence?: any): void {
    const dialogRef = this._dialog.open(ModalIncidenceRegisterComponent, {
      width: '520px',
      data: {
        incidence
      }
    });
    // let clients = [];
    // this._comboService.clients().subscribe((res: any[]) => {
    //   clients = res;
    //   dialogRef.componentInstance.clientList = clients;
    // });

    // dialogRef.componentInstance.send.subscribe(values => {
    //   if (project) {
    //     this.editProject(dialogRef, values, project.project_id);
    //   } else {
    //     this.registerProject(dialogRef, values);
    //   }
    // });
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
      this.removeClient(dialogRef, project.project_id);
    })
  }

  registerProject(dialogRef: MatDialogRef<ModalIncidenceRegisterComponent, any>, values): void {
    this._incidenceService.insert(values).subscribe(res => {
      this.loadProjectList();
      dialogRef.close();
    });
  }

  editProject(dialogRef: MatDialogRef<ModalIncidenceRegisterComponent, any>, values, projectId: number): void {
    this._incidenceService.update(values, projectId).subscribe(res => {
      this.loadProjectList();
      dialogRef.close();
    });
  }

  removeClient(dialogRef: MatDialogRef<ModalCofirmComponent, any>, projectId: any): void {
    this._incidenceService.delete(projectId).subscribe(res => {
      this.loadProjectList();
      dialogRef.close();
    });
  }
}
