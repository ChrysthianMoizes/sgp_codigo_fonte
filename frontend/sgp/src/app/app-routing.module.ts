import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReenviarEmailComponent } from './pages/reenviar-email/reenviar-email.component';
import { ResetarSenhaComponent } from './pages/resetar-senha/resetar-senha.component';

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
  },/*,
  {
    path: 'login',
    component: },
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
