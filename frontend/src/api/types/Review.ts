export interface Review {
  id: number
  rating: number
  comment?: string
  userId: number
  apartmentId: number
  createdAt: string
  updatedAt: string
}

export type CreateReviewInput = Omit<Review, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateReviewInput = Partial<CreateReviewInput>
