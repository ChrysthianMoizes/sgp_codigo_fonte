import { QuestaoComponent } from './pages/questao/form/questao.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingService } from './components/loading/loading.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, CardModule, InputTextModule} from 'primeng';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {LayoutComponent} from './components/layout/layout.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {HomeComponent} from './pages/home/home.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import { QuestaoListarComponent } from './pages/questao/list/questao-listar.component';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ListarAvaliacaoComponent } from './pages/avaliação/list/listar-avaliacao/listar-avaliacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerfilComponent,
    LayoutComponent,
    NavBarComponent,
    BreadcrumbComponent,
    NotfoundComponent,
    AlertComponent,
    QuestaoListarComponent,
    QuestaoComponent,
    ListarAvaliacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    MenuModule,
    BreadcrumbModule,
    FormsModule,
    NgxSpinnerModule,
    ToastModule,
    TableModule,
    DropdownModule,
    RadioButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, MessageService, LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
