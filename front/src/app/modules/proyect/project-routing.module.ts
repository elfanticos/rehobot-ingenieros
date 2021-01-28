import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvanceComponent } from './views/advance/advance.component';
import { IncidenceComponent } from './views/incidence/incidence.component';
import { ProjectComponent } from './views/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent
  },
  {
    path: 'incidence',
    component: IncidenceComponent
  },
  {
    path: 'advance',
    component: AdvanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
