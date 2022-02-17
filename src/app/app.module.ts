import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
