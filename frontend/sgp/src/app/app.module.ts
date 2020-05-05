import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingService } from './components/loading/loading.service';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [AppComponent, HomeComponent, AlertComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ToastModule,
    NgxSpinnerModule,
  ],
  providers: [AuthService, AuthGuard, MessageService, LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
