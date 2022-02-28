import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedHeroesService {
  private selectedHeroes$$ = new BehaviorSubject<Hero[]>([]);

  public get getSelectedHeroes$(): Observable<Hero[]>{
    return this.selectedHeroes$$.asObservable();
  }

  public addHero(hero: Hero): void {
      this.selectedHeroes$$.next([...this.selectedHeroes$$.getValue(), hero]);
  }

  public removeHero(id: string): void {
    this.selectedHeroes$$.next(
      this.selectedHeroes$$.getValue().filter((hero: Hero) => {
        return id !== hero.id;
      })
    )
  }
}
