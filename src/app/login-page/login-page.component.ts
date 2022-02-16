import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../utils/interfaces/form.interfaces';
import { FIELD_FORM_ENUM } from '../utils/enum/form-field.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public fieldFormEnum = FIELD_FORM_ENUM;
  public submitted!: boolean;

  constructor() { }

  public ngOnInit(): void {
    this.formInit();
  }

  public formInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^([0-9a-zA-Z.]{3,})@([a-zA-Z]{2,5})\.(com|net|org|co|us)$'),
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{5,}$'),
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
    }

    this.submitted = true;
      this.form.reset();
  }

  public checkValid(fieldStr: string): boolean | undefined {
    return (this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  register() {
    console.log(this.form)
  }
}
