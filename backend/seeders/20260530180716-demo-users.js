'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'johnpap26',
        password: 'admin',
        firstName: 'John',
        lastName: 'Papadimitriou',
        email: 'johnpap26@gmail.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'jimpap828',
        password: 'guest',
        firstName: 'Jimmy',
        lastName: 'Papadimitriou',
        email: 'jimpap828@gmail.com',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
