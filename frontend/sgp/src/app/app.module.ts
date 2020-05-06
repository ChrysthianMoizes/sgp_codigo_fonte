import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FormCadastroComponent } from './components/form-cadastro/form-cadastro.component';
import { ResetarSenhaComponent } from './pages/resetar-senha/resetar-senha.component';
import { ReenviarEmailComponent } from './pages/reenviar-email/reenviar-email.component';
import { ReenviarEmailService } from './stores/reenviar-email/reenviar-email.service';
import { ResetarSenhaService } from './stores/resetar-senha/resetar-senha.service';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './stores/login/login.service';
import { CadastroUsuarioService } from './stores/cadastro/cadastro-usuario.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingService } from './components/loading/loading.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ListarCandidatosComponent } from './components/listarCandidatos/listar-candidatos/listar-candidatos.component';
import { ListarCandidatosService } from './stores/candidatos/listar-candidatos.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    SendEmailComponent,
    ReenviarEmailComponent,
    ResetarSenhaComponent,
    CadastroComponent,
    FormCadastroComponent,
    LoginComponent,
    PerfilComponent,
    LayoutComponent,
    NavBarComponent,
    BreadcrumbComponent,
    NotfoundComponent,
    AlertComponent,
    ListarCandidatosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    NgxSpinnerModule,
    ToastModule,
    MenuModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    TableModule
  ],
  providers: [
    ReenviarEmailService,
    ResetarSenhaService,
    LoginService,
    CadastroUsuarioService,
    AuthService,
    AuthGuard,
    MessageService,
    LoadingService,
    ListarCandidatosService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
