import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './main-layout/main-layout.component';

import { ROUTE_CONFIGS } from './utils/const/routes.consts';

const routes: Routes = [
  {
    path: ROUTE_CONFIGS.root.path, component: MainLayoutComponent, children: [
      {path: ROUTE_CONFIGS.root.path, redirectTo: ROUTE_CONFIGS.login.path, pathMatch: 'full'},
      {
        path: ROUTE_CONFIGS.login.path,
        loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
      },
      {
        path: ROUTE_CONFIGS.heroesRoot.path,
        loadChildren: () => import('./heroes/heroes.module').then(mod => mod.HeroesModule)
      },
      {
        path: ROUTE_CONFIGS.registration.path,
        loadChildren: () => import('./registration/registration.module').then(mod => mod.RegistrationModule)
      },
      {
        path: ROUTE_CONFIGS.userInfo.path,
        loadChildren: () => import('./user-info/user-info.module').then(mod => mod.UserInfoModule)
      },
      {
        path: ROUTE_CONFIGS.battlePage.path,
        loadChildren: () => import('./battle-page/battle-page.module').then(mod => mod.BattlePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
