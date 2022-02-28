import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription, switchMap } from 'rxjs';

import { HeroesService } from '../../utils/services/heroes.service';
import { PowerUpsService } from '../../utils/services/power-ups.service';
import { HistoryService } from '../../utils/services/history.service';
import { BattleHeroService } from '../../utils/services/battle-hero.service';

import { Hero } from '../../utils/interfaces/hero.interface';
import { PowerUps } from '../../utils/interfaces/power-ups.interface';
import { HistoryObj } from '../../utils/interfaces/history.interface';

import { SELECT_ENUM } from '../../utils/enum/form-field.enum';

import { battleResult } from '../../utils/types/type';

import { getRandomId } from '../../utils/functions/common.functions';

@Component({
  selector: 'app-battle-page-component',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlePageComponent implements OnInit, OnDestroy {
  public toggleModal = false;
  public battleResult!: battleResult;
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
    private powerUpsService: PowerUpsService,
    private battleHeroService: BattleHeroService
  ) {
  }

  public ngOnInit(): void {
    this.initBattle();
    this.initForm();
    this.initPowerUps()
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

  public initPowerUps(): void {
    this.subscriptions.add(this.powerUpsService.getPowerUps$
      .subscribe((arr: PowerUps[]) => {
        this.powerUps = arr;
      }))
  }

  public getHero(): void {
    this.subscriptions.add(this.battleHeroService.getBattleHero$
      .pipe(
        switchMap((hero: Hero) =>
          this.heroService.getById(hero?.id || getRandomId())
        )
      )
      .subscribe((hero: Hero) => {
        this.hero = hero;

        this.cd.markForCheck();
      }))
  }

  public getOpponent(): void {
    this.subscriptions.add(this.heroService.getById(getRandomId())
      .subscribe((opponent: Hero) => {
        this.opponent = opponent;

        this.cd.markForCheck();
      }))
  }

  public changeUp(): void {
    this.subscriptions.add(this.form.get(this.formFields.select)?.valueChanges
      .subscribe((powerUp) => {
        this.selectPowerUp = powerUp;
      }))
  }

  public chooseUp(): void {
    if (this.form.get(this.formFields.select)?.dirty && this.selectPowerUp.remainAmount > 0) {
      const ability = this.selectPowerUp.attribute;
      const bonus = this.selectPowerUp.bonus;
      const improve = Number(this.hero.powerstats[ability]) + bonus;

      this.powerUpsService.usePowerUp(this.selectPowerUp.id);
      this.hero.powerstats[ability] = improve.toString();
    }
  }

  public fight(): void {
    this.calcBattleResult();
    this.setBattleHistory();
    this.toggleModal = !this.toggleModal;
  }

  public calcHeroPower(): void {
    const powerArr = Object.entries(this.hero.powerstats).map((item:[string, string] ) => {
      return Number(item[1]);
    });
    this.heroPower= powerArr.reduce((sum: number, next: number): number => {
      if (isNaN(next)) {
        return sum;
      }

      return sum + next;
    },0)
  }

  public calcOpponentPower(): void {
    const powerArr = Object.entries(this.opponent.powerstats).map((item:[string, string] ) => {
      return Number(item[1]);
    });
    this.opponentPower= powerArr.reduce((sum: number, next: number): number => {
      if (isNaN(next)) {
        return sum;
      }

      return sum + next;
    },0)
  }

  public calcBattleResult() {
    this.calcHeroPower();
    this.calcOpponentPower();
    this.heroPower > this.opponentPower
      ? this.battleResult = "WIN"
      : this.battleResult = "LOSE"
  }

  public setBattleHistory(): void {
    const history: HistoryObj = {
      date: new Date(),
      hero: this.hero?.name,
      opponent: this.opponent?.name,
      result: this.battleResult
    }

    this.historyService.addBattleInHistory = history;
  }

  public closeModal(): void {
    if (this.battleResult === "WIN") {
      this.getOpponent();
    }

    this.powerUpsService.resetActivePowerUp(this.selectPowerUp?.id);
    this.toggleModal = !this.toggleModal;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
