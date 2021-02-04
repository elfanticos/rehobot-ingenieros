import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { UserComponent } from './views/user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './shared/services/user/user.service';
import { UserFacadeService } from './shared/services/user.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import localeEs from '@angular/common/locales/es';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalUserRegisterComponent } from './shared/components/modal-user-register/modal-user-register.component';

registerLocaleData(localeEs);

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    UserComponent,
    ModalUserRegisterComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    MatRadioModule,
    MatNativeDateModule,
    MatCardModule
    
  ],
  entryComponents: [
    ModalUserRegisterComponent
  ],
  providers: [
    UserService,
    UserFacadeService
  ]
})
export class UserModule { }
