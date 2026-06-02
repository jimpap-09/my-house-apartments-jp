export interface ApartmentImage {
  id: number
  apartmentId: number
  url: string
  alt: string
  sortOrder: number
  isCover: boolean
  createdAt: string
  updatedAt: string
}

export type CreateApartmentImageInput = Omit<ApartmentImage, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateApartmentImageInput = Partial<CreateApartmentImageInput>
