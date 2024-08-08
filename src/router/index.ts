import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../components/Home.vue';
import Team from '../components/Team.vue';
import TeamDetail from '../components/TeamDetail.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/team', name: 'Team', component: Team },
  { path: '/team/:id', name: 'TeamDetail', component: TeamDetail, props: true  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router