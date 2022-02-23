import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../utils/services/auth.guard';

import { HeroesSelectPageComponent } from './heroes-select-page/heroes-select-page.component';

const routes: Routes = [
  { path: '', component: HeroesSelectPageComponent, canActivate:[AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
