import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { PowerUps } from '../interfaces/power-ups.interface';

import { POWER_UPS } from '../const/power-ups.consts';

@Injectable({
  providedIn: 'root'
})
export class PowerUpsService {
  private powerUps$$ = new BehaviorSubject<PowerUps[]>([...POWER_UPS]);

  public get getPowerUps$ (): Observable<PowerUps[]> {
    return this.powerUps$$.asObservable();
  }

  public usePowerUp(id: number): void {
    this.powerUps$$.next(
      this.powerUps$$.getValue().map((item: PowerUps) => {
        if (id === item.id && item.remainAmount > 0) {
          return {
            ...item,
            remainAmount: item.remainAmount - 1,
            active: true,
          }
        }
        return item;
      })
    )
  }

  public resetActivePowerUp(id: number): void {
    this.powerUps$$.next(
      this.powerUps$$.getValue().map((item: PowerUps) => {
        if (id === item.id && item.remainAmount > 0) {
          return {
            ...item,
            active: !item.active,
          }
        }
        return item;
      })
    )
  }
}
