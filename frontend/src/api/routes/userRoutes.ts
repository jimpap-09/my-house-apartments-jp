export const USERS_ROUTES = {
  GET_ALL_USERS: '/api/users',
  GET_USER_BY_ID: (id: number | string) => `/api/users/${id}`,
  CREATE_USER: '/api/users',
  UPDATE_USER: (id: number | string) => `/api/users/${id}`,
  DELETE_USER: (id: number | string) => `/api/users/${id}`,
  GET_USER_REVIEWS: (userId: number | string) => `/api/users/${userId}/reviews`,
  GET_USER_RESERVATIONS: (userId: number | string) => `/api/users/${userId}/reservations`,
}
