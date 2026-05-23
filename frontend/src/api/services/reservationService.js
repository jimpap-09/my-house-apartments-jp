import api from '../config/axios'
import { RESERVATIONS_ROUTES } from '../routes/reservationRoutes'

export const getAllReservations = async () => {
  const response = await api.get(RESERVATIONS_ROUTES.GET_ALL)
  return response.data
}

export const getReservationById = async (id) => {
  const response = await api.get(RESERVATIONS_ROUTES.GET_BY_ID(id))
  return response.data
}
