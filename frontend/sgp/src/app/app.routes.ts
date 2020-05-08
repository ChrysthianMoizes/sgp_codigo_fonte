import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UsuarioComponent } from './pages/usuario/form/perfil/usuario.component';
import { LoginComponent } from './pages/usuario/form/login/login.component';
import { CadastroComponent } from './pages/usuario/form/cadastro/cadastro.component';
import { ResetarSenhaComponent } from './pages/usuario/form/resetar-senha/resetar-senha.component';
import { ReenviarEmailComponent } from './pages/usuario/form/reenviar-email/reenviar-email.component';
import { ListarCandidatosComponent } from './pages/usuario/list/listarCandidatos/listar-candidatos/listar-candidatos.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
      { path: 'cadastro', component: CadastroComponent, data: { breadcrumb: 'Cadastro' } },
      { path: 'resetarsenha', component: ResetarSenhaComponent, data: { breadcrumb: 'Resetar Senha' } },
      { path: 'reenviaremail', component: ReenviarEmailComponent, data: { breadcrumb: 'Reenviar Email' } },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home', toplayout: true } },
      { path: 'perfil', component: UsuarioComponent, data: { breadcrumb: 'Perfil', toplayout: true } },
      { path: 'candidatos', component: ListarCandidatosComponent, data: { breadcrumb: 'Candidatos', toplayout: true } },
      { path: 'notFound', component: NotfoundComponent, data: { breadcrumb: 'Not Found', toplayout: true } },
      { path: '**', redirectTo: 'notFound' }
    ]
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

