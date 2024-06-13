import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Register',
      name: 'login',
      component: RegisterView
    }
  ]
})

export default router
