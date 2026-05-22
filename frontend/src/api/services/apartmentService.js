import api from '../config/axios'
import { APARTMENTS_ROUTES } from '../routes/apartmentRoutes'

export const getAllApartments = async () => {
  const response = await api.get(APARTMENTS_ROUTES.GET_ALL)
  return response.data
}

export const getApartmentById = async (id) => {
  const response = await api.get(APARTMENTS_ROUTES.GET_BY_ID(id))
  return response.data
}
