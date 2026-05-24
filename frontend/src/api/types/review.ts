export interface Review {
  id: number
  apartmentId: number
  userId: number
  rating: number
  comment?: string
  createdAt: string
  updatedAt: string
}
