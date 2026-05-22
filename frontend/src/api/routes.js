const API_BASE_URL = "http://localhost:3002/api"

export const API_ROUTES = {
  apartments: {
    getAll: `${API_BASE_URL}/apartments/getAllApartments`,
    getById: (id) => `${API_BASE_URL}/apartments/getApartmentById/${id}`,
    getByHostId: (hostId) => `${API_BASE_URL}/apartments/getApartmentsByHostId/${hostId}`,
    create: `${API_BASE_URL}/apartments/createApartment`,
    update: (id) => `${API_BASE_URL}/apartments/updateApartment/${id}`,
    delete: (id) => `${API_BASE_URL}/apartments/deleteApartment/${id}`,
  },

  users: {
    getAll: `${API_BASE_URL}/users/getAllUsers`,
    getById: (id) => `${API_BASE_URL}/users/getUserById/${id}`,
    getByEmail: (email) => `${API_BASE_URL}/users/getUserByEmail/${email}`,
  },

  reviews: {
    getAll: `${API_BASE_URL}/reviews/getAllReviews`,
    getByApartmentId: (apartmentId) => `${API_BASE_URL}/reviews/getReviewsByApartmentId/${apartmentId}`,
  },

  reservations: {
    getAll: `${API_BASE_URL}/reservations/getAllReservations`,
    getByApartmentId: (apartmentId) => `${API_BASE_URL}/reservations/getReservationsByApartmentId/${apartmentId}`,
  },
}