import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ButtonModule, CardModule, InputTextModule} from "primeng";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PerfilComponent],
  imports: [BrowserModule, AppRoutingModule, CardModule, InputTextModule, ButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
