import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../utils/interfaces/form.interfaces';
import { LOGIN_FIELDS_ENUM } from '../../utils/enum/form-field.enum';
import { emailRegEx, passwordRegEx } from '../../utils/RegExp/login.regExp';
import { AuthService } from '../../utils/services/auth.service';

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

  constructor(private auth: AuthService) { }

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
        Validators.minLength(5),
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

  register() {
    localStorage.setItem('23451', JSON.stringify({
      email: 'new.email.user@dd.co',
      password: 'ssD12@#$dd',
      id: '23451',
    }) )
  }
}
