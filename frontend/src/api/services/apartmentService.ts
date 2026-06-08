import api from '../config/axios' // Φέρνουμε το έτοιμο instance
import { APARTMENTS_ROUTES } from '../routes/apartmentRoutes'
import type { Apartment, CreateApartmentInput, UpdateApartmentInput } from '../types/Apartment'
import type { ApartmentImage } from '../types/ApartmentImage'
import type { Review } from '../types/Review'
import type { Reservation } from '../types/Reservation'
import type { DeleteResult } from '../types/common'

export const getAllApartments = async () => {
  // Χρησιμοποιούμε το api.get και περνάμε μόνο το υπόλοιπο path
  const response = await api.get('/api/apartments');
  return response.data;
};

export const getApartmentById = async (id: number | string): Promise<Apartment> => {
  const response = await api.get<Apartment>(APARTMENTS_ROUTES.GET_APARTMENT_BY_ID(id))
  return response.data
}

export const createApartment = async (body: CreateApartmentInput): Promise<Apartment> => {
  const response = await api.post<Apartment>(APARTMENTS_ROUTES.CREATE_APARTMENT, body)
  return response.data
}

export const updateApartment = async (id: number | string, body: UpdateApartmentInput): Promise<Apartment> => {
  const response = await api.put<Apartment>(APARTMENTS_ROUTES.UPDATE_APARTMENT(id), body)
  return response.data
}

export const deleteApartment = async (id: number | string): Promise<DeleteResult> => {
  const response = await api.delete<DeleteResult>(APARTMENTS_ROUTES.DELETE_APARTMENT(id))
  return response.data
}

export const getApartmentImages = async (apartmentId: number | string): Promise<ApartmentImage[]> => {
  const response = await api.get<ApartmentImage[]>(APARTMENTS_ROUTES.GET_APARTMENT_IMAGES(apartmentId))
  return response.data
}

export const getApartmentReviews = async (apartmentId: number | string): Promise<Review[]> => {
  const response = await api.get<Review[]>(APARTMENTS_ROUTES.GET_APARTMENT_REVIEWS(apartmentId))
  return response.data
}

export const getApartmentReservations = async (apartmentId: number | string): Promise<Reservation[]> => {
  const response = await api.get<Reservation[]>(APARTMENTS_ROUTES.GET_APARTMENT_RESERVATIONS(apartmentId))
  return response.data
}
