import type { User } from '@/types/user'
import { endpoints } from './endpoints'

type GetUsersQuery = {
  options: {
    limit: number
    offset: number
    sort?: string
    order?: 'ASC' | 'DESC'
    search?: string
  }
}

export const getUsers = async (query: GetUsersQuery) => {
  try {
    const response = await fetch(
      `${endpoints.users.list}?limit=${query.options.limit}&offset=${query.options.offset}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    )

    const json: { items: User[]; count: number } = await response.json()

    return { status: response.status, data: json }
  } catch (error: unknown) {
    console.log(error)
  }
}

export const deleteUser = async (login: string) => {
  try {
    const response = await fetch(endpoints.users.list + `/${login}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    return response
  } catch (error: unknown) {
    console.log(error)
  }
}
