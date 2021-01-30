import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { ClientComponent } from './views/client/client.component';
import { ModalClientRegisterComponent } from './shared/components/modal-client-register/modal-client-register.component';
import { ClientService } from './shared/services/client/client.service';
import { ClientFacadeService } from './shared/services/client.service';



@NgModule({
  declarations: [ClientComponent, ModalClientRegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    ModalClientRegisterComponent
  ],
  providers: [
    ClientService,
    ClientFacadeService
  ]

})
export class ClientModule { }
