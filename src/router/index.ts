import { REFRESH_TOKEN_STORE_NAME } from '@/utils/const'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORE_NAME)

  if (to.name === 'home') {
    if (!refreshToken) {
      return { name: 'login' }
    }
  }

  if (to.name === 'login' || to.name === 'register') {
    if (refreshToken) {
      return { name: 'home' }
    }
  }
})

export default router
