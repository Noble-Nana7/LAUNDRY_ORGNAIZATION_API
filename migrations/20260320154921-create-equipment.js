'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipments', {
      equipmentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      equipmentName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      equipmentPrice: {
        allowNull: false,
        type: Sequelize.STRING
      },
      equipmentExpiryDate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      equipmentStatus: {
        allowNull: false,
        type: Sequelize.ENUM('available', 'active', 'maintenance')
      },
      equipmentImage: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      organisationId: {
        allowNull: false,
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'Organisations',
          key: 'organisationId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Equipments');
  }
};