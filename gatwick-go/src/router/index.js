import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SkinView from '@/views/SkinView.vue'

const PLAYER_ID = crypto.randomUUID()
// const PLAYER_ID = "abc123" 
// let gateID = "h5"
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
        // 'gateID': gateID,
        'skin': playerSkin,
        'boardingGroup': 'B',
        'players': []
      }
    },
    {
      path: '/skin',
      name: 'skin',
      component: SkinView,
      props: { 
        'playerID': PLAYER_ID,
        'skin': playerSkin,
      }
    },
  ],
})

export default router
