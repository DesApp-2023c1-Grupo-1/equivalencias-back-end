'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Materia_aprobada', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      nota: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      carga_horaria: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      año_aprobacion: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      nombre_materia: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      certificado: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      // Agregado
      archivo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Materia_aprobada');
  },
};
