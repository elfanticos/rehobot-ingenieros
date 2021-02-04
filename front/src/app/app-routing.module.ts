import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { MainComponent } from './core/components/main/main.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'client',
        loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'project',
        loadChildren: () => import('./modules//proyect/project.module').then(m => m.ProjectModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./modules//user/user.module').then(m => m.UserModule),
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
