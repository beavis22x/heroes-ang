import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PowerUpsService } from '../../../utils/services/power-ups.service';

import { PowerUps } from '../../../utils/interfaces/power-ups.interface';

@Component({
  selector: 'app-user-power-ups',
  templateUrl: './user-power-ups.component.html',
  styleUrls: ['./user-power-ups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPowerUpsComponent implements OnInit, OnDestroy {
  public powerUps: PowerUps[] = [];
  public subscriptions: Subscription = new Subscription();

  constructor(private powerService: PowerUpsService) {
  }

  ngOnInit(): void {
    this.getPowerUps();
  }

  private getPowerUps(): void {
    this.subscriptions.add(this.powerService.powerUpsSubject.subscribe((arr: PowerUps[]) => {
      this.powerUps = arr;
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
