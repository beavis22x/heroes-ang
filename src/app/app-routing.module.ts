import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './utils/guards/auth.guard';

import { MainLayoutComponent } from './core/main-layout/main-layout.component';

import { ROUTE_CONFIGS } from './utils/const/routes.consts';

const routes: Routes = [
  {
    path: ROUTE_CONFIGS.root.path, component: MainLayoutComponent, children: [
      {path: ROUTE_CONFIGS.root.path, redirectTo: ROUTE_CONFIGS.login.path, pathMatch: 'full'},
      {
        path: ROUTE_CONFIGS.login.path,
        loadChildren: () => import('./core/login/login.module').then(mod => mod.LoginModule)
      },
      {
        path: ROUTE_CONFIGS.heroesRoot.path, canActivate: [AuthGuard],
        loadChildren: () => import('./core/heroes/heroes.module').then(mod => mod.HeroesModule)
      },
      {
        path: ROUTE_CONFIGS.registration.path,
        loadChildren: () => import('./core/registration/registration.module').then(mod => mod.RegistrationModule)
      },
      {
        path: ROUTE_CONFIGS.userInfo.path, canActivate: [AuthGuard],
        loadChildren: () => import('./core/user-info/user-info.module').then(mod => mod.UserInfoModule)
      },
      {
        path: ROUTE_CONFIGS.battlePage.path, canActivate: [AuthGuard],
        loadChildren: () => import('./core/battle-page/battle-page.module').then(mod => mod.BattlePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
