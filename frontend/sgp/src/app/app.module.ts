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
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { AlertComponent } from './components/alert/alert.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './components/breadcrumb/breadcrumb.service';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './components/loading/loading.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CadastrarAvaliacaoComponent } from './pages/avaliacao/forms/cadastrar-avaliacao/cadastrar-avaliacao.component';
import { ListarProvasComponent } from './pages/prova/list/listar-provas.component';
import { QuestaoComponent } from './pages/questao/form/questao.component';
import { QuestaoListarComponent } from './pages/questao/list/questao-listar.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PrimengModule } from './primeng.module';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CadastrarProvaComponent } from './pages/prova/form/cadastrar-prova.component';
import { ListarAvaliacaoComponent } from './pages/avaliacao/list/listar-avaliacao/listar-avaliacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioComponent,
    LayoutComponent,
    NavBarComponent,
    BreadcrumbComponent,
    NotfoundComponent,
    CadastrarProvaComponent,
    AlertComponent,
    QuestaoListarComponent,
    QuestaoComponent,
    ListarAvaliacaoComponent,
    LoadingComponent,
    ListarProvasComponent,
    CadastrarAvaliacaoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
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
    BreadcrumbService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
