import api from '../config/axios'
import { APARTMENTIMAGES_ROUTES } from '../routes/apartmentImageRoutes'
import type { ApartmentImage } from '../types/ApartmentImage'

export const getAllApartmentImages = async (): Promise<ApartmentImage[]> => {
  const response = await api.get<ApartmentImage[]>(APARTMENTIMAGES_ROUTES.GET_ALL_APARTMENT_IMAGES)
  return response.data
}

export const getApartmentImageById = async (id: number | string): Promise<ApartmentImage> => {
  const response = await api.get<ApartmentImage>(APARTMENTIMAGES_ROUTES.GET_APARTMENT_IMAGE_BY_ID(id))
  return response.data
}
