import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { IncidenceComponent } from './views/incidence/incidence.component';
import { AdvanceComponent } from './views/advance/advance.component';
import { ProjectComponent } from './views/project/project.component';


@NgModule({
  declarations: [
    ProjectComponent,
    IncidenceComponent,
    AdvanceComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
