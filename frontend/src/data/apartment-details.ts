import type { Apartment } from '@/api/types/Apartment'

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
} as const

export type ApartmentSectionId = (typeof apartmentSectionIds)[number]
export type ApartmentSectionProps = {apartment: Apartment, labels: { [key in ApartmentSectionId]: string }}

// console.log('APARTMENT SECTION IDS', apartmentSectionIds)
// console.log('APARTMENT SECTION LABELS', labels)
// console.log('type of apartmentSectionIds', typeof apartmentSectionIds)
// console.log('type of labels', typeof labels)

// const testSectionId: ApartmentSectionId = 'overview' // This should work
// const testLabel = labels['overview'] // This should also work

// console.log('TEST SECTION ID', testSectionId)
// console.log('type of testSectionId', typeof testSectionId)
// console.log('TEST LABEL', testLabel)
// console.log('type of testLabel', typeof testLabel)