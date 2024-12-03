import type { LoginBody, LogoutBody, RegisterBody } from '@/types/auth'
import { endpoints } from './endpoints'
export const register = async (body: RegisterBody) => {
  try {
    const response = await fetch(endpoints.users.register, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })

    return response
  } catch (error: unknown) {
    console.log(error)
  }
}

export const login = async (body: LoginBody) => {
  try {
    const response = await fetch(endpoints.auth.login, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })

    const json = await response.json()

    return { status: response.status, refreshToken: json.refreshToken }
  } catch (error: unknown) {
    console.log(error)
  }
}

export const logout = async (body: LogoutBody) => {
  try {
    const response = await fetch(endpoints.auth.logout, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })

    return response
  } catch (error: unknown) {
    console.log(error)
  }
}

export const checkAuth = async () => {
  try {
    const response = await fetch(endpoints.auth.auth, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    return response
  } catch (error: unknown) {
    console.log(error)
  }
}

export const updateRefreshToken = async () => {
  try {
    const response = await fetch(endpoints.auth.refreshToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()

    return { status: response.status, token: json.refreshToken }
  } catch (error: unknown) {
    console.log(error)
    return { status: 500 }
  }
}
