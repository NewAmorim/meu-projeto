'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enquiries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modalidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      medico: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE
      },
      horario: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Enquiries');
  }
};