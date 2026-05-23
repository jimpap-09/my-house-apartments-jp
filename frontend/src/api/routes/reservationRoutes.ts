export const RESERVATIONS_ROUTES = {
  GET_ALL: '/api/reservations/getAllReservations',
  GET_BY_ID: (id: number | string) => `/api/reservations/getReservationById/${id}`,
}
