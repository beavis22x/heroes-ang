import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectBattleHeroService {
  private battleHeroSubject$$ = new BehaviorSubject<Hero>({} as Hero);
  public _battleHeroObservable$: Observable<Hero> = this.battleHeroSubject$$.asObservable();

  public get getBattleHeroId(): Observable<Hero> {
    return this._battleHeroObservable$;
  }

  public set selectBattleHero(battleHero: Hero) {
    this.battleHeroSubject$$.next(battleHero);
  }

}
