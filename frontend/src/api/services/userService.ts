import api from '../config/axios'
import { USERS_ROUTES } from '../routes/userRoutes'
import type { User, Review, Reservation, CreateUserInput, UpdateUserInput } from '../types/User'
import type { DeleteResult } from '../types/common'

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(USERS_ROUTES.GET_ALL_USERS)
  return response.data
}

export const getUserById = async (id: number | string): Promise<User> => {
  const response = await api.get<User>(USERS_ROUTES.GET_USER_BY_ID(id))
  return response.data
}

export const createUser = async (body: CreateUserInput): Promise<User> => {
  const response = await api.post<User>(USERS_ROUTES.CREATE_USER, body)
  return response.data
}

export const updateUser = async (id: number | string, body: UpdateUserInput): Promise<User> => {
  const response = await api.put<User>(USERS_ROUTES.UPDATE_USER(id), body)
  return response.data
}

export const deleteUser = async (id: number | string): Promise<DeleteResult> => {
  const response = await api.delete<DeleteResult>(USERS_ROUTES.DELETE_USER(id))
  return response.data
}

export const getUserReviews = async (userId: number | string): Promise<Review[]> => {
  const response = await api.get<Review[]>(USERS_ROUTES.GET_USER_REVIEWS(userId))
  return response.data
}

export const getUserReservations = async (userId: number | string): Promise<Reservation[]> => {
  const response = await api.get<Reservation[]>(USERS_ROUTES.GET_USER_RESERVATIONS(userId))
  return response.data
}
