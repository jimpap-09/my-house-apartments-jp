'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Apartments', [
      {
        title: 'My House Apartment JP 1',
        description: 'Modern apartment in Athens.',
        pricePerNight: 74,
        location: 'Ampelokoipoi, Athens, Greece',
        urlCover: 'https://res.cloudinary.com/dzj8q4qtf/image/upload/v1703489205/my-house-apartments-jp/ampelokoipoi-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My House Apartment JP 2',
        description: 'Comfortable apartment in Athens.',
        pricePerNight: 82,
        location: 'Ampelokoipoi, Athens, Greece',
        urlCover: 'https://res.cloudinary.com/dzj8q4qtf/image/upload/v1703489205/my-house-apartments-jp/ampelokoipoi-2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Apartments', null, {});
  }
};
