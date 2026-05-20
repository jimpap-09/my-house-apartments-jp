'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Apartments', [
      {
        title: 'My House Apartment JP 1',
        location: 'Ampelokoipoi, Greece',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'My House Apartment JP 2',
        location: 'Ampelokoipoi, Greece',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
