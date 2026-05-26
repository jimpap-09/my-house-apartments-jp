import type { Apartment } from '@/api/types/apartment'
import type { Dictionary, Locale } from '@/i18n/dictionaries'

export const apartmentSectionIds = [
  'overview',
  'gallery',
  'about',
  'amenities',
  'booking',
  'reviews',
  'location',
] as const

export const labels = {
  overview: 'Overview',
  gallery: 'Gallery',
  about: 'About',
  amenities: 'Amenities',
  booking: 'Booking',
  reviews: 'Reviews',
  location: 'Location',
}

export type ApartmentSectionId = (typeof apartmentSectionIds)[number]

export type ApartmentSectionProps = {
  apartment: Apartment
  language: Locale
  labels: Dictionary['app']
}


