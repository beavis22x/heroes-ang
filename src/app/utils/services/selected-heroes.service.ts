import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedHeroesService {
  public selectedHeroesSubject = new BehaviorSubject<string[]>([]);

  public addHero(id: string): void {
      this.selectedHeroesSubject.next([...this.selectedHeroesSubject.getValue(), id]);
  }

  public removeHero(id: string): void {
    this.selectedHeroesSubject.next(
      this.selectedHeroesSubject.getValue().filter((elem: string) => {
        return id !== elem;
      })
    )
  }
}
