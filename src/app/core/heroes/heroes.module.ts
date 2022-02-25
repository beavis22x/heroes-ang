import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './herous-routing-module';

import { HeroesSelectPageComponent } from './heroes-select-page/heroes-select-page.component';

@NgModule({
  declarations: [
    HeroesSelectPageComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class HeroesModule { }
