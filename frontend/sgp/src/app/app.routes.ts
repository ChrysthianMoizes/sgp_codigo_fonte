import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
  {path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: LayoutComponent,
    children:[
      {path: 'home', component: HomeComponent , data:{ breadcrumb: 'Home', toplayout: true}},
      {path: 'perfil', component: PerfilComponent, data: {breadcrumb: 'Perfil', toplayout:true}},
      {path: 'notFound', component: NotfoundComponent, data:{breadcrumb: 'Not Found', toplayout: true}},
      {path: '**', redirectTo: 'notFound'}
    ]
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

