import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { SelectedHeroesService } from '../../../utils/services/selected-heroes.service';
import { HeroesService } from '../../../utils/services/heroes.service';
import { BattleHeroService } from '../../../utils/services/battle-hero.service';

import { Hero } from '../../../utils/interfaces/hero.interface';
import { RouteConfigs } from '../../../utils/interfaces/routes.interfaces';

import { ROUTE_CONFIGS } from '../../../utils/const/routes.consts';

@Component({
  selector: 'app-user-hero-list',
  templateUrl: './user-hero-list.component.html',
  styleUrls: ['./user-hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHeroListComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  public selectedBattleHeroName!: string;
  public selectedHeroes: Hero[] = [];
  public subscriptions: Subscription = new Subscription();
  public routes: RouteConfigs = ROUTE_CONFIGS;

  constructor(
    private selectedHeroesService: SelectedHeroesService,
    private cd: ChangeDetectorRef,
    private heroService: HeroesService,
    private router: Router,
    private battleHeroService: BattleHeroService
  ) {
  }

  public ngOnInit(): void {
    this.getSelectedHeroes();
  }

  public getSelectedHeroes(): void {
    this.subscriptions.add(this.selectedHeroesService.getSelectedHeroes$
      .subscribe((heroes: Hero[]) => {
        this.selectedHeroes = [...heroes];
        this.setBattleHero(heroes[0]);

        this.cd.markForCheck();
      }))
  }

  public setBattleHero(battleHero: Hero): void {
    this.selectedBattleHeroName = battleHero?.name;
    this.battleHeroService.setBattleHero = battleHero;
  }

  public deleteHero(id: string): void {
    this.selectedHeroesService.removeHero(id);
    this.selectedHeroes = this.selectedHeroes.filter((hero: Hero) => {
      return hero.id !== id;
    })
  }

  public addBtn(): void {
    this.router.navigate([this.routes.heroesRoot.path]);
  }

  public infoHero(id: string): void {
    this.router.navigate([this.routes.userInfo.path, this.routes.userHeroInfo.path], {
      queryParams: {
        id: id
      }
    })
  }

  public routeInBattle(): void {
      this.router.navigate([this.routes.battlePage.path])
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
