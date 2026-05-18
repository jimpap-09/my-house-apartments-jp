export type Dict = {
  app: {
    language: string
    apartments: string
    availableStays: string
    introTitle: string
    introText: string
    contact: string
    footerLocation: string
    notFoundTitle: string
    notFoundText: string
    backHome: string
    bookingCta: string
    closeGallery: string
    showAllPhotos: string
    openInMaps: string
    overview: string
    about: string
    gallery: string
    amenities: string
    reviews: string
    location: string
    booking: string
    scrollDown: string
    theApartment: string
    guests: string
    bedrooms: string
    beds: string
    size: string
    exploreApartment: string
    whatsIncluded: string
    whatGuestsSay: string
    readyToPlan: string
    hostedBy: string
    reviewPreview: string
    checkIn: string
    checkOut: string
    selectDates: string
    nights: string
    cleaningFee: string
    serviceFee: string
    total: string
    reserve: string
    noChargeYet: string
    guestsLabel: string
    clearDates: string
  }
}

const el: Dict = {
  app: {
    language: 'Γλώσσα',
    apartments: 'Διαμερίσματα',
    availableStays: 'Διαθέσιμες διαμονές',
    introTitle: 'Διάλεξε διαμέρισμα',
    introText:
      'Διάλεξε το διαμέρισμα που ταιριάζει καλύτερα στη διαμονή σου και άνοιξέ το για φωτογραφίες, παροχές και λεπτομέρειες.',
    contact: 'Επικοινωνία',
    footerLocation: 'Αμπελόκηποι, Ελλάδα',
    notFoundTitle: 'Η σελίδα δεν βρέθηκε',
    notFoundText: 'Η σελίδα που άνοιξες δεν υπάρχει.',
    backHome: 'Πίσω στην αρχική',
    bookingCta: 'Αίτημα κράτησης',
    closeGallery: 'Κλείσιμο',
    showAllPhotos: 'Προβολή όλων των φωτογραφιών',
    openInMaps: 'Άνοιγμα στο Google Maps',
    overview: 'Αρχή',
    about: 'Σχετικά',
    gallery: 'Φωτογραφίες',
    amenities: 'Παροχές',
    reviews: 'Κριτικές',
    location: 'Τοποθεσία',
    booking: 'Κράτηση',
    scrollDown: 'ΚΥΛΙΣΗ ΚΑΤΩ',
    theApartment: 'Το διαμέρισμα',
    guests: 'Επισκέπτες',
    bedrooms: 'Υπνοδωμάτια',
    beds: 'Κρεβάτια',
    size: 'Μέγεθος',
    exploreApartment: 'Εξερεύνησε τον χώρο',
    whatsIncluded: 'Τι περιλαμβάνεται',
    whatGuestsSay: 'Τι λένε οι επισκέπτες',
    readyToPlan: 'Έτοιμοι να οργανώσετε τη διαμονή σας;',
    hostedBy: 'Οικοδεσπότης',
    reviewPreview: 'Δες τι λένε οι επισκέπτες',
    checkIn: 'Άφιξη',
    checkOut: 'Αναχώρηση',
    selectDates: 'Επιλογή ημερομηνιών',
    nights: 'διανυκτερεύσεις',
    cleaningFee: 'Κόστος καθαρισμού',
    serviceFee: 'Κόστος υπηρεσίας',
    total: 'Σύνολο',
    reserve: 'Κράτηση',
    noChargeYet: 'Δεν θα χρεωθείτε ακόμα',
    guestsLabel: 'Επισκέπτες',
    clearDates: 'Καθαρισμός ημερομηνιών',
  },
}

const en: Dict = {
  app: {
    language: 'Language',
    apartments: 'Apartments',
    availableStays: 'Available stays',
    introTitle: 'Choose your apartment',
    introText:
      'Choose the apartment that fits your stay best, then open it for photos, amenities, and practical details.',
    contact: 'Contact',
    footerLocation: 'Ampelokipoi, Greece',
    notFoundTitle: 'Page not found',
    notFoundText: 'The page you opened does not exist.',
    backHome: 'Back home',
    bookingCta: 'Request booking',
    closeGallery: 'Close',
    showAllPhotos: 'Show all photos',
    openInMaps: 'Open in Google Maps',
    overview: 'Overview',
    about: 'About',
    gallery: 'Gallery',
    amenities: 'Amenities',
    reviews: 'Reviews',
    location: 'Location',
    booking: 'Booking',
    scrollDown: 'SCROLL DOWN',
    theApartment: 'The apartment',
    guests: 'Guests',
    bedrooms: 'Bedrooms',
    beds: 'Beds',
    size: 'Size',
    exploreApartment: 'Explore the apartment',
    whatsIncluded: "What's included",
    whatGuestsSay: 'What guests say',
    readyToPlan: 'Ready to plan your stay?',
    hostedBy: 'Hosted by',
    reviewPreview: 'See what guests say',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    selectDates: 'Select dates',
    nights: 'nights',
    cleaningFee: 'Cleaning fee',
    serviceFee: 'Service fee',
    total: 'Total',
    reserve: 'Reserve',
    noChargeYet: "You won't be charged yet",
    guestsLabel: 'Guests',
    clearDates: 'Clear dates',
  },
}

export type Locale = 'el' | 'en'
export const dictionaries = { el, en } as const
export type Dictionary = Dict
