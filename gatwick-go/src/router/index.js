import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SkinView from '@/views/SkinView.vue'
import GateView from '@/views/GateView.vue'

export const gameState = {
  gateID: "h5",
  playerSkin: "bus",
  playerID: crypto.randomUUID()
}

var url = `https://api.gatwickgo.uk/new_player?name=${gameState.playerID}&skin=${gameState.playerSkin}`;
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
      props: () => ({
        skin: gameState.playerSkin,
      })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      props: () => ({
        playerID: gameState.playerID,
        gateID: gameState.gateID,
        skin: gameState.playerSkin,
        boardingGroup: 'B',
        players: []
      })
    },
    {
      path: '/skin',
      name: 'skin',
      component: SkinView,
      props: () => ({
        playerID: gameState.playerID,
        playerSkin: gameState.playerSkin,
      })
    },
    {
      path: '/gate',
      name: 'gate',
      component: GateView,
      props: { 
        'playerID': gameState.playerID,
      }
    },
  ],
})

export default router
