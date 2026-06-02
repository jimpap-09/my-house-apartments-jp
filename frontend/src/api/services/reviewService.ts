import api from '../config/axios'
import { REVIEWS_ROUTES } from '../routes/reviewRoutes'
import type { Review, User, Apartment, CreateReviewInput, UpdateReviewInput } from '../types/Review'
import type { DeleteResult } from '../types/common'

export const getAllReviews = async (): Promise<Review[]> => {
  const response = await api.get<Review[]>(REVIEWS_ROUTES.GET_ALL_REVIEWS)
  return response.data
}

export const getReviewById = async (id: number | string): Promise<Review> => {
  const response = await api.get<Review>(REVIEWS_ROUTES.GET_REVIEW_BY_ID(id))
  return response.data
}

export const createReview = async (body: CreateReviewInput): Promise<Review> => {
  const response = await api.post<Review>(REVIEWS_ROUTES.CREATE_REVIEW, body)
  return response.data
}

export const updateReview = async (id: number | string, body: UpdateReviewInput): Promise<Review> => {
  const response = await api.put<Review>(REVIEWS_ROUTES.UPDATE_REVIEW(id), body)
  return response.data
}

export const deleteReview = async (id: number | string): Promise<DeleteResult> => {
  const response = await api.delete<DeleteResult>(REVIEWS_ROUTES.DELETE_REVIEW(id))
  return response.data
}

export const getReviewUser = async (reviewId: number | string): Promise<User> => {
  const response = await api.get<User>(REVIEWS_ROUTES.GET_REVIEW_USER(reviewId))
  return response.data
}

export const getReviewApartment = async (reviewId: number | string): Promise<Apartment> => {
  const response = await api.get<Apartment>(REVIEWS_ROUTES.GET_REVIEW_APARTMENT(reviewId))
  return response.data
}
