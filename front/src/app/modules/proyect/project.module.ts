import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { IncidenceComponent } from './views/incidence/incidence.component';
import { AdvanceComponent } from './views/advance/advance.component';
import { ProjectComponent } from './views/project/project.component';
import { ProjectService } from './shared/services/project/project.service';
import { ProjectFacadeService } from './shared/services/project.service';
import { ModalProjectRegisterComponent } from './shared/components/modal-project-register/modal-project-register.component';
import { ModalIncidenceRegisterComponent } from './shared/components/modal-incidence-register/modal-incidence-register.component';
import { IncidenceService } from './shared/services/incidence/incidence.service';
import { IncidenceFacadeService } from './shared/services/incidence.service';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import localeEs from '@angular/common/locales/es';
import { AdvanceService } from './shared/services/advance/advance.service';
import { AdvanceFacadeService } from './shared/services/advance.service';

registerLocaleData(localeEs);

export function momentAdapterFactory() {
  return adapterFactory(moment);
};


@NgModule({
  declarations: [
    ProjectComponent,
    IncidenceComponent,
    AdvanceComponent,
    ModalProjectRegisterComponent,
    ModalIncidenceRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
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
  providers: [
    ProjectService,
    ProjectFacadeService,
    IncidenceService,
    IncidenceFacadeService,
    AdvanceService,
    AdvanceFacadeService
  ],
  entryComponents: [
    ModalProjectRegisterComponent,
    ModalIncidenceRegisterComponent
  ]
})
export class ProjectModule { }
