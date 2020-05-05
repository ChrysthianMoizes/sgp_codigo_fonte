import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { HomeComponent } from './pages/home/home.component';
<<<<<<< HEAD
import { LoginComponent } from './pages/login/login.component';
=======
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FormCadastroComponent } from './components/form-cadastro/form-cadastro.component';
import { ResetarSenhaComponent } from './pages/resetar-senha/resetar-senha.component';
import { ReenviarEmailComponent } from './pages/reenviar-email/reenviar-email.component';
import { ReenviarEmailService } from './stores/reenviar-email/reenviar-email.service';
import { ResetarSenhaService } from './stores/resetar-senha/resetar-senha.service';

>>>>>>> f58c404355ded3a09c9757881c9d1d059a8fedf0

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    SendEmailComponent,
<<<<<<< HEAD
    LoginComponent,
=======
    ReenviarEmailComponent,
    ResetarSenhaComponent,
    CadastroComponent,
    FormCadastroComponent
>>>>>>> f58c404355ded3a09c9757881c9d1d059a8fedf0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule
  ],
  providers: [ReenviarEmailService, ResetarSenhaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
