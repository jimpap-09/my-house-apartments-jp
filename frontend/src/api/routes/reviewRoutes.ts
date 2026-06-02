export const REVIEWS_ROUTES = {
  GET_ALL_REVIEWS: '/api/reviews',
  GET_REVIEW_BY_ID: (id: number | string) => `/api/reviews/${id}`,
  CREATE_REVIEW: '/api/reviews',
  UPDATE_REVIEW: (id: number | string) => `/api/reviews/${id}`,
  DELETE_REVIEW: (id: number | string) => `/api/reviews/${id}`,
  GET_REVIEW_USER: (reviewId: number | string) => `/api/reviews/${reviewId}/user`,
  GET_REVIEW_APARTMENT: (reviewId: number | string) => `/api/reviews/${reviewId}/apartment`,
}
