import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SEARCH_FIELD_ENUM } from '../../utils/enum/form-field.enum';

import { searchPanelRegEx } from '../../utils/RegExp/login.regExp';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes-select-page.component.html',
  styleUrls: ['./heroes-select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesSelectPageComponent implements OnInit{
  public form!: FormGroup;
  public searchFieldEnum = SEARCH_FIELD_ENUM;

  constructor() {
  }

  public ngOnInit(): void {
    this.formInit();
  }

  public formInit(): void {
    this.form = new FormGroup({
      search_panel: new FormControl('', [
        Validators.pattern(searchPanelRegEx),
      ])
    })
  }

  public checkValid(fieldStr: string): boolean {
    return Boolean(this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }
}
