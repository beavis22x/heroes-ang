import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import { HeroesService } from '../../utils/services/heroes.service';

import { Hero } from '../../utils/interfaces/hero.interface';

import { SEARCH_FIELDS_ENUM } from '../../utils/enum/form-field.enum';

import { alphabetArray } from '../../utils/const/validators.const';
import { SEARCH_DELAY } from '../../utils/const/unsort.consts';

import { searchPanelRegEx } from '../../utils/RegExp/login.regExp';

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
  public searches = 'a';
  public recentView = false;
  public alphabet: string[] = alphabetArray;
  public alphabetView = false;
  public searchList: string[] = [];
  public searchFieldEnum = SEARCH_FIELDS_ENUM;

  constructor(
    private heroService: HeroesService,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.formInit();
    this.searchPanelListener();
    this.getHeroes();
  }

  public formInit(): void {
    this.form = new FormGroup({
      search_panel: new FormControl('', [
        Validators.pattern(searchPanelRegEx),
      ])
    })
  }

  public searchPanelListener(): void {
    this.subscriptions.add(this.form.get(this.searchFieldEnum.search)?.valueChanges
      .pipe(
        debounceTime(SEARCH_DELAY),
        distinctUntilChanged()
      )
      .subscribe((term: string) => {
        this.searches = term;
        this.searchList = [...this.searchList, term];
        this.getHeroes();
      }))
  }

  public getHeroes(): void {
    this.subscriptions.add(this.heroService.getByName(this.searches).subscribe((heroes: Hero[]) => {
      this.heroes = heroes

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
