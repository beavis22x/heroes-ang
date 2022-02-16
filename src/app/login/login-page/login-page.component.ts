import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../utils/services/auth.service';

import { RouteConfigs } from '../../utils/interfaces/routes.interfaces';
import { User } from '../../utils/interfaces/form.interfaces';

import { LOGIN_FIELDS_ENUM } from '../../utils/enum/form-field.enum';

import { minLength } from '../../utils/const/validators.const'
import { ROUTE_CONFIGS } from '../../utils/const/routes.consts';

import { emailRegEx, passwordRegEx } from '../../utils/RegExp/login.regExp';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public fieldFormEnum = LOGIN_FIELDS_ENUM;
  public submitted!: boolean;
  public routes: RouteConfigs = ROUTE_CONFIGS;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.formInit();
  }

  public formInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(emailRegEx),
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(minLength),
        Validators.pattern(passwordRegEx),
      ]),
    })
  }

  public submit(): void {
    if (this.form?.invalid) {
      return
    }

    const user: User = {
      email: this.form.value?.email,
      password: this.form.value?.password,
      id: String(Math.floor(Math.random() * 90000)),
    }
    this.auth.logIn(user);
    this.submitted = true;
      this.form.reset();
  }

  public checkValid(fieldStr: string): boolean | undefined {
    return (this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  public register(): void {
    this.router.navigate([this.routes.registration.path])
  }
}
