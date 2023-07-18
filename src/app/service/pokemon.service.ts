import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiURL = 'https://pokeapi.co/api/v2/pokemon/';
  totalPokemons = 0;

  constructor(private http: HttpClient) {
    this.fetchTotalPokemons().subscribe(totalCount => {
      this.totalPokemons = totalCount;
    });
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  fetchTotalPokemons(): Observable<number> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon-species/').pipe(
      map((data: any) => data.count)
    );
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.fetchTotalPokemons().pipe(
      mergeMap(totalCount => {
        const requests: Observable<Pokemon>[] = [];
        for (let i = 0; i < 8; i++) {
          console.log(totalCount);
          const randomId = this.getRandomInt(1, totalCount);
          requests.push(this.http.get<any>(`${this.apiURL}${randomId}`).pipe(
            map((pokemon: any) => {
              return {
                id: pokemon.id,
                name: pokemon.name,
                base_experience: pokemon.base_experience,
                height: pokemon.height,
                weight: pokemon.weight,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
              };
            })
          ));
        }
        return forkJoin(requests);
      })
    );
  }
  getAngularJson() {
    return this.http.get<any>('/assets/angular.json');
  }
}
