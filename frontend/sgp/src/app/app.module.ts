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

@NgModule({
  declarations: [AppComponent, HomeComponent, AlertComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
