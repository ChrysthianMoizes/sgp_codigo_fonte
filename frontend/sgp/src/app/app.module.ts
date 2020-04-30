import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { LayoutComponent } from './components/layout/layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbModule} from 'primeng/breadcrumb';

@NgModule({
  declarations: [AppComponent, HomeComponent, LayoutComponent, NavBarComponent,BreadcrumbComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MenuModule, BreadcrumbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
