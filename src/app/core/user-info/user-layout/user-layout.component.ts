import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouteConfigs } from '../../../utils/interfaces/routes.interfaces';

import { ROUTE_CONFIGS } from '../../../utils/const/routes.consts';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent {
  public routes: RouteConfigs = ROUTE_CONFIGS;
}
