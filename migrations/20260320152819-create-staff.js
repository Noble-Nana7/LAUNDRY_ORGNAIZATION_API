'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Staffs', {
      staffId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      staffName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staffPosition: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staffAge: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staffSalary: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staffProfilePicture: {
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
    await queryInterface.dropTable('Staffs');
  }
};