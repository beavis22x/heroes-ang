import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { HistoryObj } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public historySubject = new BehaviorSubject<HistoryObj[]>([{
    date: new Date,
    hero: 'Hero',
    opponent: 'Loh',
    result: 'win',
  },
  {
    date: new Date(new Date().setHours(new Date().getHours() + 1)),
    hero: 'Lego',
    opponent: 'Coh',
    result: 'lose',
  },
  {
    date: new Date(new Date().setHours(new Date().getHours() + 1)),
    hero: 'Ago',
    opponent: 'Coh',
    result: 'win',
  }
    ]);

  public addBattle(history: HistoryObj): void {
    this.historySubject.next([...this.historySubject.getValue(), history]);
  }
}
