import { Injectable } from '@angular/core';

import { User } from '../interfaces/form.interfaces';

import { AUTH_ENUM } from '../enum/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken = AUTH_ENUM;

  constructor() { }

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem(this.authToken.token_expire));

    if(new Date() > expDate) {
      this.logOut();

      return null;
    }
    return localStorage.getItem(this.authToken.token);
  }

  public logIn(user: User): void {
    if(user.email === localStorage.getItem(<string>user.email) && this.token) {
      this.setToken();
    } else {
      return
    }
  }

  public logOut(): void {
    this.setToken(true);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  private setToken(flag?: boolean): void {
    if(!flag) {
      const sixHour = 3600 * 6 * 1000;
      const expiresDate = new Date(new Date().getTime() + sixHour);
      const token = btoa(Math.random().toString()).substr(10, 5);

      localStorage.setItem(this.authToken.token, token);
      localStorage.setItem(this.authToken.token_expire, expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
