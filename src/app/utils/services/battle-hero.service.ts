import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class BattleHeroService {
  private battleHeroSubject$$ = new BehaviorSubject<Hero>({} as Hero);

  public get getBattleHero$(): Observable<Hero> {
    return this.battleHeroSubject$$.asObservable();
  }

  public set setBattleHero(battleHero: Hero) {
    this.battleHeroSubject$$.next(battleHero);
  }
}
