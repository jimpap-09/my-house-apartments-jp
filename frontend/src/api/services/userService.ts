import api from '../config/axios'
import { USERS_ROUTES } from '../routes/userRoutes'
import type { User } from '../types/user'

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(USERS_ROUTES.GET_ALL)
  return response.data
}

export const getUserById = async (
  id: number | string
): Promise<User> => {
  const response = await api.get<User>(
    USERS_ROUTES.GET_BY_ID(id)
  )

  return response.data
}
