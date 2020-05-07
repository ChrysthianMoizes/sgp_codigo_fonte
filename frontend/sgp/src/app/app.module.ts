import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  ButtonModule,
  CardModule,
  DataViewModule,
  InputTextModule,
  TableModule,
} from 'primeng';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CadastrarProvaComponent } from './components/cadastrar-prova/cadastrar-prova.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListarProvasComponent } from './components/listar-provas/listar-provas.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './components/loading/loading.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AppRoutes } from './app.routes';
import { ProvaService } from './services/prova/prova.service';
import { PerfilService } from './services/perfil/perfil.service';

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
    LoadingComponent,
    ListarProvasComponent
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
    DataViewModule,
    TableModule,
    DynamicDialogModule,
    AppRoutes
  ],
  providers:[AuthGuard,AuthService,BreadcrumbService,LoadingService,MessageService,ProvaService,PerfilService],
  bootstrap: [AppComponent],
})
export class AppModule {}
