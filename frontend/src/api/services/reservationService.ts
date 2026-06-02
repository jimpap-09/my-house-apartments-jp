import api from '../config/axios'
import { RESERVATIONS_ROUTES } from '../routes/reservationRoutes'
import type { Reservation, User, Apartment, CreateReservationInput, UpdateReservationInput } from '../types/Reservation'
import type { DeleteResult } from '../types/common'

export const getAllReservations = async (): Promise<Reservation[]> => {
  const response = await api.get<Reservation[]>(RESERVATIONS_ROUTES.GET_ALL_RESERVATIONS)
  return response.data
}

export const getReservationById = async (id: number | string): Promise<Reservation> => {
  const response = await api.get<Reservation>(RESERVATIONS_ROUTES.GET_RESERVATION_BY_ID(id))
  return response.data
}

export const createReservation = async (body: CreateReservationInput): Promise<Reservation> => {
  const response = await api.post<Reservation>(RESERVATIONS_ROUTES.CREATE_RESERVATION, body)
  return response.data
}

export const updateReservation = async (id: number | string, body: UpdateReservationInput): Promise<Reservation> => {
  const response = await api.put<Reservation>(RESERVATIONS_ROUTES.UPDATE_RESERVATION(id), body)
  return response.data
}

export const deleteReservation = async (id: number | string): Promise<DeleteResult> => {
  const response = await api.delete<DeleteResult>(RESERVATIONS_ROUTES.DELETE_RESERVATION(id))
  return response.data
}

export const getReservationUser = async (reservationId: number | string): Promise<User> => {
  const response = await api.get<User>(RESERVATIONS_ROUTES.GET_RESERVATION_USER(reservationId))
  return response.data
}

export const getReservationApartment = async (reservationId: number | string): Promise<Apartment> => {
  const response = await api.get<Apartment>(RESERVATIONS_ROUTES.GET_RESERVATION_APARTMENT(reservationId))
  return response.data
}
