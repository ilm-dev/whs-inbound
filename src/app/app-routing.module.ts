import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Menu/menu.component';
import { InicioComponent } from './Inicio/inicio.component';
import { NotfoundComponent } from './NotFound/notfound.component';

const routes: Routes = [
  {path : '', redirectTo: '/inicio', pathMatch: 'full'},
  {path : 'inicio', component:InicioComponent},
  {path : 'menu', component:MenuComponent},
  {path : '**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
