import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfillllComponent } from './components/perfillll/perfillll.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PerfilComponent, PerfillllComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
