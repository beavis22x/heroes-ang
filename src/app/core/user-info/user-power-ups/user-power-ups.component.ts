import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { PowerUpsService } from '../../../utils/services/power-ups.service';

import { PowerUps } from '../../../utils/interfaces/power-ups.interface';

@Component({
  selector: 'app-user-power-ups',
  templateUrl: './user-power-ups.component.html',
  styleUrls: ['./user-power-ups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPowerUpsComponent implements OnInit, OnDestroy {
  public powerUps$!: Observable<PowerUps[]>;
  public subscriptions: Subscription = new Subscription();

  constructor(private powerUpsService: PowerUpsService) {
  }

  public ngOnInit(): void {
    this.initPowerUps();
  }

  private initPowerUps(): void {
    this.powerUps$ = this.powerUpsService.getPowerUps$
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
