import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { User } from '../interfaces/form.interfaces';

import { generateToken } from '../functions/common.functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: StorageService) { }

  get token(): string | null {
    const expDate = new Date(<string>this.storage.getTokenExpire());

    if(new Date() > expDate) {
      this.logOut();

      return null;
    }
    return this.storage.getToken();
  }

  public logIn(): void {
    if(!this.token) {
      this.setToken();
    }
  }

  public signUp(user: User): void {
    this.storage.setUser(user);
    this.setToken();
  }

  public logOut(): void {
    this.setToken(true);
  }

  public isAuthenticated(): boolean {
    return Boolean(<string>this.token);
  }

  private setToken(flag?: boolean): void {
    if(!flag) {
      const sixHour = 3600 * 6 * 1000;
      const expiresDate = new Date(new Date().getTime() + sixHour);
      const token = generateToken();

      this.storage.setToken(token);
      this.storage.setTokenExpire(expiresDate);
    } else {
      this.storage.clearToken();
    }
  }
}
