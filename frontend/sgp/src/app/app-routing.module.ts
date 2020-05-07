import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LayoutComponent} from './components/layout/layout.component';
import {UsuarioComponent} from './pages/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'home', component: HomeComponent, data: {breadcrumb: 'Home', toplayout: false}},
      {path: 'perfil', component: UsuarioComponent, data: {breadcrumb: 'Perfil', toplayout: true}}
    ]
  }
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
    path: 'service',
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
export class AppRoutingModule {
}
