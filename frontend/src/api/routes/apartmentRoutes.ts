export const APARTMENTS_ROUTES = {
  GET_ALL_APARTMENTS: '/api/apartments',
  GET_APARTMENT_BY_ID: (id: number | string) => `/api/apartments/${id}`,
  CREATE_APARTMENT: '/api/apartments',
  UPDATE_APARTMENT: (id: number | string) => `/api/apartments/${id}`,
  DELETE_APARTMENT: (id: number | string) => `/api/apartments/${id}`,
  GET_APARTMENT_IMAGES: (apartmentId: number | string) => `/api/apartments/${apartmentId}/images`,
  GET_APARTMENT_REVIEWS: (apartmentId: number | string) => `/api/apartments/${apartmentId}/reviews`,
  GET_APARTMENT_RESERVATIONS: (apartmentId: number | string) => `/api/apartments/${apartmentId}/reservations`,
}
