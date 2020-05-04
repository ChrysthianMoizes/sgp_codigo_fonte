import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReenviarEmailComponent } from './pages/reenviar-email/reenviar-email.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
<<<<<<< HEAD
  }/*,
=======
  },/*,
>>>>>>> 552dcf565ec34733db5087e27a2c32abf8e2b7d7
  {
    path: 'login',
    component: },
  {
    path: 'cadastro',
<<<<<<< HEAD
    component:},
  {
    path: 'reenviaremail',
    component:
  },
=======
    component:},*/
  {
    path: 'reenviaremail',
    component: ReenviarEmailComponent
  }/*,
>>>>>>> 552dcf565ec34733db5087e27a2c32abf8e2b7d7
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
export class AppRoutingModule { }
