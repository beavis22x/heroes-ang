import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { HistoryObj } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historySubject$$ = new BehaviorSubject<HistoryObj[]>([]);
  public _historyObservable$: Observable<HistoryObj[]> = this.historySubject$$.asObservable();

  public set addBattleInHistory(history: HistoryObj) {
    this.historySubject$$.next([...this.historySubject$$.getValue(), history]);
  }

  public get historySubject(): Observable<HistoryObj[]> {
    return this._historyObservable$;
  }
}
