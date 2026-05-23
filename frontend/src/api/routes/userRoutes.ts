export const USERS_ROUTES = {
  GET_ALL: '/api/users/getAllUsers',
  GET_BY_ID: (id: number | string) => `/api/users/getUserById/${id}`,
}
