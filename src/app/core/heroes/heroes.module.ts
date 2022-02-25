import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './herous-routing.module';

import { HeroesComponent } from './heroes.component';

@NgModule({
  declarations: [
    HeroesComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class HeroesModule { }
