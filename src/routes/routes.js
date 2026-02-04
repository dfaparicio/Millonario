import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../App.vue') },

  {path: '/juego', component: () => import('../components/Juego.vue')}
  {path: '/instrucciones', component: () => import('../components/Instrucciones.vue')}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
