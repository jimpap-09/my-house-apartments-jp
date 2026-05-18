# App Architecture

This document describes the current architecture of the app after the move to a multi-apartment, data-driven structure.

## 1. Product shape

The site is a React + Vite website for multiple apartments.

Current public flow:

```txt
Apartments list
└── Apartment detail page
```

The goal is to keep the home page practical and choice-oriented, while letting each apartment detail page provide the richer visual experience.

---

## 2. Routing

Top-level routes are defined in:

- `src/App.tsx`

Current routes:

```txt
/                         -> ApartmentsListPage
/apartments/:apartmentId  -> ApartmentDetailsPage
/not-found                -> NotFoundPage
/preview/logos             -> LogoPreviewPage
```

Public routes are wrapped in:

- `src/layouts/PageLayout.tsx`

That layout owns:

- the shared header
- the language switcher
- the `<Outlet />`
- the shared footer

Conceptually:

```txt
App
└── PageLayout
    ├── Header
    ├── Outlet
    │   ├── ApartmentsListPage
    │   └── ApartmentDetailsPage
    └── Footer
```

---

## 3. Data layer

### `src/data/apartments.ts`

This is the main source of truth for apartment content.

Each apartment stores:

- identity and location
- localized descriptions
- prices and ratings
- highlights and amenities
- gallery assets
- map links
- detail facts
- presentation choices such as gallery preview order

The list page and the detail page both read from this same dataset.

### `src/data/apartment-details.ts`

This file contains the shared structure used by the apartment detail experience:

- `apartmentSectionIds`
- `ApartmentSectionId`
- `ApartmentSectionProps`

Keeping these definitions in `data/` reflects that they describe the page model shared across multiple components, rather than belonging to one specific presentational component.

---

## 4. Page composition

### Apartments list

```txt
apartments.ts
   ↓
ApartmentsListPage
   ↓
Apartment cards linking to /apartments/{id}
```

### Apartment details

```txt
URL param apartmentId
   ↓
ApartmentDetailsPage
   ↓
find matching apartment in apartments.ts
   ↓
pass apartment data into reusable detail sections
```

The route page is the orchestrator. It resolves the active apartment once, manages shared UI state, and passes data down into section components.

Current section order:

```txt
ApartmentSubnav
ApartmentHero
ApartmentTrustStrip
ApartmentAbout
ApartmentGallery
ApartmentAmenities
ApartmentReviews
ApartmentLocation
ApartmentBookingBand
```

The reusable apartment sections live in:

- `src/components/apartment-details/`

---

## 5. Detail-page behavior

`ApartmentDetailsPage` currently owns:

- lookup of the active apartment from the route param
- active-section tracking via `IntersectionObserver`
- gallery modal state
- gallery preview derivation from apartment presentation settings

This keeps lookup and page-level behavior centralized, while each section remains focused on rendering.

---

## 6. Internationalization

The app uses one active i18n system:

- `src/i18n/dictionaries.ts`
- `src/i18n/LanguageContext.tsx`

Responsibilities are intentionally split:

- `dictionaries.ts` stores UI copy for `el` and `en`
- apartment-specific localized content lives beside the apartment records in `apartments.ts`
- `LanguageContext.tsx` stores the selected language, exposes the active dictionary, persists the setting, and updates the document language

This avoids scattering translation logic across components and keeps both shared UI copy and apartment content easy to locate.

---

## 7. Styling

The current app still uses:

- `src/App.css` for the main site shell and apartment page styling
- `src/index.css` for global base styles

The visual direction is image-led, calm, and boutique rather than marketplace-like.

---

## 8. Removed legacy structure

The previous one-page landing-page implementation has been removed.

That cleanup included:

- the old `src/components/sections/` tree
- the old `src/pages/Index.tsx`
- the old `/preview/index` route
- helpers used only by that legacy page

This leaves the repository aligned with the architecture the production app actually uses today.

---

## 9. Good files to read first

If you return to the project later, this order gives the fastest overview:

1. `src/App.tsx`
2. `src/layouts/PageLayout.tsx`
3. `src/data/apartments.ts`
4. `src/data/apartment-details.ts`
5. `src/pages/ApartmentsListPage.tsx`
6. `src/pages/ApartmentDetailsPage.tsx`
7. `src/components/apartment-details/`
8. `src/i18n/dictionaries.ts`
9. `src/i18n/LanguageContext.tsx`

That sequence shows:

- how routing works
- where data lives
- how the apartment detail template is assembled
- how localization is organized
