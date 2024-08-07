import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../components/Home.vue';
import Team from '../components/Team.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/team', name: 'Team', component: Team }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router