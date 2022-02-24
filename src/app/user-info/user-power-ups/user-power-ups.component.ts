import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PowerUps } from '../../utils/interfaces/power-ups.interfaace';

import { POWER_UPS } from '../../utils/const/powerUps.consts';

@Component({
  selector: 'app-user-power-ups',
  templateUrl: './user-power-ups.component.html',
  styleUrls: ['./user-power-ups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPowerUpsComponent implements OnInit {
  public powerUps: PowerUps[] = POWER_UPS;
  constructor() { }

  ngOnInit(): void {
    console.log(this.powerUps)
  }

  private getPowerUps(): void {

  }
}
