import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { HeroesService } from '../../utils/services/heroes.service';

import { Hero } from '../../utils/interfaces/hero.interface';
import { PowerUps } from '../../utils/interfaces/power-ups.interfaace';

import { POWER_UPS } from '../../utils/const/powerUps.consts';
import { EMPTY_STRING } from '../../utils/const/validators.const';
import { RESULT_LOSE, RESULT_WIN } from '../../utils/const/unsort.consts';

import { getRandomId } from '../../utils/functions/common.functions';

@Component({
  selector: 'app-battle-page-component',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BattlePageComponent implements OnInit, OnDestroy {
  public toggleModal = false;
  public battleResult = EMPTY_STRING;
  public form!: FormGroup;
  public hero!: Hero;
  public opponent!: Hero;
  public powerUps: PowerUps[] = POWER_UPS;
  public selectPowerUp!: PowerUps;
  public subscriptions: Subscription = new Subscription();
  public heroPower = 0;
  public opponentPower = 0;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroesService,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.initBattle();
    this.initForm();
    this.changeUp();
  }

  public initForm(): void {
    this.form = new FormGroup({
      select: new FormControl(null)
    })
  }

  public initBattle(): void {
    this.getHero();
    this.getOpponent();
  }

  public getHero(): void {
    this.subscriptions.add(this.heroService.getById("12").subscribe((hero: Hero) => {
      this.hero = hero;

      this.cd.markForCheck();
    }))
  }

  public getOpponent(): void {
    this.subscriptions.add(this.heroService.getById(getRandomId()).subscribe((opponent: Hero) => {
      this.opponent = opponent;

      this.cd.markForCheck();
    }))
  }

  public changeUp():void {
    this.subscriptions.add(this.form.get('select')?.valueChanges.subscribe((up) => {
      this.selectPowerUp = up;
    }))
  }

  public chooseUp(): void {
    if(this.form.get('select')?.dirty) {
      const ability = this.selectPowerUp.description.slice(0, -4);
      const improve = Number(this.hero.powerstats[ability]) + 10;

      this.hero.powerstats[ability] = improve.toString();
      this.powerUps = this.powerUps.map((item) => {
        if(item.id === this.selectPowerUp.id && item.remainAmount > 0) {
          return {
            ...item,
            active: !item.active,
            remainAmount: item.remainAmount - 1
          }
        }

        return item;
      })
      console.log(this.powerUps)
    }

  }

  public fight(): void {
    this.calcResultBattle();
    this.toggleModal = !this.toggleModal;
  }

  public calcHeroPower(): void {
    const entries = Object.entries(this.hero.powerstats);
    entries.map((arr: [string, string]) => {
      if (arr[1] === 'null') {
        return;
      }

      return this.heroPower += Number(arr[1]);
    })
  }

  public calcOpponentPower(): void {
    const entries = Object.entries(this.opponent.powerstats);
    entries.map((arr: [string, string]) => {
      if (arr[1] === 'null') {
        return;
      }

      return this.opponentPower += Number(arr[1]);
    })
  }

  public calcResultBattle() {
    this.calcHeroPower();
    this.calcOpponentPower();
    this.heroPower > this.opponentPower
      ? this.battleResult = RESULT_WIN
      : this.battleResult = RESULT_LOSE
    console.log(this.heroPower)
  }

  public closeModal(): void {
    this.toggleModal = !this.toggleModal;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
