import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { ROUTE_CONFIGS } from '../const/routes.consts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.auth.isAuthenticated()) {
      this.redirect()
    }

    return this.auth.isAuthenticated()
  }

  public redirect():void {
    this.router.navigate([ROUTE_CONFIGS.login.path], {
      queryParams: {
        loginAgain: true
      }
    })
  }

}
