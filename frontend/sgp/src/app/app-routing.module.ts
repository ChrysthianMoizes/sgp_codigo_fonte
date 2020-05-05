import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ReenviarEmailComponent } from './pages/reenviar-email/reenviar-email.component';
import { ResetarSenhaComponent } from './pages/resetar-senha/resetar-senha.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
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
export class AppRoutingModule { }
