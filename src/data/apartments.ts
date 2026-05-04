export type Language = 'en' | 'el'

export type LocalizedText = Record<Language, string>

export type Apartment = {
  id: string
  name: string
  location: LocalizedText
  rating: string
  price: LocalizedText
  shortDescription: LocalizedText
  description: LocalizedText
  image: string
  gallery: string[]
  highlights: LocalizedText[]
  amenities: LocalizedText[]
  details: {
    guests: LocalizedText
    bedrooms: LocalizedText
    beds: LocalizedText
    bathrooms: LocalizedText
    size: string
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

export const apartments: Apartment[] = [
  {
    id: 'jp1',
    name: 'JP1',
    location: {
      en: 'Vatopediou 11, Ampelokipoi, Greece',
      el: 'Βατοπεδίου 11, Αμπελόκηποι',
    },
    rating: '9.6',
    price: {
      en: 'from EUR 74 / night',
      el: 'από 74 EUR / βραδιά',
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
    details: {
      guests: { en: '4 guests', el: '4 επισκέπτες' },
      bedrooms: { en: '1 bedroom', el: '1 υπνοδωμάτιο' },
      beds: { en: '2 beds', el: '2 κρεβάτια' },
      bathrooms: { en: '1 bathroom', el: '1 μπάνιο' },
      size: '48 m²',
    },
  },
  {
    id: 'jp2',
    name: 'JP2',
    location: {
      en: 'Ampelokipoi, Greece',
      el: 'Αμπελόκηποι',
    },
    rating: '9.4',
    price: {
      en: 'from EUR 82 / night',
      el: 'από 82 EUR / βραδιά',
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
    details: {
      guests: { en: '4 guests', el: '4 επισκέπτες' },
      bedrooms: { en: '1 bedroom', el: '1 υπνοδωμάτιο' },
      beds: { en: '2 beds', el: '2 κρεβάτια' },
      bathrooms: { en: '1 bathroom', el: '1 μπάνιο' },
      size: '52 m²',
    },
  },
]
