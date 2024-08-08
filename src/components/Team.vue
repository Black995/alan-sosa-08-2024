<template>
  <div class="container mx-auto py-8 relative">
    <h5 class="text-3xl font-bold mb-4">Tu equipo Pokémon</h5>
    <div class="bg-white p-6 rounded-lg shadow">
      <table class="w-full table-fixed">
        <thead>
          <tr class="bg-violet-200 text-slate-700 font-bold">
            <th class="w-1/6 px-4 py-2">Imagen</th>
            <th class="w-1/6 px-4 py-2">Nombre</th>
            <th class="w-1/6 px-4 py-2">Tipos</th>
            <th class="w-1/6 px-4 py-2">Stats</th>
            <th class="w-1/6 px-4 py-2">Sonido</th>
            <th class="w-1/6 px-4 py-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="poke in team" :key="poke.id" class="border-b hover:bg-gray-100">
            <td class="w-full w-1/6 flex items-center justify-center">
              <img :src="poke.pokemon_image" :alt="poke.name" class="w-full rounded-t-lg sm:rounded-t-none sm:rounded-l-lg" />
            </td>
            <td class="w-1/6">
              <b>
                {{ poke.name }}
              </b>
            </td>
            <td class="w-1/6">
              <span v-for="type in poke.types" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {{ type.type.name }}
              </span>
            </td>
            <td class="w-1/6">
              <p v-for="stat in poke.stats" class="text-left text-sm">
                <b>{{ stat.stat.name }}:</b> {{ stat.base_stat }}
              </p>
            </td>
            <td class="w-1/6">
              <button
                class="bg-white hover:bg-gray-200 text-black font-bold p-2 rounded-full"
                @click="playAudio(poke.cry)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </button>
            </td>
            <td class="w-1/6 ">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full"
                @click="detailPokemon(poke)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </button>

              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full"
                @click="deletePokemon(poke.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>
  

<script setup lang="ts">  
/**
 * librerias y modelos
 */
import { ref, onMounted } from 'vue'
import { usePokemonStore } from '../store/PokemonStore'
import { PokemonDetail } from '../models/Pokemon'
import { useRouter } from 'vue-router'


// store de Pinia
const pokemonStore = usePokemonStore();

// router
const router = useRouter()

/**
 * variables
 */
const team = ref<PokemonDetail[]>([])


/**
 * funciones
 */
onMounted(() => {
  getPokemons()
})


function getPokemons() {
  team.value = []
  team.value = pokemonStore.getSelectedPokemons()
}


function playAudio(audioFile:string) {
  const audio = new Audio(audioFile);
  audio.play();
}


function detailPokemon(poke:PokemonDetail) {
  router.push(`/team/${poke.id}`)
}


function deletePokemon(id:number) {
  pokemonStore.deletePokemon(id);
  getPokemons()
}

</script>

<style scoped>
.relative {
  position: relative;
}
</style>