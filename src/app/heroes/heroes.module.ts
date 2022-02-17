import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './herous-routing-module';

import { HeroesSelectPageComponent } from './heroes-select-page/heroes-select-page.component';

@NgModule({
  declarations: [
    HeroesSelectPageComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
  ]
})
export class HeroesModule { }
