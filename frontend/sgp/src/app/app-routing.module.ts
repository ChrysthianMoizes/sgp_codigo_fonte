import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
{path: '',
  pathMatch: 'full',
  redirectTo: 'home'
},
{
  path: '',
  component: LayoutComponent,
  children:[
    {path: 'home', component: HomeComponent , data:{ breadcrumb: 'Home', toplayout: false}},
    {path: 'perfil', component: PerfilComponent, data: {breadcrumb: 'Perfil', toplayout:true}}
  ]}
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
export class AppRoutingModule {
}
