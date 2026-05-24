import type { Apartment } from '@/api/types/apartment'

export const apartmentSectionIds = [
  'overview',
  'gallery',
  'about',
  'amenities',
  'booking',
  'reviews',
  'location',
] as const

export type ApartmentSectionId = (typeof apartmentSectionIds)[number]

export type ApartmentSectionProps = {
  apartment: Apartment
  
}
