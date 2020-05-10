import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CadastroComponent } from './pages/usuario/form/cadastro/cadastro.component';
import { LoginComponent } from './pages/usuario/form/login/login.component';
import { UsuarioComponent } from './pages/usuario/form/perfil/usuario.component';
import { ReenviarEmailComponent } from './pages/usuario/form/reenviar-email/reenviar-email.component';
import { ResetarSenhaComponent } from './pages/usuario/form/resetar-senha/resetar-senha.component';
import { ListarCandidatosComponent } from './pages/usuario/list/listarCandidatos/listar-candidatos/listar-candidatos.component';
import { QuestaoListarComponent } from './pages/questao/list/questao-listar.component';
import { ListarAvaliacaoComponent } from './pages/avaliacao/list/listar-avaliacao/listar-avaliacao.component';
import { ListarProvasComponent } from './pages/prova/list/listar-provas.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Login', role: false }
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Cadastro', role: false }
      },
      {
        path: 'resetarsenha',
        component: ResetarSenhaComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Resetar Senha', role: false }
      },
      {
        path: 'reenviaremail',
        component: ReenviarEmailComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Reenviar Email', role: false}
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Home', toplayout: true, role: true }
      },
      {
        path: 'perfil',
        component: UsuarioComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Perfil', toplayout: true, role: true }
      },
      {
        path: 'candidatos',
        component: ListarCandidatosComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Candidatos', toplayout: true, role: true}
      },
      {
        path: 'notFound',
        component: NotfoundComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Not Found', toplayout: true, role: true }
      },
      {
        path: 'questoes',
        component: QuestaoListarComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Questões', toplayout: true, role: true },
      },
      {
        path: 'avaliacao',
        component: ListarAvaliacaoComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Avaliacao', toplayout: true, role: true },
      },
      {
        path: 'prova',
        component: ListarProvasComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Prova', toplayout: true, role: true },
      },
      { path: '**', redirectTo: 'notFound' }
    ]
  },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
