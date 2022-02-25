import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../utils/services/auth.service';
import { SelectBattleHeroService } from '../../utils/services/select-battle-hero.service';

import { RouteConfigs } from '../../utils/interfaces/routes.interfaces';
import { Hero } from '../../utils/interfaces/hero.interface';

import { ROUTE_CONFIGS } from '../../utils/const/routes.consts';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit, OnDestroy{
  public routes: RouteConfigs = ROUTE_CONFIGS;
  public heroImgUrl!: {url: string};
  public subscriptions: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private router: Router,
    private selectBattleHero: SelectBattleHeroService,
  ) {
  }

  public ngOnInit(): void {
      this.updateHeroImg()
    }

  public logout(): void {
    this.auth.logOut();
    this.router.navigate([this.routes.login.path]);
  }

  public updateHeroImg(): void {
    this.subscriptions.add(this.selectBattleHero.getBattleHeroId
      .subscribe((hero: Hero) => {
      this.heroImgUrl = hero?.image;
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
