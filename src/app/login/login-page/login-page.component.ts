import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../utils/services/auth.service';
import { StorageService } from '../../utils/services/storage.service';

import { RouteConfigs } from '../../utils/interfaces/routes.interfaces';

import { ALERT_ENUM, LOGIN_FIELDS_ENUM } from '../../utils/enum/form-field.enum';

import { emptyString, minLengthPass } from '../../utils/const/validators.const'
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
  public routes: RouteConfigs = ROUTE_CONFIGS;
  public messageInfo = emptyString;
  public messageDanger = emptyString;
  private submitted: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageService,
  ) {
  }

  get isDisabled(): boolean {
    return this.form.invalid || this.submitted
  }

  public ngOnInit(): void {
    this.validationInit();
    this.formInit();
  }

  public validationInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.messageInfo = ALERT_ENUM.loginAgain;
      }
    })
  }

  public formInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegEx),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(minLengthPass),
        Validators.pattern(passwordRegEx),
      ]),
    })
  }

  public submit(): void {
    const userObj = this.storage.getUser(this.form.value?.email);

    if (this.form.value?.email !== userObj?.email) {
      this.messageDanger = ALERT_ENUM.unsigned;
    } else {
      this.auth.logIn();
      this.submitted = true;
      this.router.navigate([this.routes.heroesRoot.path]);
      this.form.reset();
    }
  }

  public checkValid(fieldStr: string): boolean {
    return Boolean(this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  public register(): void {
    this.router.navigate([this.routes.registration.path])
  }
}
