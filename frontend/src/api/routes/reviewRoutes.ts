export const REVIEWS_ROUTES = {
  GET_ALL: '/api/reviews/getAllReviews',
  GET_BY_ID: (id: number | string) => `/api/reviews/getReviewById/${id}`,
}
