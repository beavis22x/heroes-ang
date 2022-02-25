import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { filter, Subscription } from 'rxjs';

import { HeroesService } from '../../../utils/services/heroes.service';

import { Hero } from '../../../utils/interfaces/hero.interface';

@Component({
  selector: 'app-user-hero-info',
  templateUrl: './user-hero-info.component.html',
  styleUrls: ['./user-hero-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserHeroInfoComponent implements OnInit, OnDestroy {
  public heroId!: string;
  public hero!: Hero;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroesService,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.getHero();
  }

  public initHeroId(): void {
    this.route.queryParams.pipe(
      filter((params: Params) => Boolean(params['id']))
    ).subscribe((params: Params) => {
      this.heroId = params['id'];
    })
  }

  public getHero(): void {
    this.initHeroId();
    this.subscriptions.add(this.heroService.getById(this.heroId).subscribe((hero: Hero) => {
      this.hero = hero;

      this.cd.markForCheck();
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
