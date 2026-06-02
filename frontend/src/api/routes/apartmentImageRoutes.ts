export const APARTMENTIMAGES_ROUTES = {
  GET_ALL_APARTMENT_IMAGES: '/api/apartment-images',
  GET_APARTMENT_IMAGE_BY_ID: (id: number | string) => `/api/apartment-images/${id}`,
}
