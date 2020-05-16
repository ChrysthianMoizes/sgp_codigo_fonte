import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule, DynamicDialogModule } from 'primeng';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { AlertComponent } from './components/alert/alert.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './components/breadcrumb/breadcrumb.service';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './components/loading/loading.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CadastrarAvaliacaoComponent } from './pages/avaliacao/forms/cadastrar-avaliacao/cadastrar-avaliacao.component';
import { RealizarAvaliacaoComponent } from './pages/avaliacao/forms/realizar-avaliacao/realizar-avaliacao.component';
import { ListarAvaliacaoComponent } from './pages/avaliacao/list/listar-avaliacao/listar-avaliacao.component';
import { CadastrarProvaComponent } from './pages/prova/form/cadastrar-prova.component';
import { ListarProvasComponent } from './pages/prova/list/listar-provas.component';
import { QuestaoComponent } from './pages/questao/form/questao.component';
import { QuestaoListarComponent } from './pages/questao/list/questao-listar.component';
import { CadastroComponent } from './pages/usuario/form/cadastro/cadastro.component';
import { LoginComponent } from './pages/usuario/form/login/login.component';
import { UsuarioComponent } from './pages/usuario/form/perfil/usuario.component';
import { ReenviarEmailComponent } from './pages/usuario/form/reenviar-email/reenviar-email.component';
import { ResetarSenhaComponent } from './pages/usuario/form/resetar-senha/resetar-senha.component';
import { SendEmailComponent } from './pages/usuario/form/send-email/send-email.component';
import { VisualizarCandidatoComponent } from './pages/usuario/form/visualizar-candidato/visualizar-candidato.component';
import { ListarCandidatosComponent } from './pages/usuario/list/listar-candidatos/listar-candidatos.component';
import { UsuarioService } from './pages/usuario/service/usuario.service';
import { PrimengModule } from './primeng.module';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    NavBarComponent,
    BreadcrumbComponent,
    NotfoundComponent,
    CadastrarProvaComponent,
    AlertComponent,
    CardComponent,
    ListarCandidatosComponent,
    CadastroComponent,
    LoginComponent,
    ResetarSenhaComponent,
    ReenviarEmailComponent,
    UsuarioComponent,
    SendEmailComponent,    
    ListarProvasComponent,
    RealizarAvaliacaoComponent,
    VisualizarCandidatoComponent,
    QuestaoListarComponent,
    QuestaoComponent,
    ListarAvaliacaoComponent,
    LoadingComponent,
    CadastrarAvaliacaoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    PasswordModule,
    ToastModule,
    TableModule,
    DropdownModule,
    RadioButtonModule,
    DynamicDialogModule,
    DialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimengModule,
    AppRoutes,
    AutoCompleteModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    MessageService,
    LoadingService,
    UsuarioService,
    ConfirmationService
  ],
  entryComponents: [
    VisualizarCandidatoComponent,
    BreadcrumbService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
