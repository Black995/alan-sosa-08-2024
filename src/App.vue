<template>
  <div class="relative w-full h-full">
  <!--div class="relative w-screen h-screen">
  <div class="absolute top-0 left-0 w-full h-full bg-image bg-cover bg-center opacity-20"></div-->

    <div id="sidebar" class="fixed top-0 left-0 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div class="mb-2 p-4">
        <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Pokédex</h5>
      </div>
      <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <div v-for="route in routes" :key="route.path" :class="[$route.path === route.path ? 'bg-blue-50 bg-opacity-80 text-blue-900' : '']" role="button" tabindex="0" class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
          <router-link :to="route.path" class="flex items-center w-full">
            <div class="grid place-items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5 text-black">
                <path fill-rule="evenodd" :d="route.image" clip-rule="evenodd"></path>
              </svg>
            </div>
            <span class="text-black">{{ route.name }}</span>
          </router-link>
        </div>
      </nav>
    </div>

    <div class="ml-[20rem]">
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  <!--/div-->
  </div>
</template>

<script setup>
import { ref } from 'vue';

const routes = ref([
  { 
    path: '/', 
    name: 'Inicio',
    image: 'M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z'
  },
  { 
    path: '/team', 
    name: 'Mi Equipo',
    image: 'M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z'
  },
]);
</script>

<style scoped>
.bg-image {
  background-image: url('./assets/images/wallpaper-pokemon.jpg');
}

.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

.opacity-20 {
  opacity: 0.2;
}
</style>
