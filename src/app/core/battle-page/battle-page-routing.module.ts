import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BattlePageComponent } from './battle-page-component/battle-page.component';


const routes: Routes = [
  { path: '', component: BattlePageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattlePageRoutingModule { }
