import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalClientRegisterComponent } from '../../shared/components/modal-client-register/modal-client-register.component';
import {KEY_TABLE, TITLE_COLUMNS_TABLE} from '../../shared/constants/client-constant';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  KEY_TABLE = KEY_TABLE;
  TITLE_COLUMNS_TABLE = TITLE_COLUMNS_TABLE;
  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModalRegister(): void {
    this._dialog.open(ModalClientRegisterComponent, {
      width: '520px'
    });
  }

}
