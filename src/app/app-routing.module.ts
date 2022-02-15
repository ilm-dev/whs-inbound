import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Menu/menu.component';
import { InicioComponent } from './Inicio/inicio.component';
import { NotfoundComponent } from './NotFound/notfound.component';
import { EntrancesMaterialComponent } from './Group1/entrances-material.component';
import { HistorialComponent } from './Historial/historial.component';
import { ModuloComponent } from './Modulo2/modulo.component';

const routes: Routes = [
  {path : '', redirectTo: '/inicio', pathMatch: 'full'},
  {path : 'inicio', component:InicioComponent},
  {path : 'menu', component:MenuComponent},
  {path : 'inbound01', component:EntrancesMaterialComponent},
  {path : 'historial', component:HistorialComponent},
  {path : 'modulo', component:ModuloComponent},
  {path : '**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
