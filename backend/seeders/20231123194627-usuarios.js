'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [{
      nombre: 'Diego Andre Garcia Villegas',
      email: 'a1168334@uabc.edu.mx',
      clientId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Anna Villegas',
      email: 'annav02@gmail.com',
      clientId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', {}, {});
  }
};
