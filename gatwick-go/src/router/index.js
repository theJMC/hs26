import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SkinView from '@/views/SkinView.vue'

const PLAYER_ID = crypto.randomUUID()
// const PLAYER_ID = "abc123" 
// let gateID = "h5"
let playerSkin = 'bus'

var url = `https://api.gatwickgo.uk/new_player?name=${PLAYER_ID}&skin=${playerSkin}`;
fetch(url)
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  let responseData = response.json();
  responseData.then(data => {
    console.log(data);
  })
})

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
        'playerSkin': playerSkin,
      }
    },
  ],
})

export default router
