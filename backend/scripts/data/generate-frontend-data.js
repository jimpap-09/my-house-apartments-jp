const fs = require('fs')
const path = require('path')

const seeds = require('../seed/seed-schema.json')
const images = require('../cloudinary/cloudinary-images.json')

const SCRIPT_DIR = __dirname
const ROOT_DIR = path.resolve(SCRIPT_DIR, '../../..')

const dataDir = path.join(ROOT_DIR, 'frontend/src/data')

fs.mkdirSync(dataDir, { recursive: true })

const getCoverUrl = (apartmentId) => {
  const cover = images.find(
    (image) =>
      image.apartmentId === apartmentId &&
      image.isCover === true
  )

  if (!cover) {
    throw new Error(
      `Missing cover image for apartmentId=${apartmentId}`
    )
  }

  return cover.url
}

const writeDataFile = (fileName, variableName, data) => {
  const content = `export const ${variableName} = ${JSON.stringify(
    data,
    null,
    2
  )} as const
`

  fs.writeFileSync(
    path.join(dataDir, fileName),
    content
  )
}

const generateApartments = () => {
  const apartments = seeds.Apartments.map((apartment) => ({
    ...apartment,
    urlCover: getCoverUrl(apartment.id),
  }))

  writeDataFile(
    'apartments.ts',
    'apartments',
    apartments
  )
}

const generateUsers = () => {
  writeDataFile(
    'users.ts',
    'users',
    seeds.Users || []
  )
}

const generateReviews = () => {
  writeDataFile(
    'reviews.ts',
    'reviews',
    seeds.Reviews || []
  )
}

const generateReservations = () => {
  writeDataFile(
    'reservations.ts',
    'reservations',
    seeds.Reservations || []
  )
}

const generateApartmentImages = () => {
  writeDataFile(
    'apartmentImages.ts',
    'apartmentImages',
    images
  )
}

generateApartments()
generateUsers()
generateReviews()
generateReservations()
generateApartmentImages()

console.log('✅ Frontend static data generated successfully.')