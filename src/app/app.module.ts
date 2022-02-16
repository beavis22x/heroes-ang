import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
