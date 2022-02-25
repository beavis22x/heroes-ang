import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BattlePageRoutingModule } from './battle-page-routing.module';

import { BattlePageComponent } from './battle-page-component/battle-page.component';

@NgModule({
  declarations: [
    BattlePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BattlePageRoutingModule
  ]
})
export class BattlePageModule {
}
