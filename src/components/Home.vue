<template>
  <div class="container mx-auto py-8">
    <h5 class="text-3xl font-bold mb-4">¡Bienvenido a la Pokédex de Kanto!</h5>
    <div class="bg-white p-6 rounded-lg shadow">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-200 text-gray-700 font-bold">
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Imagen</th>
            <th class="px-4 py-2">Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="poke in pokemons" :key="poke.id" class="border-b hover:bg-gray-100">
            <td class="px-4 py-2">{{ poke.name }}</td>
            <td class="px-4 py-2">
              <img :src="poke.pokemon_image" :alt="poke.name" class="w-16 h-16 rounded-full" />
            </td>
            <td class="px-4 py-2 text-center">
              <input type="checkbox" class="form-checkbox text-blue-500" v-model="selectedPokemons" :value="poke" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-4">Usuarios seleccionados: {{ selectedPokemons.length }}</p>
    <button @click="printing()">click</button>
  </div>
</template>

<script setup lang="ts">

/**
 * Definimos interface con la estructura de los datos a recibir de la API
 */
interface Pokemon {
  id: number
  name: string
  url: string
  pokemon_image: string
}

/**
 * librerias
 */
import { ref, onMounted } from 'vue'
import axios from "axios"
import { URL_POKE_API } from "../../config/config"


/**
 * variables
 */
const pokemons = ref<Pokemon[]>([])
const selectedPokemons = ref<Pokemon[]>([])

let offset_api = ref(0)


/**
 * funciones
 */

onMounted(() => {
  console.log('Component mounted')
  getPokemons()
})


function getPokemons() {
  axios
    .get(`${URL_POKE_API}/pokemon?limit=25&offset=${offset_api.value}`)
    .then((res) => {
      console.log(res)

      pokemons.value = res.data.results
      getPokemonImages()
    })
}

function getPokemonImages() {
  pokemons.value.forEach((pokemon) => {
    axios
      .get(pokemon.url)
      .then((res) => {
        console.log(res)
        pokemon.pokemon_image = res.data.sprites.front_default
      })
      .catch((error) => {
        console.error(`Error al obtener la imagen del pokemon ${pokemon.name}: `, error)
      })
  })
}


function printing() {
  console.log(this.selectedPokemons)
}
</script>


<style scoped>
/* Add any custom styles here */
</style>