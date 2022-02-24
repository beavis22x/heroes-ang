import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../utils/services/auth.guard';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeroListComponent } from './user-hero-list/user-hero-list.component';
import { UserPowerUpsComponent } from './user-power-ups/user-power-ups.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserHeroInfoComponent } from './user-hero-info/user-hero-info.component';

import { ROUTE_CONFIGS } from '../utils/const/routes.consts';
import { EMPTY_STRING } from '../utils/const/validators.const';

const routes: Routes = [
  {path: EMPTY_STRING, component: UserLayoutComponent, children: [
      {path: ROUTE_CONFIGS.root.path, redirectTo: ROUTE_CONFIGS.userHeroList.path, pathMatch: 'full'},
      {path: ROUTE_CONFIGS.userHistory.path, component: UserHistoryComponent, canActivate:[AuthGuard]},
      {path: ROUTE_CONFIGS.userPowerUps.path, component: UserPowerUpsComponent, canActivate:[AuthGuard]},
      {path: ROUTE_CONFIGS.userHeroInfo.path, component: UserHeroInfoComponent, canActivate:[AuthGuard]},
      {path: ROUTE_CONFIGS.userHeroList.path, component: UserHeroListComponent, canActivate:[AuthGuard]},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
