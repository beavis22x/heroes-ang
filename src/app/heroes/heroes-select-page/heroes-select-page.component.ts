import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HeroesService } from '../../utils/services/heroes.service';

import { Hero } from '../../utils/interfaces/hero.interface';

import { SEARCH_FIELD_ENUM } from '../../utils/enum/form-field.enum';

import { searchPanelRegEx } from '../../utils/RegExp/login.regExp';
import { alphabetArray } from '../../utils/const/validators.const';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes-select-page.component.html',
  styleUrls: ['./heroes-select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesSelectPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public subscriptions: Subscription = new Subscription();
  public heroes: Hero[] = [];
  public results = 0;
  public searches = 'a';
  public recentView = false;
  public alphabet: string[] = alphabetArray;
  public alphabetView = false;
  public searchList: string[] = [];
  public searchFieldEnum = SEARCH_FIELD_ENUM;

  constructor(
    private heroService: HeroesService,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.formInit();
    this.onChanges();
    this.fetchHeroes();
  }

  public formInit(): void {
    this.form = new FormGroup({
      search_panel: new FormControl('', [
        Validators.pattern(searchPanelRegEx),
      ])
    })
  }

  public onChanges(): void {
    this.subscriptions.add(this.form.get('search_panel')?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.searches = term;
        this.searchList.push(term);
        this.fetchHeroes();
      }))
  }

  public fetchHeroes(): void {
    this.subscriptions.add(this.heroService.getByName(this.searches).subscribe((heroes: Hero[]) => {
      this.results = heroes.length;
      this.heroes = heroes.slice(0, 20);

      this.cd.markForCheck();
    }))
  }

  public checkValid(fieldStr: string): boolean {
    return Boolean(this.form.get(fieldStr)?.touched && this.form.get(fieldStr)?.invalid);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public toggleDisplayRecent(): void {
    this.recentView = !this.recentView;
  }

  public alphabetToggle(): void {
    this.alphabetView = !this.alphabetView;
  }

  public selectHero($event: MouseEvent, id: string): void {
    ($event.target as HTMLButtonElement).disabled = true;
  }

  public selectChar(char: string): void {
    this.form.patchValue({
      search_panel: char
    })
  }
}
