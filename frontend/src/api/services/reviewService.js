import api from '../config/axios'
import { REVIEWS_ROUTES } from '../routes/reviewRoutes'

export const getAllReviews = async () => {
  const response = await api.get(REVIEWS_ROUTES.GET_ALL)
  return response.data
}

export const getReviewById = async (id) => {
  const response = await api.get(REVIEWS_ROUTES.GET_BY_ID(id))
  return response.data
}
