import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { HeroesService } from '../../utils/services/heroes.service';

import { Hero } from '../../utils/interfaces/hero.interface';
import { PowerUps } from '../../utils/interfaces/power-ups.interfaace';

import { SELECT_ENUM } from '../../utils/enum/form-field.enum';

import { POWER_UPS } from '../../utils/const/powerUps.consts';
import { EMPTY_STRING } from '../../utils/const/validators.const';
import { NULL_STRING, RESULT_LOSE, RESULT_WIN } from '../../utils/const/unsort.consts';

import { getRandomId } from '../../utils/functions/common.functions';
import { HistoryService } from '../../utils/services/history.service';
import { HistoryObj } from '../../utils/interfaces/history.interface';
import { PowerUpsService } from '../../utils/services/powerUps.service';

@Component({
  selector: 'app-battle-page-component',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class BattlePageComponent implements OnInit, OnDestroy {
  public toggleModal = false;
  public battleResult = EMPTY_STRING;
  public form!: FormGroup;
  public formFields = SELECT_ENUM;
  public hero!: Hero;
  public opponent!: Hero;
  public powerUps: PowerUps[] = [];
  public selectPowerUp!: PowerUps;
  public subscriptions: Subscription = new Subscription();
  public heroPower = 0;
  public opponentPower = 0;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroesService,
    private cd: ChangeDetectorRef,
    private historyService: HistoryService,
    private powerService: PowerUpsService
  ) {
  }

  public ngOnInit(): void {
    this.initBattle();
    this.initForm();
    this.initPowerUps()
    this.changeUp();
    console.log(this.powerService.powerUpsSubject.getValue())
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

  public initPowerUps(): void {
    this.subscriptions.add(this.powerService.powerUpsSubject.subscribe((arr: PowerUps[]) => {
      this.powerUps = arr;
    }))
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
    this.subscriptions.add(this.form.get(this.formFields.select)?.valueChanges.subscribe((up) => {
      this.selectPowerUp = up;
    }))
  }

  public chooseUp(): void {
    if(this.form.get(this.formFields.select)?.dirty) {
      const ability = this.selectPowerUp.description.slice(0, -4);
      const improve = Number(this.hero.powerstats[ability]) + 10;

      this.powerService.usePowerUp(this.selectPowerUp.id)
      this.hero.powerstats[ability] = improve.toString();
      console.log(this.powerUps)
    }

  }

  public fight(): void {
    this.calcResultBattle();
    this.setBattleHistory();
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
      if (arr[1] === NULL_STRING) {
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
  }

  public setBattleHistory():void {
    const history: HistoryObj = {
      date: new Date,
      hero: this.hero.name,
      opponent: this.opponent.name,
      result: this.battleResult
    }

    this.historyService.addBattle(history);
  }

  public closeModal(): void {
    if(this.battleResult === RESULT_WIN) {
      this.getOpponent();
    }

    this.powerService.offActiveUp(this.selectPowerUp.id);
    this.toggleModal = !this.toggleModal;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
