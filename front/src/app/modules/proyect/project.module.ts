import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatAutocompleteModule
  ],
  providers: [
    ProjectService,
    ProjectFacadeService,
    IncidenceService,
    IncidenceFacadeService
  ],
  entryComponents: [
    ModalProjectRegisterComponent,
    ModalIncidenceRegisterComponent
  ]
})
export class ProjectModule { }
