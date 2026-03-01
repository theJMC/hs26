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
    {
      path: '/play',
      name: 'play',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlayGame.vue'),
    },
  ],
})

export default router
