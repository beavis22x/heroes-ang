import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { SelectedHeroesService } from '../../utils/services/selected-heroes.service';
import { HeroesService } from '../../utils/services/heroes.service';

import { Hero } from '../../utils/interfaces/hero.interface';
import { RouteConfigs } from '../../utils/interfaces/routes.interfaces';

import { ROUTE_CONFIGS } from '../../utils/const/routes.consts';

@Component({
  selector: 'app-user-hero-list',
  templateUrl: './user-hero-list.component.html',
  styleUrls: ['./user-hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHeroListComponent implements OnInit, OnDestroy {
  public heroes: Hero[] = [];
  public selectedHeroes: Hero[] = [];
  public selectedHeroesId: string[] = [];
  public subscriptions: Subscription = new Subscription();
  public routes: RouteConfigs = ROUTE_CONFIGS;

  constructor(
    private selectedHeroesService: SelectedHeroesService,
    private cd: ChangeDetectorRef,
    private heroService: HeroesService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.getSelectedHeroes();
  }

  public getSelectedHeroes(): void {
    this.subscriptions.add(this.selectedHeroesService.selectedHeroesSubject.subscribe((arr: string[]) => {
      this.selectedHeroesId = arr;
    }))
    this.selectedHeroesId.map((id: string) => {
      this.subscriptions.add(this.heroService.getById(id).subscribe((hero) => {
        this.selectedHeroes = [...this.selectedHeroes, hero];

        this.cd.markForCheck();
      }))
    })
  }

  public selectHero(id: string): void {
    this.router.navigate([this.routes.userInfo.path, this.routes.userHeroInfo.path]);
  }

  public deleteHero(id: string) {
    this.selectedHeroesService.removeHero(id);
    this.selectedHeroes = this.selectedHeroes.filter((hero: Hero) => {
      return hero.id !== id;
    })
  }

  public addHero(): void {
    this.router.navigate([this.routes.heroesRoot.path]);
  }

  public infoHero(id: string): void {
    this.router.navigate([this.routes.userInfo.path, this.routes.userHeroInfo.path], {
      queryParams: {
        id: id
      }
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
