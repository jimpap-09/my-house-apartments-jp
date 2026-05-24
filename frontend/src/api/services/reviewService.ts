import api from '../config/axios'
import { REVIEWS_ROUTES } from '../routes/reviewRoutes'
import type { Review } from '../types/review'

export const getAllReviews = async (): Promise<Review[]> => {
  const response = await api.get<Review[]>(REVIEWS_ROUTES.GET_ALL)
  return response.data
}

export const getReviewById = async (
  id: number | string
): Promise<Review> => {
  const response = await api.get<Review>(
    REVIEWS_ROUTES.GET_BY_ID(id)
  )

  return response.data
}
