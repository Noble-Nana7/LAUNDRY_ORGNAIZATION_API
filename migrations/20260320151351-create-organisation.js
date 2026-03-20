'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organisations', {
      organisationId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      organisationLogo: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      organisationName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      organisationAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      organisationEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      organizationPhoneNumber: {
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
    await queryInterface.dropTable('Organisations');
  }
};