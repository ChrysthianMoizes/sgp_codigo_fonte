import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  /*,
  {
    path: 'login',
    component: },
  {
    path: 'cadastro',
    component:},
  {
    path: 'reenviaremail',
    component:
  },
  {
    path: 'resetarsenha',
    component:
  },
  {
    path: 'home',
    component:
  },
  {
    path: 'perfil',
    component:
  },
  {
    path: 'not-found',
    component:
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
