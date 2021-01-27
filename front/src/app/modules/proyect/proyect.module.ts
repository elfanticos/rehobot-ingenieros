import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectComponent } from './views/proyect/proyect.component';
import { ProyectRoutingModule } from './proyect-routing.module';
import { IncidenceComponent } from './views/incidence/incidence.component';
import { AdvanceComponent } from './views/advance/advance.component';



@NgModule({
  declarations: [
    ProyectComponent,
    IncidenceComponent,
    AdvanceComponent
  ],
  imports: [
    CommonModule,
    ProyectRoutingModule
  ]
})
export class ProyectModule { }
