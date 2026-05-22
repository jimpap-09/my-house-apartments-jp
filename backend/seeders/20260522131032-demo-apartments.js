'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Apartments', [
      {
        title: 'My House Apartment JP 1',
        description: 'Modern apartment in Athens.',
        pricePerNight: 74,
        location: 'Ampelokoipoi, Athens, Greece',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'My House Apartment JP 2',
        description: 'Comfortable apartment in Athens.',
        pricePerNight: 82,
        location: 'Ampelokoipoi, Athens, Greece',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Apartments', null, {});
  }
};
