import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
<<<<<<< HEAD
import { LoginComponent } from './pages/login/login.component';
=======
import { ReenviarEmailComponent } from './pages/reenviar-email/reenviar-email.component';
import { ResetarSenhaComponent } from './pages/resetar-senha/resetar-senha.component';
>>>>>>> f58c404355ded3a09c9757881c9d1d059a8fedf0

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
<<<<<<< HEAD
=======
  {
    path: 'reenviaremail',
    component: ReenviarEmailComponent
  },
  {
    path: 'resetarsenha',
    component: ResetarSenhaComponent
  },/*,
>>>>>>> f58c404355ded3a09c9757881c9d1d059a8fedf0
  {
    path: 'login',
    component: LoginComponent,
  },
  /*
  {
    path: 'cadastro',
    component:},
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
