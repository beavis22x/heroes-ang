import { Injectable } from '@angular/core';

import { User } from '../interfaces/form.interfaces';

import { AUTH_ENUM } from '../enum/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public authToken = AUTH_ENUM;

  public getUser(key: boolean | string): User {
    return JSON.parse(<string>localStorage.getItem(<string>key));
  }

  public setUser(user: User): void {
    localStorage.setItem(<string>user.email, JSON.stringify(user));
  }

  public setToken(token: string): void {
    localStorage.setItem(this.authToken.token, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.authToken.token)
  }

  public setTokenExpire(expiresDate: Date): void {
    localStorage.setItem(this.authToken.token_expire, expiresDate.toString());
  }

  public getTokenExpire(): string | null  {
    return localStorage.getItem(this.authToken.token_expire);
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
