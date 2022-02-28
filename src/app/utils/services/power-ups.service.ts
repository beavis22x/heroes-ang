import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { PowerUps } from '../interfaces/power-ups.interface';

import { POWER_UPS } from '../const/power-ups.consts';

@Injectable({
  providedIn: 'root'
})
export class PowerUpsService {
  private powerUpsSubject$$ = new BehaviorSubject<PowerUps[]>([...POWER_UPS]);

  public get getPowerUps$ (): Observable<PowerUps[]> {
    return this.powerUpsSubject$$.asObservable();
  }

  public usePowerUp(id: number): void {
    this.powerUpsSubject$$.next(
      this.powerUpsSubject$$.getValue().map((item: PowerUps) => {
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
    this.powerUpsSubject$$.next(
      this.powerUpsSubject$$.getValue().map((item: PowerUps) => {
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
