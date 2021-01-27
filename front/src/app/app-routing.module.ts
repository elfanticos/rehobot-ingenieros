import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'client',
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'incidence',
    loadChildren: () => import('./modules/incidence/incidence.module').then(m => m.IncidenceModule)
  },
  {
    path: 'proyect',
    loadChildren: () => import('./modules/proyect/proyect.module').then(m => m.ProyectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
