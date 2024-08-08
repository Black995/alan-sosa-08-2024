<template>
  <div class="z-50 bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full">
      <div class="mt-4 ml-4" style="padding-top: 15px;">
        <button @click="back()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full flex items-center">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd"></path>
          </svg>
          Regresar
        </button>
      </div>
      <div class="flex">
        <div class="w-full sm:w-1/6 flex items-center justify-center">
          <img class="w-full rounded-t-lg sm:rounded-t-none sm:rounded-l-lg" :src="pokemon.pokemon_image" :alt="pokemon.name">
        </div>
        <div class="w-full sm:w-5/6 px-6 py-4">
          <h4 class="font-bold text-xl mb-2">{{ pokemon.name }}</h4>
          <div style="text-align: left !important;">
            <p class="text-gray-700 text-base justify-content-left">
              <b>Tipo: </b>
              <span v-for="type in pokemon.types" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {{ type.type.name }}
              </span>
            </p>
            <p class="text-gray-700 text-base justify-content-left">
              <b>Stats: </b>
              <span v-for="stat in pokemon.stats" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {{ stat.stat.name }}: {{ stat.base_stat }}
              </span>
            </p>
            <p class="text-gray-700 text-base justify-content-left">
              <b>Sonido: </b>
              <button
                  class="bg-white hover:bg-gray-200 text-black font-bold p-2 rounded-full"
                  @click="playAudio(pokemon.cry)"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </button>
            </p>
            <p class="text-gray-700 text-base justify-content-left">
              <b>Altura: </b>{{ (pokemon.height) / 10 }} m
            </p>
            <p class="text-gray-700 text-base justify-content-left">
              <b>Peso: </b>{{ (pokemon.weight) / 10 }} kg
            </p>
            <p class="text-gray-700 text-base justify-content-left">
              <b>Descripcion: </b>{{ description }}
            </p>
            <p class="text-gray-700 text-base flex justify-center">
              <b>Cadena evolutiva: </b>
            </p>
            <p class="text-gray-700 text-base flex justify-center">
              <span class="flex flex-wrap items-center">
                <span v-for="evol in evolutions" class="flex flex-col items-center mr-4">
                  <img :src="evol.pokemon_image" :alt="evol.name" class="w-16 h-16 rounded-full mb-2" />
                  <span>{{ evol.name }}</span>
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  

<script setup lang="ts">  
/**
 * librerias y modelos
 */
import { ref, onMounted } from 'vue'
import axios from "axios"
import { URL_POKE_API } from "../../config/config"
import { usePokemonStore } from '../store/PokemonStore';
import { Pokemon, PokemonDetail } from '../models/Pokemon';
import { useRoute, useRouter } from 'vue-router'
import { playAudio } from '../helpers';


// store de Pinia
const pokemonStore = usePokemonStore();

// router
const router = useRouter()
const route = useRoute()


/**
 * variables
 */
let pokeId = ref(0)
let pokemon = ref<PokemonDetail>({
  id: 0,
  name: '',
  url: '',
  pokemon_image: '',
  types: [],
  stats: [],
  cry: '',
  height: 0,
  weight: 0
})
let evolutions = ref<Pokemon[]>([])
let description = ref('')


/**
 * funciones
 */
onMounted(() => {
  const pokeIdString = route.params.id
  if (typeof pokeIdString === "string") {
    pokeId.value = parseInt(pokeIdString)
    pokemon.value = pokemonStore.getOnePokemon(pokeId.value)
    
    getEvolutions()
    getDescription()  
  }
})


async function getDescription() {
  axios
    .get(`${URL_POKE_API}/pokemon-species/${pokeId.value}`)
    .then((res:any) => {

      if(res.data.flavor_text_entries.length != 0) {
        const esFlavorText = res.data.flavor_text_entries.filter((entry: any) => entry.language.name === 'es');
        description = esFlavorText[0].flavor_text
      }

    })
    .catch((error) => {
      console.error(`Error al obtener la imagen del pokemon ${pokemon.value.name}: `, error)
    })

}


async function getPokemonImages() {
  evolutions.value.forEach((pokemon) => {
    axios
      .get(`${URL_POKE_API}/pokemon/${pokemon.name}/`)
      .then((res:any) => {
        pokemon.pokemon_image = res.data.sprites.front_default
      })
      .catch((error) => {
        console.error(`Error al obtener la imagen del pokemon ${pokemon.name}: `, error)
      })
  })
}


async function getEvolutions() {
  evolutions.value = []

  axios
    .get(`${URL_POKE_API}/evolution-chain/${pokeId.value}`)
    .then((res:any) => {
      // agregada la cadena evolutiva en caso de que exista
      addEvolution(res.data.chain.species.name, res.data.chain.species.url)
      if(res.data.chain.evolves_to.length != 0) {
        addEvolution(res.data.chain.evolves_to[0].species.name, res.data.chain.evolves_to[0].species.url)
        if(res.data.chain.evolves_to[0].evolves_to.length != 0) {
          addEvolution(res.data.chain.evolves_to[0].evolves_to[0].species.name, res.data.chain.evolves_to[0].evolves_to[0].species.url)        
        }
      }

      getPokemonImages()

    })
    .catch((error) => {
      console.error(`Error al obtener la cadena evolutiva del pokemon ${pokemon.value.name}: `, error)
    })
}


function addEvolution(name:string, url:string) {
  let poke:Pokemon = {
    name: name,
    url: url,
    pokemon_image: ''
  }
  evolutions.value.push(poke)
}


function back() {
  router.push(`/team`)
}

</script>

<style scoped>

</style>