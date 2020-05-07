import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LayoutComponent } from './components/layout/layout.component';
import { QuestaoListarComponent } from './pages/questao/list/questao-listar.component';
import { QuestaoComponent } from './pages/questao/form/questao.component';

const routes: Routes = [
{path: '',
  pathMatch: 'full',
  redirectTo: 'home'
},
{
  path: '',
  component: LayoutComponent,
  children:[
    {path: 'home', component: HomeComponent , data:{ breadcrumb: 'Home'}},
    {path: 'perfil', component: PerfilComponent, data: {breadcrumb: 'Perfil'}}
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
