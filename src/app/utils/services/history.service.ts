import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { HistoryObj } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historySubject$$ = new BehaviorSubject<HistoryObj[]>([]);

  public get getHistorySubject$(): Observable<HistoryObj[]> {
    return this.historySubject$$.asObservable();
  }

  public set addBattleInHistory(history: HistoryObj) {
    this.historySubject$$.next([...this.historySubject$$.getValue(), history]);
  }
}
