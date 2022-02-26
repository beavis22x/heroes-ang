import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedHeroesService {
  private selectedHeroesSubject$$ = new BehaviorSubject<Hero[]>([]);

  public get getSelectedHeroes$(): Observable<Hero[]>{
    return this.selectedHeroesSubject$$.asObservable();
  }

  public addHero(hero: Hero): void {
      this.selectedHeroesSubject$$.next([...this.selectedHeroesSubject$$.getValue(), hero]);
  }

  public removeHero(id: string): void {
    this.selectedHeroesSubject$$.next(
      this.selectedHeroesSubject$$.getValue().filter((hero: Hero) => {
        return id !== hero.id;
      })
    )
  }
}
