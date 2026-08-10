'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Apartments', [
      {
        id: 1,
        title: 'My House Apartment JP 1',
        description: 'Modern apartment in Athens.',
        pricePerNight: 74,
        location: 'Ampelokoipoi, Athens, Greece',
        urlCover: 'https://res.cloudinary.com/dlwmf6upk/image/upload/v1780095607/apartments/jp-1/bedroom-2.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'My House Apartment JP 2',
        description: 'Comfortable apartment in Athens.',
        pricePerNight: 82,
        location: 'Ampelokoipoi, Athens, Greece',
        urlCover: 'https://res.cloudinary.com/dlwmf6upk/image/upload/v1780095636/apartments/jp-2/living-room-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Apartments', null, {})
  }
}
