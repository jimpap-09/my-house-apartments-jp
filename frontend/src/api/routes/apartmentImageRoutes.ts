export const APARTMENTIMAGES_ROUTES = {
  GET_ALL: '/api/apartmentImages/getAllApartmentImages',
  GET_BY_ID: (id: number | string) => `/api/apartmentImages/getApartmentImageById/${id}`,
  GET_BY_APARTMENT_ID: (apartmentId: number | string) => `/api/apartmentImages/getGalleryById/${apartmentId}`,
}
