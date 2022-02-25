import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { PowerUps } from '../interfaces/power-ups.interfaace';
import { POWER_UPS } from '../const/powerUps.consts';

@Injectable({
  providedIn: 'root'
})
export class PowerUpsService {
  public powerUpsSubject = new BehaviorSubject<PowerUps[]>([
    POWER_UPS[0],
    POWER_UPS[1],
    POWER_UPS[2],
    POWER_UPS[3],
    POWER_UPS[4],
    POWER_UPS[5],
  ]);

  public usePowerUp(id: number): void {
    this.powerUpsSubject.next(
      this.powerUpsSubject.getValue().map((item: PowerUps) => {
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

  public offActiveUp(id: number): void {
    this.powerUpsSubject.next(
      this.powerUpsSubject.getValue().map((item: PowerUps) => {
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
