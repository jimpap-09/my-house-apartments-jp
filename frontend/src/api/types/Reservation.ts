export interface Reservation {
  id: number
  checkIn: string
  checkOut: string
  userId: number
  apartmentId: number
  createdAt: string
  updatedAt: string
}

export type CreateReservationInput = Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateReservationInput = Partial<CreateReservationInput>
