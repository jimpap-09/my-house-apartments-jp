export const RESERVATIONS_ROUTES = {
  GET_ALL_RESERVATIONS: '/api/reservations',
  GET_RESERVATION_BY_ID: (id: number | string) => `/api/reservations/${id}`,
  CREATE_RESERVATION: '/api/reservations',
  UPDATE_RESERVATION: (id: number | string) => `/api/reservations/${id}`,
  DELETE_RESERVATION: (id: number | string) => `/api/reservations/${id}`,
  GET_RESERVATION_USER: (reservationId: number | string) => `/api/reservations/${reservationId}/user`,
  GET_RESERVATION_APARTMENT: (reservationId: number | string) => `/api/reservations/${reservationId}/apartment`,
}
