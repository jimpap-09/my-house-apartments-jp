import api from '../config/axios'
import { APARTMENTS_ROUTES } from '../routes/apartmentRoutes'
import type { Apartment } from '../types/apartment'

export const getAllApartments = async (): Promise<Apartment[]> => {
  const response = await api.get<Apartment[]>(APARTMENTS_ROUTES.GET_ALL)
  return response.data
}

export const getApartmentById = async (
  id: number | string
): Promise<Apartment> => {
  const response = await api.get<Apartment>(
    APARTMENTS_ROUTES.GET_BY_ID(id)
  )

  return response.data
}
