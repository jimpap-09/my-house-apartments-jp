import type { Locale } from '@/i18n/dictionaries'
import type { Apartment } from './apartments'

export const apartmentSectionIds = [
  'overview',
  'about',
  'gallery',
  'amenities',
  'reviews',
  'location',
  'booking',
] as const

export type ApartmentSectionId = (typeof apartmentSectionIds)[number]

export type ApartmentSectionProps = {
  apartment: Apartment
  language: Locale
}
