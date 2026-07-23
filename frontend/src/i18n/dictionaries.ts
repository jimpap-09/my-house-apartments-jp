export type Dict = {
  app: {
    language: string
    greek: string
    english: string
    apartments: string
    availableStays: string
    introTitle: string
    introText: string
    contact: string
    footerLocation: string
    notFoundTitle: string
    notFoundText: string
    backHome: string
    backToList: string
    loadingApartment: string
    apartmentNotFound: string
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
    listTitle: string
    listSubtitle: string
    listIntro: string
    apartmentLabel: string
    idealLocation: string
    priceLabel: string
    statusLabel: string
    readyForPreview: string
    apartmentFields: string
    pricePerNightLabel: string
    contactTitle: string
    contactIntro: string
    phone: string
    email: string
  }
}

const el: Dict = {
  app: {
    language: 'Γλώσσα',
    greek: 'Ελληνικά',
    english: 'Αγγλικά',
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
    backToList: 'Πίσω στη λίστα',
    loadingApartment: 'Φόρτωση apartment...',
    apartmentNotFound: 'Δεν βρέθηκε το apartment.',
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
    listTitle: 'Λίστα διαμερισμάτων',
    listSubtitle: 'Διαλέξτε το καλύτερο διαμέρισμα για εσάς',
    listIntro: 'Επιλέξτε το διαμέρισμα που ταιριάζει καλύτερα στη διαμονή σας.',
    apartmentLabel: 'Διαμέρισμα',
    idealLocation: 'Ιδανική τοποθεσία',
    priceLabel: 'Τιμή',
    statusLabel: 'Κατάσταση',
    readyForPreview: 'Έτοιμο για preview',
    apartmentFields: 'Πεδία διαμερίσματος',
    pricePerNightLabel: 'Τιμή ανά νύχτα',
    contactTitle: 'Επικοινωνήστε μαζί μας',
    contactIntro: 'Μπορείτε να μας καλέσετε ή να μας στείλετε email για οποιαδήποτε απορία σχετικά με τα διαμερίσματα.',
    phone: 'Τηλέφωνο',
    email: 'Email',
  },
}

const en: Dict = {
  app: {
    language: 'Language',
    greek: 'Greek',
    english: 'English',
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
    backToList: 'Back to list',
    loadingApartment: 'Loading apartment...',
    apartmentNotFound: 'Apartment not found.',
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
    listTitle: 'Apartment list',
    listSubtitle: 'Pick the best apartment for you',
    listIntro: 'Choose the apartment that fits your stay best.',
    apartmentLabel: 'Apartment',
    idealLocation: 'Ideal location',
    priceLabel: 'Price',
    statusLabel: 'Status',
    readyForPreview: 'Ready for preview',
    apartmentFields: 'Apartment fields',
    pricePerNightLabel: 'Price per night',
    contactTitle: 'Contact us',
    contactIntro: 'You can call us or send an email if you have any questions about the apartments.',
    phone: 'Phone',
    email: 'Email',
  },
}

export type Locale = 'el' | 'en'
export const dictionaries = { el, en } as const
export type Dictionary = Dict
