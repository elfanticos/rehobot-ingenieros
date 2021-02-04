import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/auth/auth.guard';
import { AdvanceComponent } from './views/advance/advance.component';
import { IncidenceComponent } from './views/incidence/incidence.component';
import { ProjectComponent } from './views/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'incidence',
    component: IncidenceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'advance',
    component: AdvanceComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
