import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

import { API } from '../enum/superhero.api.enum';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) {
  }

  public getByName(name: string): Observable<Hero[]> {
    if (!name.trim()) {
      return of([]);
    }

    return this.http.get(`${API.byName}/${name}`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response?.results).map((key: string) => ({
            id: response.results[key].id,
            name: response.results[key].name,
            powerstats: response.results[key].powerstats,
            image: response.results[key].image.url,
          }))
        })
      )
  }

  getById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${API.byId}/${id}`)
      .pipe(map((hero: Hero) => {
        return {
          ...hero,
          id: hero.id,
          name: hero.name,
          powerstats: hero.powerstats,
          image: hero.image,
        };
      }))
  }
}
