export type Dict = {
  nav: { why: string; about: string; gallery: string; amenities: string; reviews: string; location: string; book: string };
  hero: { locationChip: string; title: string; tagline: string; intro: string; rating: string; bookNow: string; learnMore: string; scroll: string };
  trust: string[];
  why: { eyebrow: string; title: string; items: { icon: string; title: string; body: string }[] };
  about: { eyebrow: string; title: string; body: string; bullets: string[]; statRating: string; statGuests: string };
  gallery: { eyebrow: string; title: string; note: string; openAll: string; close: string; previous: string; next: string };
  amenities: { eyebrow: string; title: string; items: { icon: string; label: string }[] };
  reviews: { eyebrow: string; title: string; googleLabel: string; items: { name: string; when: string; text: string }[] };
  location: { eyebrow: string; title: string; body: string; bullets: string[]; openMap: string };
  nearby: { eyebrow: string; title: string; items: { name: string; meta: string }[] };
  advantages: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  inquiry: {
    eyebrow: string; title: string; body: string;
    name: string; email: string; phone: string;
    checkIn: string; checkOut: string; guests: string; message: string;
    submit: string; submitting: string;
    successTitle: string; successBody: string; continueWhatsapp: string;
  };
  ctaBand: { title: string; body: string; whatsapp: string; call: string };
  footer: { phone: string; address: string; hours: string; hoursValue: string; rights: string; tagline: string };
  floating: { whatsapp: string; call: string };
};

export const el: Dict = {
  nav: {
    why: "Γιατί εμείς",
    about: "Σχετικά",
    gallery: "Φωτογραφίες",
    amenities: "Παροχές",
    reviews: "Κριτικές",
    location: "Τοποθεσία",
    book: "Επικοινωνία",
  },
  hero: {
    locationChip: "Αμπελόκηποι, Αθήνα",
    title: "My House Apartment JP",
    tagline: "Το σπίτι σας στην Αθήνα",
    intro: "Ένα ζεστό, φιλόξενο διαμέρισμα στο κέντρο της Αθήνας, ιδανικό για ζευγάρια και οικογένειες.",
    rating: "9.5/10 από 99+ κριτικές",
    bookNow: "Καλέστε για κράτηση",
    learnMore: "Μάθετε περισσότερα",
    scroll: "Κύλιση κάτω",
  },
  trust: [
    "99+ ευχαριστημένοι επισκέπτες",
    "Τοποθεσία στο κέντρο της Αθήνας",
    "Πλήρως εξοπλισμένο διαμέρισμα",
    "Εξαιρετική εξυπηρέτηση",
    "Καθαρό και άνετο χώρο",
    "Εγγύηση καλής εμπειρίας",
  ],
  why: {
    eyebrow: "Γιατί να επιλέξετε εμάς",
    title: "Γιατί το My House Apartment JP",
    items: [
      {
        icon: "🏠",
        title: "Σπίτι μακριά από το σπίτι",
        body: "Το διαμέρισμά μας είναι εξοπλισμένο με όλα τα απαραίτητα για να νιώσετε σαν στο σπίτι σας.",
      },
      {
        icon: "📍",
        title: "Ιδανική τοποθεσία",
        body: "Βρίσκεται στο κέντρο της Αθήνας, κοντά σε όλα τα αξιοθέατα και τις μεταφορές.",
      },
      {
        icon: "⭐",
        title: "Υψηλή ποιότητα",
        body: "Με βαθμολογία 9.5/10 από εκατοντάδες ευχαριστημένους επισκέπτες.",
      },
    ],
  },
  about: {
    eyebrow: "Σχετικά με εμάς",
    title: "Το διαμέρισμά μας",
    body: "Το My House Apartment JP είναι ένα όμορφο διαμέρισμα στο κέντρο της Αθήνας, ιδανικό για ζευγάρια και μικρές οικογένειες. Με άνετους χώρους και πλήρη εξοπλισμό, προσφέρει μια μοναδική εμπειρία διαμονής.",
    bullets: [
      "Πλήρως εξοπλισμένη κουζίνα",
      "Άνετο υπνοδωμάτιο με μεγάλο κρεβάτι",
      "Σαλόνι με τηλεόραση και Wi-Fi",
      "Μπάνιο με ζεστό νερό",
      "Κλιματισμός και θέρμανση",
      "Ασφαλής και καθαρή περιοχή",
    ],
    statRating: "Βαθμολογία",
    statGuests: "Επισκέπτες",
  },
  gallery: {
    eyebrow: "Φωτογραφίες",
    title: "Εξερευνήστε το διαμέρισμα",
    note: "Δείτε όλες τις φωτογραφίες και ανοίξτε τες σε πλήρη προβολή.",
    openAll: "Όλες οι φωτογραφίες",
    close: "Κλείσιμο",
    previous: "Προηγούμενη φωτογραφία",
    next: "Επόμενη φωτογραφία",
  },
  amenities: {
    eyebrow: "Παροχές",
    title: "Τι περιλαμβάνεται",
    items: [
      { icon: "🛏️", label: "Μεγάλο κρεβάτι" },
      { icon: "🍳", label: "Κουζίνα" },
      { icon: "📺", label: "Τηλεόραση" },
      { icon: "🌐", label: "Wi-Fi" },
      { icon: "❄️", label: "Κλιματισμός" },
      { icon: "🚿", label: "Μπάνιο" },
    ],
  },
  reviews: {
    eyebrow: "Κριτικές",
    title: "Τι λένε οι επισκέπτες μας",
    googleLabel: "Google Reviews",
    items: [
      {
        name: "Μαρία Κ.",
        when: "2 εβδομάδες πριν",
        text: "Τέλειο διαμέρισμα! Πολύ καθαρό και άνετο. Η τοποθεσία είναι εξαιρετική.",
      },
      {
        name: "Γιάννης Π.",
        when: "1 μήνα πριν",
        text: "Πολύ φιλόξενοι ιδιοκτήτες. Θα ξανάρθω σίγουρα!",
      },
      {
        name: "Ελένη Μ.",
        when: "3 εβδομάδες πριν",
        text: "Άριστη εμπειρία. Το διαμέρισμα είναι όπως στις φωτογραφίες.",
      },
    ],
  },
  location: {
    eyebrow: "Τοποθεσία",
    title: "Πού βρίσκεται",
    body: "Το διαμέρισμα βρίσκεται στους Αμπελόκηπους, μια ήσυχη και ασφαλή περιοχή στο κέντρο της Αθήνας.",
    bullets: [
      "5 λεπτά με τα πόδια από το μετρό",
      "Κοντά σε εστιατόρια και καφέ",
      "Εύκολη πρόσβαση σε όλα τα αξιοθέατα",
      "Ασφαλής περιοχή με 24ωρη φύλαξη",
    ],
    openMap: "Άνοιγμα χάρτη",
  },
  nearby: {
    eyebrow: "Κοντινά σημεία",
    title: "Τι υπάρχει κοντά",
    items: [
      { name: "Μετρό Αμπελόκηποι", meta: "5 min" },
      { name: "Πλατεία Συντάγματος", meta: "10 min" },
      { name: "Ακρόπολη", meta: "15 min" },
      { name: "Εστιατόρια", meta: "2 min" },
    ],
  },
  advantages: {
    eyebrow: "Πλεονεκτήματα κράτησης",
    title: "Γιατί να κλείσετε μέσω εμάς",
    items: [
      {
        title: "Άμεση επιβεβαίωση",
        body: "Λάβετε επιβεβαίωση κράτησης εντός 24 ωρών.",
      },
      {
        title: "Εξυπηρέτηση 24/7",
        body: "Επικοινωνήστε μαζί μας οποιαδήποτε στιγμή.",
      },
      {
        title: "Καλύτερες τιμές",
        body: "Ανταγωνιστικές τιμές χωρίς κρυφές χρεώσεις.",
      },
      {
        title: "Εγγύηση καθαριότητας",
        body: "Το διαμέρισμα καθαρίζεται πριν από κάθε άφιξη.",
      },
    ],
  },
  inquiry: {
    eyebrow: "Κράτηση",
    title: "Κράτηση τηλεφωνικά",
    body: "Καλέστε μας για διαθεσιμότητα και για να οργανώσουμε απευθείας τη διαμονή σας.",
    name: "Όνομα",
    email: "Email",
    phone: "Για διαθεσιμότητα και κρατήσεις, καλέστε μας απευθείας ή στείλτε μήνυμα στο WhatsApp.",
    checkIn: "Άφιξη",
    checkOut: "Αναχώρηση",
    guests: "Επισκέπτες",
    message: "Μήνυμα",
    submit: "Αποστολή",
    submitting: "Αποστολή...",
    successTitle: "Επιτυχία!",
    successBody: "Η κράτησή σας υποβλήθηκε επιτυχώς.",
    continueWhatsapp: "Συνέχεια στο WhatsApp",
  },
  ctaBand: {
    title: "Έτοιμοι να οργανώσετε τη διαμονή σας;",
    body: "Καλέστε μας ή στείλτε μήνυμα στο WhatsApp για διαθεσιμότητα, κράτηση ή περισσότερες πληροφορίες.",
    whatsapp: "WhatsApp",
    call: "Κλήση",
  },
  footer: {
    phone: "Τηλέφωνο",
    address: "Διεύθυνση",
    hours: "Ώρες",
    hoursValue: "24/7",
    rights: "Όλα τα δικαιώματα διατηρούνται.",
    tagline: "Το σπίτι σας στην Αθήνα.",
  },
  floating: {
    whatsapp: "WhatsApp",
    call: "Κλήση",
  },
};
