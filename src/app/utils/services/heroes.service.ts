import { Injectable } from '@angular/core';

import { map, Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Hero } from '../interfaces/hero.interface';

import { API } from '../API/superhero.api';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) {
  }

  getByName(name: string): Observable<Hero[]> {
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get(`${API.name}/${name}`)
      .pipe(map((response: {[key: string]: any }) => {
        return Object.keys(response.results)
          .map(key => ({
            id: response.results[key].id,
            name: response.results[key].name,
            powerstats: response.results[key].powerstats,
            image: response.results[key].image.url,
          }))
      }))
  }

  getById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${API.id}/${id}`)
      .pipe(map((hero: Hero) => {
        return {
          ...hero,
          id,
        }
      }))
  }
}
