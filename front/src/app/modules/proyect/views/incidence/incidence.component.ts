import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboService } from 'src/app/core/services/combo.service';
import { ModalCofirmComponent } from 'src/app/shared/components/modal-cofirm/modal-cofirm.component';
import { ModalIncidenceRegisterComponent } from '../../shared/components/modal-incidence-register/modal-incidence-register.component';

import { KEY_TABLE, TITLE_COLUMNS_TABLE } from '../../shared/constants/incidence-constant';
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
  form: FormGroup;
  constructor(
    private _dialog: MatDialog,
    private _incidenceService: IncidenceFacadeService,
    private _comboService: ComboService,
    private _fb: FormBuilder
  ) { 
    this.form = this._buildForm();
  }

  ngOnInit(): void {
    this.loadIncidenceList();
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      project: [null],
      dateRegister: [null]
    });
  }

  loadIncidenceList(): void {
    const { project, dateRegister } = this.form.value;
    this._incidenceService.list(project, dateRegister).subscribe(incidences => {
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
    let projects = [];
    this._comboService.projects().subscribe((res: any[]) => {
      projects = res;
      dialogRef.componentInstance.projectList = projects;
    });

    dialogRef.componentInstance.send.subscribe(values => {
      if (incidence) {
        this.editIncidence(dialogRef, values, incidence.monitoring_x_project_id);
      } else {
        this.registerIncidence(dialogRef, values);
      }
    });
  }


  openModalEdit(incidence: any): void {
    console.log(incidence);
    this.openModalRegister(incidence);
  }

  openModalConfirmDelete(incidence: any): void {
    const dialogRef = this._dialog.open(ModalCofirmComponent, {
      width: '420px',
      data: {
        title: 'Desea borrar la incidencia?',
        body: 'Recuerda al confirmar no podrá recuperarlo'
      }
    });

    dialogRef.componentInstance.send.subscribe(() => {
      this.removeIncidence(dialogRef, incidence.monitoring_x_project_id);
    })
  }

  registerIncidence(dialogRef: MatDialogRef<ModalIncidenceRegisterComponent, any>, values): void {
    this._incidenceService.insert(values).subscribe(res => {
      this.loadIncidenceList();
      dialogRef.close();
    });
  }

  editIncidence(dialogRef: MatDialogRef<ModalIncidenceRegisterComponent, any>, values, incidenceId: number): void {
    this._incidenceService.update(values, incidenceId).subscribe(res => {
      this.loadIncidenceList();
      dialogRef.close();
    });
  }

  removeIncidence(dialogRef: MatDialogRef<ModalCofirmComponent, any>, incidenceId: number): void {
    this._incidenceService.delete(incidenceId).subscribe(res => {
      this.loadIncidenceList();
      dialogRef.close();
    });
  }
}
