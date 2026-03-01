import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const PLAYER_ID = crypto.randomUUID()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: { 
        'skin': '',
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      props: { 
        'playerID': PLAYER_ID,
        'skin': '',
        'boardingGroup': 'B',
        'players': []
      }
    },
  ],
})

export default router
