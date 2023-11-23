'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Proyectos', [{
      nombre: 'Gundam',
      descripcion: 'Robot gigante de combate',
      donacion: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Pagina Web',
      descripcion: 'Pagina web super original e innovadora',
      donacion: 500,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Proyectos', {}, {});
  }
};
