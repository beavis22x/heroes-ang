import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../utils/services/auth.service';

import { RouteConfigs } from '../utils/interfaces/routes.interfaces';

import { ROUTE_CONFIGS } from '../utils/const/routes.consts';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  public routes: RouteConfigs = ROUTE_CONFIGS;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  public logout(): void {
    this.auth.logOut();
    this.router.navigate([this.routes.login.path]);
  }
}
