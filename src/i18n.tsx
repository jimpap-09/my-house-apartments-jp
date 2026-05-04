import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Language } from './data/apartments'

type TranslationKey =
  | 'account'
  | 'adminPanel'
  | 'apartments'
  | 'apartmentDetails'
  | 'availableStays'
  | 'backToApartments'
  | 'bookingCta'
  | 'brand'
  | 'closeGallery'
  | 'contact'
  | 'detailsTitle'
  | 'footerLocation'
  | 'getDirections'
  | 'guestRating'
  | 'importantInfo'
  | 'introText'
  | 'introTitle'
  | 'language'
  | 'locationTitle'
  | 'mapIntro'
  | 'notFoundText'
  | 'notFoundTitle'
  | 'openInMaps'
  | 'popularFacilities'
  | 'prices'
  | 'propertyRules'
  | 'reservations'
  | 'reviewHighlights'
  | 'reviewsTab'
  | 'settings'
  | 'showAllPhotos'
  | 'showInMaps'
  | 'startingFrom'
  | 'viewDetails'
  | 'viewPhotos'

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    account: 'Account',
    adminPanel: 'Admin panel',
    apartments: 'Apartments',
    apartmentDetails: 'Apartment details',
    availableStays: 'Available stays',
    backToApartments: 'Back to apartments',
    bookingCta: 'Request booking',
    brand: 'My House Apartments',
    closeGallery: 'Close',
    contact: 'Contact',
    detailsTitle: 'Apartment details',
    footerLocation: 'Ampelokipoi, Greece',
    getDirections: 'Get directions',
    guestRating: 'Guest rating',
    importantInfo: 'Important information',
    introText:
      'Browse the current apartments and open each listing for photos, amenities, and stay details.',
    introTitle: 'Choose your apartment',
    language: 'Language',
    locationTitle: 'Location',
    mapIntro:
      'Open the apartment location in Google Maps or start directions from your current position.',
    notFoundText: 'The listing you opened does not exist yet.',
    notFoundTitle: 'Apartment not found',
    openInMaps: 'Open in Google Maps',
    popularFacilities: 'Facilities',
    prices: 'Prices',
    propertyRules: 'Property rules',
    reservations: 'Reservations',
    reviewHighlights: 'Highlights from high-rated reviews',
    reviewsTab: 'Guest reviews',
    settings: 'Settings',
    showAllPhotos: 'Show all photos',
    showInMaps: 'Show in maps',
    startingFrom: 'Starting from',
    viewDetails: 'View details',
    viewPhotos: 'View photos',
  },
  el: {
    account: 'Λογαριασμός',
    adminPanel: 'Διαχείριση',
    apartments: 'Διαμερίσματα',
    apartmentDetails: 'Στοιχεία διαμερίσματος',
    availableStays: 'Διαθέσιμες διαμονές',
    backToApartments: 'Πίσω στα διαμερίσματα',
    bookingCta: 'Αίτημα κράτησης',
    brand: 'My House Apartments',
    closeGallery: 'Κλείσιμο',
    contact: 'Επικοινωνία',
    detailsTitle: 'Στοιχεία διαμερίσματος',
    footerLocation: 'Αμπελόκηποι',
    getDirections: 'Οδηγίες',
    guestRating: 'Βαθμολογία επισκεπτών',
    importantInfo: 'Σημαντικές πληροφορίες',
    introText:
      'Δες τα διαθέσιμα διαμερίσματα και άνοιξε κάθε καταχώριση για φωτογραφίες, παροχές και λεπτομέρειες διαμονής.',
    introTitle: 'Διάλεξε διαμέρισμα',
    language: 'Γλώσσα',
    locationTitle: 'Τοποθεσία',
    mapIntro:
      'Άνοιξε την τοποθεσία στο Google Maps ή ξεκίνησε οδηγίες από την τρέχουσα θέση σου.',
    notFoundText: 'Η καταχώριση που άνοιξες δεν υπάρχει ακόμη.',
    notFoundTitle: 'Το διαμέρισμα δεν βρέθηκε',
    openInMaps: 'Άνοιγμα στο Google Maps',
    popularFacilities: 'Παροχές',
    prices: 'Τιμές',
    propertyRules: 'Κανόνες καταλύματος',
    reservations: 'Κρατήσεις',
    reviewHighlights: 'Σημεία από θετικά σχόλια',
    reviewsTab: 'Σχόλια επισκεπτών',
    settings: 'Ρυθμίσεις',
    showAllPhotos: 'Προβολή όλων των φωτογραφιών',
    showInMaps: 'Εμφάνιση χάρτη',
    startingFrom: 'Από',
    viewDetails: 'Προβολή',
    viewPhotos: 'Προβολή φωτογραφιών',
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
