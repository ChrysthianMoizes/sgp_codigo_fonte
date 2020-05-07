import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ButtonModule, CardModule, InputTextModule} from 'primeng';
import {MessageService} from 'primeng/api';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {ToastModule} from 'primeng/toast';
import {AppComponent} from './app.component';
import {AlertComponent} from './components/alert/alert.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {LayoutComponent} from './components/layout/layout.component';
import {LoadingService} from './components/loading/loading.service';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {HomeComponent} from './pages/home/home.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';
import {BreadcrumbService} from './services/breadcrumb.service';
import { CadastrarProvaComponent } from './components/cadastrar-prova/cadastrar-prova.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerfilComponent,
    LayoutComponent,
    NavBarComponent,
    BreadcrumbComponent,
    NotfoundComponent,
    CadastrarProvaComponent,
    AlertComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    PaginatorModule,
    ReactiveFormsModule,
    PickListModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    MenuModule,
    BreadcrumbModule,
    FormsModule,
    NgxSpinnerModule,
    ToastModule,
    AppRoutes
  ],
  providers: [AuthService, AuthGuard, MessageService, LoadingService,BreadcrumbService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
