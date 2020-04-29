import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [AppComponent, HomeComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
