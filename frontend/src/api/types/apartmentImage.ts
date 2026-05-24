export interface ApartmentImage {
  id: number
  apartmentId: number
  url: string
  alt?: string
  sortOrder: number
  isCover: boolean
  createdAt: string
  updatedAt: string
}
