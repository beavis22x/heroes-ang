import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { HistoryObj } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private history$$ = new BehaviorSubject<HistoryObj[]>([]);

  public get getHistorySubject$(): Observable<HistoryObj[]> {
    return this.history$$.asObservable();
  }

  public set addBattleInHistory(history: HistoryObj) {
    this.history$$.next([...this.history$$.getValue(), history]);
  }
}
