import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../utils/services/auth.service';

import { User } from '../utils/interfaces/form.interfaces';
import { RouteConfigs } from '../utils/interfaces/routes.interfaces';

import { REGISTER_FIELDS_ENUM } from '../utils/enum/form-field.enum';

import { ROUTE_CONFIGS } from '../utils/const/routes.consts';
import { MIN_LENGTH_LOGIN, MIN_LENGTH_PATH } from '../utils/const/validators.const';

import { emailRegEx, loginRegEx, passwordRegEx } from '../utils/RegExp/login.regExp';

import { randomId } from '../utils/functions/common.functions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;
  public fieldFormEnum = REGISTER_FIELDS_ENUM;
  public routes: RouteConfigs = ROUTE_CONFIGS;
  private submitted: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  get isDisabled(): boolean {
    return this.form.invalid || this.submitted
  }

  public ngOnInit(): void {
    this.formInit();
  }

  public formInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_LENGTH_LOGIN),
          Validators.pattern(loginRegEx),
        ]
      ),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegEx),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_LENGTH_PATH),
        Validators.pattern(passwordRegEx),
      ]),
    })
  }

  public checkValid(fieldStr: string): boolean {
    return Boolean(this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  public registration(): void{
    if (this.form?.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value?.email,
      password: this.form.value?.password,
      id: randomId()
    }

    this.auth.signUp(user);
    this.router.navigate([this.routes.heroesRoot.path]);
    this.form.reset();
  }
}
