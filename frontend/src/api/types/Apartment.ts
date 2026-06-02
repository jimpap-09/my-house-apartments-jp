export interface Apartment {
  id: number
  title: string
  description?: string
  pricePerNight: number
  location: string
  urlCover: string
  createdAt: string
  updatedAt: string
}

export type CreateApartmentInput = Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateApartmentInput = Partial<CreateApartmentInput>
