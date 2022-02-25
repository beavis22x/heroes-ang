import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouteConfigs } from '../../utils/interfaces/routes.interfaces';

import { ROUTE_CONFIGS } from '../../utils/const/routes.consts';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  public routes: RouteConfigs = ROUTE_CONFIGS;
}
