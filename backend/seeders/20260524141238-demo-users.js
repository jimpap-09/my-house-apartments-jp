'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'johnpap26',
        password: 'admin',
        firstName: 'John',
        lastName: 'Papadimitriou',
        email: 'johnpap26@gmail.com',
        phone: '6983505842',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'jimpap828',
        password: 'guest',
        firstName: 'Jimmy',
        lastName: 'Papadimitriou',
        email: 'jimpap828@gmail.com',
        phone: '6937410742',
        role: 'guest',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
