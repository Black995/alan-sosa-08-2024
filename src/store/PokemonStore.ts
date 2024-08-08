// store/pokemon.js
import { defineStore } from 'pinia';
import axios from "axios";
import { Pokemon, PokemonDetail } from '../models/Pokemon';

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        selectedPokemons: [] as PokemonDetail[]
    }),
    actions: {
        assignTeam(pokemons:Pokemon[]) {
            // vaciamos los pokemon que se tenian guardados para guardar a los nuevos
            this.selectedPokemons = []

            pokemons.forEach(poke => {
                axios
                    .get(poke.url)
                    .then((res:any) => {
                        // guardar en this.selectedPokemons los datos del Pokemon obtenido desde la API
                        let newPoke:PokemonDetail = {
                            'id': res.data.id,
                            'name': poke.name,
                            'url': poke.url,
                            'pokemon_image': poke.pokemon_image,
                            'types': res.data.types,
                            'stats': res.data.stats,
                            'cry': res.data.cries.latest,
                            'height': res.data.height,
                            'weight': res.data.weight
                        }
                        this.selectedPokemons.push(newPoke);
                    })
                    .catch((error) => {
                        console.error(`Error al obtener detalle del pokemon ${poke.name}: `, error)
                    })
                    
            });
        },
        getOnePokemon(id:number) {
            return this.selectedPokemons.filter(function (poke) {
                return poke.id == id
              })[0];
        },
        getSelectedPokemons() {
            return this.selectedPokemons;
        },
        deletePokemon(id:number) {
            this.selectedPokemons = this.selectedPokemons.filter(obj => obj.id !== id);
        }
    }
});