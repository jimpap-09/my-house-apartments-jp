import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Language } from './data/apartments'

type TranslationKey =
  | 'apartments'
  | 'apartmentDetails'
  | 'availableStays'
  | 'backToApartments'
  | 'bookingCta'
  | 'brand'
  | 'contact'
  | 'detailsTitle'
  | 'footerLocation'
  | 'guestRating'
  | 'introText'
  | 'introTitle'
  | 'language'
  | 'notFoundText'
  | 'notFoundTitle'
  | 'popularFacilities'
  | 'viewDetails'
  | 'viewPhotos'
  | 'closeGallery'

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    apartments: 'Apartments',
    apartmentDetails: 'Apartment details',
    availableStays: 'Available stays',
    backToApartments: 'Back to apartments',
    bookingCta: 'Request booking',
    brand: 'My House Apartments',
    contact: 'Contact',
    detailsTitle: 'Apartment details',
    footerLocation: 'Ampelokipoi, Greece',
    guestRating: 'Guest rating',
    introText:
      'Browse the current apartments and open each listing for photos, amenities, and stay details.',
    introTitle: 'Choose your apartment',
    language: 'Language',
    notFoundText: 'The listing you opened does not exist yet.',
    notFoundTitle: 'Apartment not found',
    popularFacilities: 'Most popular facilities',
    viewDetails: 'View details',
    viewPhotos: 'View photos',
    closeGallery: 'Close',
  },
  el: {
    apartments: 'Διαμερίσματα',
    apartmentDetails: 'Στοιχεία διαμερίσματος',
    availableStays: 'Διαθέσιμες διαμονές',
    backToApartments: 'Πίσω στα διαμερίσματα',
    bookingCta: 'Αίτημα κράτησης',
    brand: 'My House Apartments',
    contact: 'Επικοινωνία',
    detailsTitle: 'Στοιχεία διαμερίσματος',
    footerLocation: 'Αμπελόκηποι',
    guestRating: 'Βαθμολογία επισκεπτών',
    introText:
      'Δες τα διαθέσιμα διαμερίσματα και άνοιξε κάθε καταχώριση για φωτογραφίες, παροχές και λεπτομέρειες διαμονής.',
    introTitle: 'Διάλεξε διαμέρισμα',
    language: 'Γλώσσα',
    notFoundText: 'Η καταχώριση που άνοιξες δεν υπάρχει ακόμη.',
    notFoundTitle: 'Το διαμέρισμα δεν βρέθηκε',
    popularFacilities: 'Δημοφιλείς παροχές',
    viewDetails: 'Προβολή',
    viewPhotos: 'Προβολή φωτογραφιών',
    closeGallery: 'Κλείσιμο',
  },
}

type I18nContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey) => translations[language][key],
    }),
    [language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }

  return context
}
