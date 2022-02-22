import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { HistoryService } from '../../utils/services/history.service';
import { SortService } from '../../utils/services/sort.service';

import { HistoryObj } from '../../utils/interfaces/history.interface';

import { HERO, OPPONENT, RESULT } from '../../utils/const/sort.consts';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  public historyArray: HistoryObj[] = [];
  public subscriptions: Subscription = new Subscription();
  public dateDir = false;
  public heroDir = false;
  public opponDir = false;
  public resultDir = false;

  constructor(
    private historyService: HistoryService,
    private sortService: SortService
  ) { }

  public ngOnInit(): void {
    this.initHistory();
  }

  public initHistory(): void {
    this.subscriptions.add(this.historyService.historySubject.subscribe((arr: HistoryObj[]) => {
      this.historyArray = arr;
    }))
  }

  public sortDate(): void {
    this.historyArray = this.sortService.sortDate(this.historyArray, this.dateDir);
    this.dateDir = !this.dateDir;
  }

  public sortHero():void {
    this.historyArray = this.sortService.sortByAlphabet(this.historyArray, this.heroDir, HERO);
    this.heroDir = !this.heroDir;
  }

  public sortOpponent():void {
    this.historyArray = this.sortService.sortByAlphabet(this.historyArray, this.opponDir, OPPONENT);
    this.opponDir = !this.opponDir;
  }

  public sortResult():void {
    this.historyArray = this.sortService.sortByAlphabet(this.historyArray, this.resultDir, RESULT);
    this.resultDir = !this.resultDir;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
