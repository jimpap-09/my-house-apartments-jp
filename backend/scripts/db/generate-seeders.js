const fs = require('fs')
const path = require('path')

const SCRIPT_DIR = __dirname
const BACKEND_DIR = path.resolve(SCRIPT_DIR, '../..')
const SEEDERS_DIR = path.join(BACKEND_DIR, 'seeders')

const seeds = require('./seed-schema.json')
const images = require('../cloudinary/cloudinary-images.json')

fs.mkdirSync(SEEDERS_DIR, { recursive: true })

const now = 'new Date()'

const timestamp = (offset = 0) => {
    const date = new Date()
    date.setSeconds(date.getSeconds() + offset)
    return date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)
}

const jsValue = (value) => {
    if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`
    if (value === null) return 'null'
    return String(value)
}

const objectToSeederRow = (row) => {
    const fields = Object.entries(row)
        .map(([key, value]) => `        ${key}: ${jsValue(value)},`)
        .join('\n')

    return `      {
${fields}
        createdAt: ${now},
        updatedAt: ${now},
      }`
}

const getCoverUrl = (apartmentId) => {
    const cover = images.find(
        (image) => image.apartmentId === apartmentId && image.isCover === true
    )

    if (!cover) {
        throw new Error(`Missing cover image for apartmentId=${apartmentId}`)
    }

    return cover.url
}

const writeSeeder = (fileName, tableName, rows) => {
    const content = `'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('${tableName}', [
${rows.map(objectToSeederRow).join(',\n')}
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('${tableName}', null, {})
  }
}
`

    fs.writeFileSync(path.join(SEEDERS_DIR, fileName), content)
}

const generateApartmentSeeder = () => {
    const apartments = seeds.Apartments.map((apartment) => ({
        ...apartment,
        urlCover: getCoverUrl(apartment.id),
    }))

    writeSeeder(`${timestamp(1)}-demo-apartments.js`, 'Apartments', apartments)
}

const generateUserSeeder = () => {
    writeSeeder(`${timestamp(2)}-demo-users.js`, 'Users', seeds.Users || [])
}

const generateApartmentImagesSeeder = () => {
    const rows = images.map((image) => ({
        apartmentId: image.apartmentId,
        url: image.url,
        alt: image.alt,
        sortOrder: image.sortOrder,
        isCover: image.isCover,
    }))

    writeSeeder(
        `${timestamp(3)}-demo-apartment-images.js`,
        'ApartmentImages',
        rows
    )
}

const generateReviewSeeder = () => {
    writeSeeder(`${timestamp(4)}-demo-reviews.js`, 'Reviews', seeds.Reviews || [])
}

const generateReservationSeeder = () => {
    writeSeeder(
        `${timestamp(5)}-demo-reservations.js`,
        'Reservations',
        seeds.Reservations || []
    )
}

generateApartmentSeeder()
generateUserSeeder()
generateApartmentImagesSeeder()
generateReviewSeeder()
generateReservationSeeder()

console.log('✅ Seeders generated successfully.')
