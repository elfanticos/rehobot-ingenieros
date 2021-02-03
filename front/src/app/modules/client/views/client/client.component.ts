import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboService } from 'src/app/core/services/combo.service';
import { ModalCofirmComponent } from 'src/app/shared/components/modal-cofirm/modal-cofirm.component';
import { ModalClientRegisterComponent } from '../../shared/components/modal-client-register/modal-client-register.component';
import {KEY_TABLE, TITLE_COLUMNS_TABLE} from '../../shared/constants/client-constant';
import { ClientFacadeService } from '../../shared/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  KEY_TABLE = KEY_TABLE;
  TITLE_COLUMNS_TABLE = TITLE_COLUMNS_TABLE;
  clients: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _clientService: ClientFacadeService,
    private _comboService: ComboService,
  ) {
  }

  ngOnInit(): void {
    this.loadClientList();
  }

  loadClientList(): void {
    this._clientService.list().subscribe(clients => {
      clients = (clients || []).map(row => {
        row.projects_name = (row.projects_name || []).join(', ');
        return row;
      });
      this.clients = clients;
    });
  }


  openModalRegister(client?: any): void {
    const dialogRef = this._dialog.open(ModalClientRegisterComponent, {
      width: '520px',
      data: {
        client
      }
    });
    let projects = [];
    this._comboService.projects().subscribe((res: any[]) => {
      projects = res;
      dialogRef.componentInstance.allProjects = Array.from((projects || []), p => p.name);
      dialogRef.componentInstance.initFilter();
    });

    dialogRef.componentInstance.send.subscribe(values => {
      values.projects = this.validValuesForm(values, projects);
      if (client) {
        this.editClient(dialogRef, values, client.client_id);
      } else {
        this.registerClient(dialogRef, values);
      }
    });
  }

  openModalEdit(client: any): void {
    this.openModalRegister(client);
  }

  openModalConfirmDelete(client: any): void {
    const dialogRef = this._dialog.open(ModalCofirmComponent, {
      width: '420px',
      data: {
        title: 'Desea borrar al cliente?',
        body: 'Recuerda al confirmar no podrá recuperarlo'
      }
    });

    dialogRef.componentInstance.send.subscribe(() => {
      this.removeClient(dialogRef, client.client_id);
    })
  }

  registerClient(dialogRef: MatDialogRef<ModalClientRegisterComponent, any>, values): void {
    this._clientService.insert(values).subscribe(res => {
      this.loadClientList();
      dialogRef.close();
    });
  }

  editClient(dialogRef: MatDialogRef<ModalClientRegisterComponent, any>, values, clientId: number): void {
    this._clientService.update(values, clientId).subscribe(res => {
      this.loadClientList();
      dialogRef.close();
    });
  }

  removeClient(dialogRef: MatDialogRef<ModalCofirmComponent, any>, clientId: number): void {
    this._clientService.delete(clientId).subscribe(res => {
      console.log(res);
      this.loadClientList();
      dialogRef.close();
    });
  }



  validValuesForm(values: any, projects: any[]) {
      let projectIds = [];
      if (values.projects && values.projects.length > 0) {
        projects.map(row => {
          if (values.projects.includes(row.name)) {
            projectIds.push(row.project_id);
          }
        });
      }
      return projectIds.length > 0 ? projectIds : null;
  }

}
