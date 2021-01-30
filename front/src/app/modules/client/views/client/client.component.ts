import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboService } from 'src/app/core/services/combo.service';
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


  openModalRegister(): void {
    const dialogRef = this._dialog.open(ModalClientRegisterComponent, {
      width: '520px'
    });
    this._comboService.projects().subscribe((projects: any[]) => {
      dialogRef.componentInstance.allProjects = Array.from((projects || []), p => p.name);
      dialogRef.componentInstance.initFilter();
    });

    dialogRef.componentInstance.send.subscribe(values => {
      this.registerUser(dialogRef, values);
    });
  }

  registerUser(dialogRef: MatDialogRef<ModalClientRegisterComponent, any>, values) {
    this._clientService.insert(values).subscribe(res => {
      console.log(res);
      this.loadClientList();
      dialogRef.close();
    });
  }

}
