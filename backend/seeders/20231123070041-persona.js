'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Persona', [{
      rfc: 1,
      nombre: 'Diego',
      imagen: 'diego.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rfc: 2,
      nombre: 'Anna',
      imagen: 'anna.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rfc: 3,
      nombre: 'Alejandro',
      imagen: 'ale.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Persona', {}, {});
  }
};
