import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComboService } from 'src/app/core/services/combo.service';
import { ModalCofirmComponent } from 'src/app/shared/components/modal-cofirm/modal-cofirm.component';
import { ModalUserRegisterComponent } from '../../shared/components/modal-user-register/modal-user-register.component';

import { KEY_TABLE, TITLE_COLUMNS_TABLE } from '../../shared/constants/user-constant';
import { UserFacadeService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  KEY_TABLE = KEY_TABLE;
  TITLE_COLUMNS_TABLE = TITLE_COLUMNS_TABLE;
  constructor(
    private _dialog: MatDialog,
    private _userService: UserFacadeService,
    private _comboService: ComboService,
  ) { 
  }

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList(): void {
    this._userService.list().subscribe(users => {
      this.users = users;
    });
  }

  openModalRegister(user?: any): void {
    const dialogRef = this._dialog.open(ModalUserRegisterComponent, {
      width: '520px',
      data: {
        user
      }
    });
    this._comboService.roles().subscribe((res: any[]) => {
      dialogRef.componentInstance.roleList = res || [];
    });

    dialogRef.componentInstance.send.subscribe(values => {
      if (user) {
        this.editUser(dialogRef, values, user.person_id);
      } else {
        this.registerUser(dialogRef, values);
      }
    });
  }


  openModalEdit(user: any): void {
    this.openModalRegister(user);
  }

  openModalConfirmDelete(user: any): void {
    const dialogRef = this._dialog.open(ModalCofirmComponent, {
      width: '420px',
      data: {
        title: 'Deseas borrar al usuario?',
        body: 'Recuerda al confirmar no podrá recuperarlo'
      }
    });

    dialogRef.componentInstance.send.subscribe(() => {
      this.removeUser(dialogRef, user.person_id);
    })
  }

  registerUser(dialogRef: MatDialogRef<ModalUserRegisterComponent, any>, values): void {
    this._userService.insert(values).subscribe(res => {
      this.loadUserList();
      dialogRef.close();
    });
  }

  editUser(dialogRef: MatDialogRef<ModalUserRegisterComponent, any>, values, userId: number): void {
    this._userService.update(values, userId).subscribe(res => {
      this.loadUserList();
      dialogRef.close();
    });
  }

  removeUser(dialogRef: MatDialogRef<ModalCofirmComponent, any>, userId: number): void {
    this._userService.delete(userId).subscribe(res => {
      this.loadUserList();
      dialogRef.close();
    });
  }
}