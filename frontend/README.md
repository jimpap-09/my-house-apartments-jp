# My House Apartments JP

React + TypeScript + Vite site for the **My House Apartments JP** listings.

## Current app structure

The public site is intentionally simple:

```txt
/                         -> apartments list
/apartments/:apartmentId  -> apartment detail page
/not-found                -> fallback page
```

There is also one non-public preview route for logo experiments:

```txt
/preview/logos
```

## Main folders

```txt
src/
├── styles/
│   ├── globals.css         global design tokens, resets, Tailwind layers
│   └── app.css             application and page styling
├── components/
│   └── apartment-details/   reusable sections for the apartment detail template
├── data/
│   ├── apartments.ts        apartment content and metadata
│   └── apartment-details.ts detail-page section ids and shared apartment-section types
├── i18n/
│   ├── dictionaries.ts      all UI copy for `el` and `en`
│   └── LanguageContext.tsx  active language state and persistence
├── layouts/
│   └── PageLayout.tsx       shared public shell
└── pages/
    ├── ApartmentsListPage.tsx
    ├── ApartmentDetailsPage.tsx
    └── NotFoundPage.tsx
```

## Data model

Apartment content lives in `src/data/apartments.ts`.

Each apartment object contains:

- localized copy
- pricing and rating data
- hero and gallery images
- amenities and highlights
- map metadata
- presentation settings used by the detail template

The detail-page section registry lives in `src/data/apartment-details.ts`, so the route page and section components share one source of truth for section ids.

## Internationalization

The app uses one translation system:

- `src/i18n/dictionaries.ts` stores translated UI text
- `src/i18n/LanguageContext.tsx` exposes the active language and dictionary globally

The selected language is persisted in `localStorage`, and apartment content is localized directly inside the apartment data objects.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

For a deeper explanation of the architecture, see `docs/architecture.md`.

For the practical “where do I edit what?” guide, see `docs/project-map.md`.
