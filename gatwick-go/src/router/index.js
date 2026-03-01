import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const PLAYER_ID = crypto.randomUUID()
let playerSkin = 'bus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: { 
        'skin': playerSkin,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      props: { 
        'playerID': PLAYER_ID,
        'skin': playerSkin,
        'boardingGroup': 'B',
        'players': []
      }
    },
  ],
})

export default router
