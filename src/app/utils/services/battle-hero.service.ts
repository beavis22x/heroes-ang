import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class BattleHeroService {
  private battleHero$$ = new BehaviorSubject<Hero>({} as Hero);

  public get getBattleHero$(): Observable<Hero> {
    return this.battleHero$$.asObservable();
  }

  public set setBattleHero(battleHero: Hero) {
    this.battleHero$$.next(battleHero);
  }
}
