'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donadores extends Model {
    static associate(models) {
    }
  }
  Donadores.init({
    personaId: {
      type: DataTypes.INTEGER
    },
    proyectoId: {
      type: DataTypes.INTEGER
    },
    donacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Donadores',
  });
  return Donadores;
};