import api from '../config/axios'
import { USERS_ROUTES } from '../routes/userRoutes'

export const getAllUsers = async () => {
  const response = await api.get(USERS_ROUTES.GET_ALL)
  return response.data
}

export const getUserById = async (id) => {
  const response = await api.get(USERS_ROUTES.GET_BY_ID(id))
  return response.data
}
