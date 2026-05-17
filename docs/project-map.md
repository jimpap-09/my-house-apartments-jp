# Project map

This is the practical “where do I go if I want to change X?” guide.

## Global look and feel

| If you want to change... | Go to |
| --- | --- |
| Main colors, accent color, typography tokens | `src/styles/globals.css` |
| Most page/component styling | `src/styles/app.css` |
| Shared text in Greek / English | `src/i18n/dictionaries.ts` |
| Site-wide shell, header, footer placement | `src/layouts/PageLayout.tsx` |

### Common visual changes

- Change the site accent color: edit `--color-link`, `--color-link-hover`, `--primary`, and `--accent` in `src/styles/globals.css`.
- Change spacing/layout of apartment detail sections: edit the `.apartment-*` blocks in `src/styles/app.css`.
- Change the sticky section navigation: `src/components/apartment-details/ApartmentSubnav.tsx` plus `.apartment-subnav*` styles in `src/styles/app.css`.

## Routes and pages

| Page | File |
| --- | --- |
| Apartments list | `src/pages/ApartmentsListPage.tsx` |
| Apartment detail page | `src/pages/ApartmentDetailsPage.tsx` |
| Not found page | `src/pages/NotFoundPage.tsx` |

## Apartment detail page

The detail page is assembled in `src/pages/ApartmentDetailsPage.tsx`.

| Area | Component |
| --- | --- |
| Sticky subnav | `src/components/apartment-details/ApartmentSubnav.tsx` |
| Hero | `ApartmentHero.tsx` |
| Gallery preview + modal open | `ApartmentGallery.tsx` |
| Intro / summary cards | `ApartmentOverview.tsx` |
| About section | `ApartmentAbout.tsx` |
| Amenities | `ApartmentAmenities.tsx` |
| Booking calendar | `ApartmentBookingCalendar.tsx` |
| Sticky booking card | `ReservationCard.tsx` |
| Reviews | `ApartmentReviews.tsx` |
| Location | `ApartmentLocation.tsx` |

## Content and data

| If you want to change... | Go to |
| --- | --- |
| Apartment names, descriptions, prices, images, amenities, blocked dates | `src/data/apartments.ts` |
| Which detail sections exist and their ids | `src/data/apartment-details.ts` |
| Greek / English labels | `src/i18n/dictionaries.ts` |

## Quick examples

### “I want to change the site color”

1. Open `src/styles/globals.css`
2. Change the semantic color tokens near the top:
   - `--color-link`
   - `--color-link-hover`
   - `--primary`
   - `--accent`

### “I want to change the text on a button”

1. Open `src/i18n/dictionaries.ts`
2. Find the key used by the component, for example `reserve`, `closeGallery`, or `showAllPhotos`

### “I want to change apartment data”

1. Open `src/data/apartments.ts`
2. Edit the relevant apartment object (`jp1`, `jp2`, etc.)

### “I want to change the booking experience”

- Page-level booking state: `src/pages/ApartmentDetailsPage.tsx`
- Calendar UI: `src/components/apartment-details/ApartmentBookingCalendar.tsx`
- Sticky booking summary card: `src/components/apartment-details/ReservationCard.tsx`
