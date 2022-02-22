import { Injectable } from '@angular/core';

import { HistoryObj } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  public sortDate(array: HistoryObj[], direction: boolean): HistoryObj[] {
    const sortedArray = array.sort((a, b) => {
        const keyA = new Date(a.date);
        const keyB = new Date(b.date);

        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

    return direction
      ? sortedArray.reverse()
      : sortedArray
  }

  public sortByAlphabet(array: HistoryObj[], direction: boolean, act: string): HistoryObj[] {
    const sorter = (act: string) => (a: any, b: any) => {
      return a[act].toLowerCase() > b[act].toLowerCase() ? 1 : -1;
    }
    const sortedArray = array.sort(sorter(act));

    return direction
      ? sortedArray.reverse()
      : sortedArray
  }
}
