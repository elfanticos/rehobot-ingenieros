import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { downloadPDFHelper } from '@app/core/helpers/downloadPDF.helper';
import { SnackBarService } from '@app/core/services/snackbar.service';
import { ComboService } from 'src/app/core/services/combo.service';
import { ModalCofirmComponent } from 'src/app/shared/components/modal-cofirm/modal-cofirm.component';
import { ModalProjectRegisterComponent } from '../../shared/components/modal-project-register/modal-project-register.component';

import { KEY_TABLE, TITLE_COLUMNS_TABLE } from '../../shared/constants/project-constant';
import { ProjectFacadeService } from '../../shared/services/project.service';

import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { AdvanceFacadeService } from '../../shared/services/advance.service';
const moment = _rollupMoment || _moment;
moment.locale('es');
const now_date_hour = moment(new Date()).format('DD/MM/YYYY hh:mm a');

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [
    downloadPDFHelper
  ]
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  KEY_TABLE = KEY_TABLE;
  TITLE_COLUMNS_TABLE = TITLE_COLUMNS_TABLE;
  loadingTable: boolean = true;
  docDefinition: any = {};
  constructor(
    private _dialog: MatDialog,
    private _projectService: ProjectFacadeService,
    private _advanceService: AdvanceFacadeService,
    private _comboService: ComboService,
    private _snackBarService: SnackBarService,
    private _downloadPDFHelper: downloadPDFHelper
  ) { }

  ngOnInit(): void {
    this.loadProjectList();
  }

  loadProjectList(): void {
    this.loadingTable = true;
    this._projectService.list().subscribe(projects => {
      this.loadingTable = false;
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
      this._snackBarService.show({ message: res.res.msg });
      dialogRef.componentInstance.service = false;
      dialogRef.close();
    }, () => {
      dialogRef.componentInstance.service = false;
    });
  }

  editProject(dialogRef: MatDialogRef<ModalProjectRegisterComponent, any>, values, projectId: number): void {
    this._projectService.update(values, projectId).subscribe(res => {
      this.loadProjectList();
      this._snackBarService.show({ message: res.res.msg });
      dialogRef.componentInstance.service = false;
      dialogRef.close();
    }, () => {
      dialogRef.componentInstance.service = false;
    });
  }

  removeProject(dialogRef: MatDialogRef<ModalCofirmComponent, any>, projectId: number): void {
    this._projectService.delete(projectId).subscribe(res => {
      this.loadProjectList();
      this._snackBarService.show({ message: res.res.msg });
      dialogRef.componentInstance.service = false;
      dialogRef.close();
    }, () => {
      dialogRef.componentInstance.service = false;
    });
  }
  getDataPdf(project: any): void {
    this._advanceService.dataPdf(project.project_id).subscribe(res => {
      this.docDefinition = res;
      this.downloadPDF(project);
    });
  }
  downloadPDF(project: any): void {
    const anonymos = function (page, pages) {
      return {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text: 'Página ' + page.toString(),
                border: [false, true, false, false],
                alignment: 'left',
                margin: [0, 0, 0, 0],
                fontSize: 9
              },
              {
                text: now_date_hour,
                border: [false, true, false, false],
                alignment: 'right',
                margin: [0, 0, 0, 0],
                fontSize: 9
              }
            ]
          ]
        },
        margin: [40, 10, 40, 40]
      };
    };
    this.docDefinition.footer = anonymos;
    this.docDefinition.content[0].columns[0].text = `${this.docDefinition.content[0].columns[0].text} - ${project.name}`;
    this._downloadPDFHelper.downloadPdf(this.docDefinition, 'Reporte__incidencia_avance');
  }
}
