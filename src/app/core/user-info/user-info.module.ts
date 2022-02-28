import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-info-routing.module';

import { UserInfoComponent } from './user-info.component';
import { UserHeroListComponent } from './user-hero-list/user-hero-list.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserPowerUpsComponent } from './user-power-ups/user-power-ups.component';
import { UserHeroInfoComponent } from './user-hero-info/user-hero-info.component';

@NgModule({
  declarations: [
    UserInfoComponent,
    UserHeroListComponent,
    UserHistoryComponent,
    UserPowerUpsComponent,
    UserHeroInfoComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
  ]
})
export class UserInfoModule { }
