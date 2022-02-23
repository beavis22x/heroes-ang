import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { POWER_UPS } from '../../utils/const/powerUps.consts';
import { PowerUps } from '../../utils/interfaces/power-ups.interfaace';

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
    this.getPowerUps();
  }

  private getPowerUps(): void {

  }
}
