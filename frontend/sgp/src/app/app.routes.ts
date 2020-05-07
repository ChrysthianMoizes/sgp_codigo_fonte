import {ModuleWithProviders} from '@angular/compiler/src/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LayoutComponent} from './components/layout/layout.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
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
      {path: 'home', component: HomeComponent, data: {breadcrumb: 'Home', toplayout: true}},
      {path: 'perfil', component: UsuarioComponent, data: {breadcrumb: 'Perfil', toplayout: true}},
      {path: 'notFound', component: NotfoundComponent, data: {breadcrumb: 'Not Found', toplayout: true}},
      {path: '**', redirectTo: 'notFound'}
    ]
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

