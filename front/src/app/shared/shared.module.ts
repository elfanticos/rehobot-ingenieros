import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { TableGenericComponent } from './components/table-generic/table-generic.component';
import { ModalCofirmComponent } from './components/modal-cofirm/modal-cofirm.component';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';


@NgModule({
  declarations: [
    TableGenericComponent,
    ModalCofirmComponent,
    ControlMessagesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    TableGenericComponent,
    ModalCofirmComponent,
    ControlMessagesComponent
  ]
})
export class SharedModule { }
