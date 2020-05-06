import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ReenviarEmailComponent } from './pages/reenviar-email/reenviar-email.component';
import { ResetarSenhaComponent } from './pages/resetar-senha/resetar-senha.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'cadastro', component: CadastroComponent, data: { breadcrumb: 'Cadastro' } },
      { path: 'resetarsenha', component: ResetarSenhaComponent, data: { breadcrumb: 'Resetar Senha' } },
      { path: 'reenviaremail', component: ReenviarEmailComponent, data: { breadcrumb: 'Reenviar Email' } },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
      { path: 'perfil', component: PerfilComponent, data: { breadcrumb: 'Perfil' } },
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
    component: ReenviarEmailComponent
  },
  {
    path: 'resetarsenha',
    component: ResetarSenhaComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  /*
  {
    path: 'cadastro',
    component: CadastroComponent
  }/*,
  {,
  {
    path: 'login',
    component: },

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
