export type Language = 'en' | 'el'

export type LocalizedText = Record<Language, string>

export type Apartment = {
  id: string
  name: string
  location: LocalizedText
  area: LocalizedText
  rating: string
  ratingText: LocalizedText
  reviews: LocalizedText
  reviewHighlight: LocalizedText
  reviewer: string
  staffRating: string
  distanceFromCenter: LocalizedText
  propertyType: LocalizedText
  price: LocalizedText
  originalPrice?: LocalizedText
  shortDescription: LocalizedText
  description: LocalizedText
  image: string
  gallery: string[]
  highlights: LocalizedText[]
  amenities: LocalizedText[]
  map: {
    address: LocalizedText
    query: string
    embedUrl: string
    mapsUrl: string
  }
  presentation: {
    aboutPhotoIndex: number
    galleryPreviewIndexes: number[]
  }
  details: {
    guests: LocalizedText
    bedrooms: LocalizedText
    beds: LocalizedText
    bathrooms: LocalizedText
    size: string
  }
  booking: {
    nightlyRate: number
    cleaningFee: number
    serviceFee: number
    maxGuests: number
    blockedDates: string[]
  }
  host: {
    name: string
    role: LocalizedText
  }
}

const jp1Images = Array.from(
  { length: 16 },
  (_, index) => `/apartments/jp1/jp1-ss${index + 1}.webp`,
)

const jp2Images = Array.from(
  { length: 11 },
  (_, index) => `/apartments/jp2/jp2-ss${index + 1}.jpg`,
)

function buildMapLinks(query: string) {
  const encodedQuery = encodeURIComponent(query)

  return {
    query,
    embedUrl: `https://www.google.com/maps?q=${encodedQuery}&z=16&output=embed`,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`,
  }
}

export const apartments: Apartment[] = [
  {
    id: 'jp1',
    name: 'My house apartment JP1',
    location: {
      en: 'Vatopediou 11, Athens 115 23, Greece',
      el: 'Βατοπεδίου 11, Αθήνα 115 23, Ελλάδα',
    },
    area: {
      en: 'Ampelokipoi, Athens',
      el: 'Αμπελόκηποι, Αθήνα',
    },
    rating: '9.5',
    ratingText: {
      en: 'Exceptional',
      el: 'Εξαιρετικό',
    },
    reviews: {
      en: '99 reviews',
      el: '99 σχόλια',
    },
    reviewHighlight: {
      en: 'The apartment is exactly as shown in the pictures. It is very clean, modern and equipped with all the necessary amenities.',
      el: 'Το διαμέρισμα είναι όπως φαίνεται στις φωτογραφίες, πολύ καθαρό, μοντέρνο και με όλες τις απαραίτητες παροχές.',
    },
    reviewer: 'Konstantinos',
    staffRating: '9.8',
    distanceFromCenter: {
      en: '2.8 km from centre',
      el: '2,8 χλμ. από το κέντρο',
    },
    propertyType: {
      en: 'Apartment',
      el: 'Διαμέρισμα',
    },
    price: {
      en: '€74',
      el: '74€',
    },
    originalPrice: {
      en: '€96',
      el: '96€',
    },
    shortDescription: {
      en: 'Modern one-bedroom apartment with private entrance, kitchen, washing machine, and quiet street view.',
      el: 'Μοντέρνο διαμέρισμα ενός υπνοδωματίου με ιδιωτική είσοδο, κουζίνα, πλυντήριο και θέα σε ήσυχο δρόμο.',
    },
    description: {
      en: 'JP1 is a newly styled apartment with a living area, separate bedroom, private bathroom, and a fully equipped kitchen. It is made for easy stays in Ampelokipoi, with air conditioning, Wi-Fi, a flat-screen TV, washing machine, and a comfortable dining area.',
      el: 'Το JP1 είναι ένα μοντέρνα διαμορφωμένο διαμέρισμα με καθιστικό, ξεχωριστό υπνοδωμάτιο, ιδιωτικό μπάνιο και πλήρως εξοπλισμένη κουζίνα. Είναι ιδανικό για άνετη διαμονή στους Αμπελόκηπους, με κλιματισμό, Wi-Fi, τηλεόραση επίπεδης οθόνης, πλυντήριο και άνετο χώρο φαγητού.',
    },
    image: jp1Images[0],
    gallery: jp1Images.slice(1),
    highlights: [
      { en: 'Entire apartment', el: 'Ολόκληρο διαμέρισμα' },
      { en: 'Private entrance', el: 'Ιδιωτική είσοδος' },
      { en: 'Quiet street view', el: 'Θέα σε ήσυχο δρόμο' },
    ],
    amenities: [
      { en: 'Free Wi-Fi', el: 'Δωρεάν Wi-Fi' },
      { en: 'Air conditioning', el: 'Κλιματισμός' },
      { en: 'Kitchen', el: 'Κουζίνα' },
      { en: 'Washing machine', el: 'Πλυντήριο ρούχων' },
      { en: 'Flat-screen TV', el: 'Τηλεόραση επίπεδης οθόνης' },
      { en: 'Private bathroom', el: 'Ιδιωτικό μπάνιο' },
      { en: 'Coffee maker', el: 'Καφετιέρα' },
      { en: 'Heating', el: 'Θέρμανση' },
    ],
    map: {
      address: {
        en: 'Vatopediou 11, Athens 115 23, Greece',
        el: 'Βατοπεδίου 11, Αθήνα 115 23, Ελλάδα',
      },
      ...buildMapLinks('Vatopediou 11, Athens 115 23, Greece'),
    },
    presentation: {
      aboutPhotoIndex: 1,
      galleryPreviewIndexes: [0, 11, 1, 2, 7],
    },
    details: {
      guests: { en: '4 guests', el: '4 guests' },
      bedrooms: { en: '1 bedroom', el: '1 bedroom' },
      beds: { en: '2 beds', el: '2 beds' },
      bathrooms: { en: '1 bathroom', el: '1 bathroom' },
      size: '48 m²',
    },
    booking: {
      nightlyRate: 74,
      cleaningFee: 25,
      serviceFee: 18,
      maxGuests: 4,
      blockedDates: ['2026-05-22', '2026-05-23', '2026-05-24', '2026-06-04', '2026-06-05', '2026-06-11'],
    },
    host: {
      name: 'John',
      role: { en: 'Hosted by John', el: 'Hosted by John' },
    },
  },
  {
    id: 'jp2',
    name: 'My house apartment JP2',
    location: {
      en: 'Vatopediou 11, Athens 115 23, Greece',
      el: 'Βατοπεδίου 11, Αθήνα 115 23, Ελλάδα',
    },
    area: {
      en: 'Ampelokipoi, Athens',
      el: 'Αμπελόκηποι, Αθήνα',
    },
    rating: '9.4',
    ratingText: {
      en: 'Wonderful',
      el: 'Υπέροχο',
    },
    reviews: {
      en: 'Guest reviews',
      el: 'Σχόλια επισκεπτών',
    },
    reviewHighlight: {
      en: 'Fresh apartment with a practical layout, comfortable sleeping area and a well-equipped kitchen for city stays.',
      el: 'Φρέσκο διαμέρισμα με πρακτική διάταξη, άνετο χώρο ύπνου και καλά εξοπλισμένη κουζίνα για διαμονή στην πόλη.',
    },
    reviewer: 'Guest',
    staffRating: '9.6',
    distanceFromCenter: {
      en: '2.8 km from centre',
      el: '2,8 χλμ. από το κέντρο',
    },
    propertyType: {
      en: 'Apartment',
      el: 'Διαμέρισμα',
    },
    price: {
      en: '€82',
      el: '82€',
    },
    shortDescription: {
      en: 'Fresh apartment with a large kitchen, comfortable bedroom, workspace, walk-in shower, and smart living area.',
      el: 'Φρέσκο διαμέρισμα με μεγάλη κουζίνα, άνετο υπνοδωμάτιο, χώρο εργασίας, walk-in ντους και μοντέρνο καθιστικό.',
    },
    description: {
      en: 'JP2 offers a polished stay with a spacious kitchen and dining area, separate bedroom, work desk, private bathroom, and a relaxing living room. The apartment includes air conditioning, Wi-Fi, smart TV, washing machine, and practical amenities for short or longer visits in Ampelokipoi.',
      el: 'Το JP2 προσφέρει προσεγμένη διαμονή με ευρύχωρη κουζίνα και τραπεζαρία, ξεχωριστό υπνοδωμάτιο, γραφείο εργασίας, ιδιωτικό μπάνιο και άνετο καθιστικό. Περιλαμβάνει κλιματισμό, Wi-Fi, smart TV, πλυντήριο και πρακτικές παροχές για μικρές ή μεγαλύτερες διαμονές στους Αμπελόκηπους.',
    },
    image: jp2Images[0],
    gallery: jp2Images.slice(1),
    highlights: [
      { en: 'Entire apartment', el: 'Ολόκληρο διαμέρισμα' },
      { en: 'Workspace', el: 'Χώρος εργασίας' },
      { en: 'Walk-in shower', el: 'Walk-in ντους' },
    ],
    amenities: [
      { en: 'Free Wi-Fi', el: 'Δωρεάν Wi-Fi' },
      { en: 'Air conditioning', el: 'Κλιματισμός' },
      { en: 'Kitchen', el: 'Κουζίνα' },
      { en: 'Washing machine', el: 'Πλυντήριο ρούχων' },
      { en: 'Smart TV', el: 'Smart TV' },
      { en: 'Work desk', el: 'Γραφείο εργασίας' },
      { en: 'Coffee maker', el: 'Καφετιέρα' },
      { en: 'Private bathroom', el: 'Ιδιωτικό μπάνιο' },
    ],
    map: {
      address: {
        en: 'Vatopediou 11, Athens 115 23, Greece',
        el: 'Βατοπεδίου 11, Αθήνα 115 23, Ελλάδα',
      },
      ...buildMapLinks('Vatopediou 11, Athens 115 23, Greece'),
    },
    presentation: {
      aboutPhotoIndex: 1,
      galleryPreviewIndexes: [0, 6, 1, 3, 5],
    },
    details: {
      guests: { en: '4 guests', el: '4 guests' },
      bedrooms: { en: '1 bedroom', el: '1 bedroom' },
      beds: { en: '2 beds', el: '2 beds' },
      bathrooms: { en: '1 bathroom', el: '1 bathroom' },
      size: '52 m²',
    },

    booking: {
      nightlyRate: 82,
      cleaningFee: 28,
      serviceFee: 20,
      maxGuests: 4,
      blockedDates: ['2026-05-19', '2026-05-20', '2026-05-28', '2026-05-29', '2026-06-07', '2026-06-08'],
    },
    host: {
      name: 'John',
      role: { en: 'Hosted by John', el: 'Hosted by John' },
    },
  },
]

