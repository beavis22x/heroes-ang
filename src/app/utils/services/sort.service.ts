import { Injectable } from '@angular/core';

import { HistoryObj } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  public sortDate(array: HistoryObj[], direction: boolean): HistoryObj[] {
    const sortedArray = array.sort((a, b) => {
        const keyA = Number(new Date(a.date));
        const keyB = Number(new Date(b.date));

        return keyA - keyB;
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
