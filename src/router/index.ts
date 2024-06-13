import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Register',
      name: 'user register',
      component: RegisterView
    },
    {
      path: '/Login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
