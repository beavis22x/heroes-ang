import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-info-routing.module';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeroListComponent } from './user-hero-list/user-hero-list.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserPowerUpsComponent } from './user-power-ups/user-power-ups.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserHeroListComponent,
    UserHistoryComponent,
    UserPowerUpsComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
  ]
})
export class UserInfoModule { }
