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
    this.setToken();
    // console.log(user.id)
    if(user.id === localStorage.getItem(<string>user.id) && this.token) {

    }

    // return this.http.post<FbAuthResponse | null>(
    //   `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
    //   user
    // ).pipe(
    //   tap(this.setToken),
    //   catchError(() => of(this.handleError.bind(this)))
    // )
  }

  public logOut(): void {
    this.setToken(true);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  // public handleError(error: HttpErrorResponse): void {
  //   const {message} = error?.error?.error;
  //
  //   switch(message) {
  //     case INVALID_PASSWORD:
  //       this.error$.next('Неверный пароль')
  //       break;
  //     case EMAIL_NOT_FOUND:
  //       this.error$.next('Данный email не зарегистрирован')
  //       break;
  //   }
  // }

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
