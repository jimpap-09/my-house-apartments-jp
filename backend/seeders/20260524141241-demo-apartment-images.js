'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ApartmentImages', [
      {
        apartmentId: 1,
        url: '/images/apartments/jp-1/photo-1.jpg',
        alt: 'My House Apartment JP 1 photo 1',
        sortOrder: 1,
        isCover: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apartmentId: 1,
        url: '/images/apartments/jp-1/photo-2.jpg',
        alt: 'My House Apartment JP 1 photo 2',
        sortOrder: 2,
        isCover: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apartmentId: 2,
        url: '/images/apartments/jp-2/photo-1.jpg',
        alt: 'My House Apartment JP 2 photo 1',
        sortOrder: 1,
        isCover: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apartmentId: 2,
        url: '/images/apartments/jp-2/photo-2.jpg',
        alt: 'My House Apartment JP 2 photo 2',
        sortOrder: 2,
        isCover: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ApartmentImages', null, {});
  }
};
