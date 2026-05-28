import api from '../config/axios'
import { APARTMENTIMAGES_ROUTES } from '../routes/apartmentImageRoutes'
import type { ApartmentImage } from '../types/apartmentImage'

export const getAllApartmentImages = async (): Promise<ApartmentImage[]> => {
  const response = await api.get<ApartmentImage[]>(APARTMENTIMAGES_ROUTES.GET_ALL)
  return response.data
}

export const getApartmentImageById = async (
  id: number | string,
): Promise<ApartmentImage> => {
  const response = await api.get<ApartmentImage>(
    APARTMENTIMAGES_ROUTES.GET_BY_ID(id)
  )

  return response.data
}

export const getGalleryById = async (
  apartmentId: number | string
): Promise<ApartmentImage[]> => {
  const response = await api.get<ApartmentImage[]>(
    APARTMENTIMAGES_ROUTES.GET_BY_APARTMENT_ID(apartmentId)
  )
  return response.data
}
