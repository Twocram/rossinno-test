import { checkAuth, logout } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/user'
import { REFRESH_TOKEN_STORE_NAME } from '@/utils/const'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const userStore = useUserStore()

  const router = useRouter()

  const clearTokenHandler = async () => {
    localStorage.removeItem(REFRESH_TOKEN_STORE_NAME)
    userStore.setUser(null)
    await router.push({ name: 'login' })
  }

  const logoutHandler = async () => {
    const response = await logout({ sessionId: '-', login: userStore.user!.login })

    if (response) {
      if (response.status === 204) {
        await clearTokenHandler()
      }
    }
  }

  const checkUserHandler = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORE_NAME)

    if (!refreshToken) {
      await router.push({ name: 'login' })
      return
    }

    if (!userStore.user) {
      const response = await checkAuth()

      if (response) {
        if (response.status === 200) {
          const data = await response.json()
          userStore.setUser(data as User)
        }

        if (response.status === 401) {
          await clearTokenHandler()
        }
      }
    }
  }

  return { checkUserHandler, logoutHandler }
}
