import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private _clientService: ClientFacadeService
  ) { }

  ngOnInit(): void {
    this._clientService.list().subscribe(clients => {
      console.log(clients);
      this.clients = clients;
    })
  }

  openModalRegister(): void {
    this._dialog.open(ModalClientRegisterComponent, {
      width: '520px'
    });
  }

}
