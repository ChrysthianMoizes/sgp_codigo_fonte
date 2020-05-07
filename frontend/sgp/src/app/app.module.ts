import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AlertComponent} from './components/alert/alert.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {BreadcrumbService} from './components/breadcrumb/breadcrumb.service';
import {HomeComponent} from './components/home/home.component';
import {LayoutComponent} from './components/layout/layout.component';
import {LoadingComponent} from './components/loading/loading.component';
import {LoadingService} from './components/loading/loading.service';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {CadastrarProvaComponent} from './pages/prova/cadastrar-prova.component';
import {ListarProvasComponent} from './pages/prova/list/listar-provas.component';
import {UsuarioComponent} from './pages/usuario/usuario.component';
import {PrimengModule} from './primeng.module';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';

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
    LoadingComponent,
    ListarProvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    PrimengModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    MessageService,
    LoadingService,
    BreadcrumbService,
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
