<template>
  <div class="container mx-auto py-8">
    <h5 class="text-3xl font-bold mb-4">¡Bienvenido a la Pokédex de Kanto!</h5>
    <div class="bg-white p-6 rounded-lg shadow">

      <div class="flex justify-between items-center my-2">
        <div class="flex space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ 'bg-purple-500 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page }"
            class="px-2 py-1 text-sm rounded-md cursor-pointer"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </div>
        <div>
          <button type="button"
            v-if="selectColumn"
            @click="assignTeam()"
            :disabled="selectedPokemons.length == 0"
            class="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center me-2 mb-2 dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-900
                    disabled:text-gray-400 dark:disabled:text-gray-600">
            Formar equipo
          </button>

          <button type="button"
            @click="selectColumn = !selectColumn" 
            class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
            Agregar a tu equipo
          </button>
        </div>
      </div>

      <table class="w-full table-fixed">
        <thead>
          <tr class="bg-violet-200 text-slate-700 font-bold">
            <th class="px-4 py-2">Imagen</th>
            <th class="px-4 py-2">Nombre</th>
            <th v-if="selectColumn" class="px-4 py-2">Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading" class="border-b hover:bg-gray-100">
            <td colspan="3" class="px-4 py-2">
              <div class="flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 mr-3 text-cyan-400" viewBox="0 0 24 24">
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </td>
          </tr>
          <tr v-else v-for="poke in pokemons" :key="poke.name" class="border-b hover:bg-gray-100">
            <td class="px-4 py-2 flex justify-center">
              <img :src="poke.pokemon_image" :alt="poke.name" class="w-16 h-16 rounded-full" />
            </td>
            <td class="px-4 py-2">
              <b>
                {{ poke.name }}
              </b>
            </td>
            <td v-if="selectColumn" class="px-4 py-2 text-center">
              <input type="checkbox" 
                class="form-checkbox text-blue-500" 
                v-model="selectedPokemons" 
                :value="poke" 
                :disabled="selectedPokemons.length >= 6 && !selectedPokemons.includes(poke)" />
            </td>
          </tr>
        </tbody>
      </table>
      <p class="flex justify-center text-sm mt-2">Página {{ currentPage }} de {{ totalPages }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * librerias y modelos
 */
import { ref, onMounted, computed } from 'vue'
import axios from "axios"
import { URL_POKE_API } from "../../config/config"
import { usePokemonStore } from '../store/PokemonStore'
import { Pokemon } from '../models/Pokemon'
import { useRouter } from 'vue-router'


// store de Pinia
const pokemonStore = usePokemonStore();

// router
const router = useRouter()

/**
 * variables
 */
const pokemons = ref<Pokemon[]>([])
const selectedPokemons = ref<Pokemon[]>([])


// variables para la paginacion
const totalPokemons = 175
const pokemonsPerPage = 25
let limit = ref(25)
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalPokemons / pokemonsPerPage))
const offset = computed(() => (currentPage.value - 1) * pokemonsPerPage)
// variable para bloquear la tabla mientras carga la informacion
const isLoading = ref(true)
// variable para habilitar columna de seleccion
const selectColumn = ref(false)


/**
 * funciones
 */
onMounted(() => {
  getPokemons()
})


const changePage = (page:number) => {
  currentPage.value = page
  /**
   * Llamamos a la funcion que trae a los Pokemon desde la API para que traiga una nueva lista
   * de acuerdo a la pagina seleccionada 
   */
  getPokemons();
};


async function getPokemons() {
  isLoading.value = true
  // si nos encontramos en la ultima pagina, entonces se reduce el limit a 1 solo elemento (ya que es el pokemon #151)
  if(currentPage.value == 7) {
    limit.value = 1
  }
  else {
    limit.value = 25
  }

  axios
    .get(`${URL_POKE_API}/pokemon?limit=${limit.value}&offset=${offset.value}`)
    .then((res:any) => {
      pokemons.value = res.data.results
      // traer las imagenes de los pokemon de la pagina
      getPokemonImages()
    })
    .catch((error) => {
      console.error('Error al obtener los Pokémons: ', error)
    })
    .finally(() => {
      isLoading.value = false
    })
}


async function getPokemonImages() {
  pokemons.value.forEach((pokemon) => {
    axios
      .get(pokemon.url)
      .then((res:any) => {
        pokemon.pokemon_image = res.data.sprites.front_default
      })
      .catch((error) => {
        console.error(`Error al obtener la imagen del pokemon ${pokemon.name}: `, error)
      })
  })
}


function assignTeam() {
  pokemonStore.assignTeam(selectedPokemons.value);

  router.push('/team')
}

</script>


<style scoped>
</style>