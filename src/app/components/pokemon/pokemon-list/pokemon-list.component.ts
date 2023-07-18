import { Component,OnInit, ViewChild } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/service/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pokemons: Pokemon[] = [];
  pokemonSeleccionado: any = [];
  pokemonsFiltrados: Pokemon[] = [];
  buscarPokemon: string = '';


  @ViewChild('PokemonDetailsModal') PokemonDetailsModal: any;

  constructor(private pokemonService: PokemonService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getPokemons();
  }

  abrirPokemonDetallesModal(character: any) {
    this.pokemonSeleccionado = character;
    this.modalService.open(this.PokemonDetailsModal, { centered: true });
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.pokemonsFiltrados = pokemons;
      }
    );
  }

  buscarPokemons() {
    this.pokemonsFiltrados = this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.buscarPokemon.toLowerCase())
    );
  }

}
