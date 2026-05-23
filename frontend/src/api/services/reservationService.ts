import api from '../config/axios'
import { RESERVATIONS_ROUTES } from '../routes/reservationRoutes'
import type { Reservation } from '../types/reservation'

export const getAllReservations = async (): Promise<Reservation[]> => {
  const response = await api.get<Reservation[]>(RESERVATIONS_ROUTES.GET_ALL)
  return response.data
}

export const getReservationById = async (id: number | string): Promise<Reservation> => {
  const response = await api.get<Reservation>(RESERVATIONS_ROUTES.GET_BY_ID(id))
  return response.data
}
