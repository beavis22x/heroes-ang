import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../utils/services/auth.service';

import { User } from '../../utils/interfaces/form.interfaces';

import { LOGIN_FIELDS_ENUM } from '../../utils/enum/form-field.enum';

import { minLengthPass } from '../../utils/const/validators.const';

import { emailRegEx, passwordRegEx } from '../../utils/RegExp/login.regExp';

import { randomId } from '../../utils/functions/common.functions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public fieldFormEnum = LOGIN_FIELDS_ENUM;
  private submitted: boolean = false;

  constructor(private auth: AuthService) { }

  get isDisabled(): boolean {
   return this.form.invalid || this.submitted
  }

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
        Validators.minLength(minLengthPass),
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
      id: randomId()
    };

    this.auth.logIn(user);
    this.submitted = true;
    this.form.reset();
  }

  public checkValid(fieldStr: string): boolean {
    return Boolean(this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  public register(): void {
  }
}
