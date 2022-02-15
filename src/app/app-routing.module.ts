import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeroesComponent } from './heroes/heroes.component';

import { ROUTE_CONFIGS } from './utils/const/routes.consts';


const routes: Routes = [
  {
    path: ROUTE_CONFIGS.root.path, component: MainLayoutComponent, children: [
      {path: ROUTE_CONFIGS.root.path, redirectTo: ROUTE_CONFIGS.login.path, pathMatch: 'full'},
      {path: ROUTE_CONFIGS.login.path, component: LoginPageComponent},
      {path: ROUTE_CONFIGS.heroes.path, component: HeroesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
