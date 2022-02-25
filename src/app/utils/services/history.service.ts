import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { HistoryObj } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public historySubject = new BehaviorSubject<HistoryObj[]>([]);

  public addBattle(history: HistoryObj): void {
    this.historySubject.next([...this.historySubject.getValue(), history]);
  }
}
