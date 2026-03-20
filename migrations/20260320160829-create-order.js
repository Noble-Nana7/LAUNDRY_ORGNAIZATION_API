'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      orderId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      orderType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      orderImage: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      orderAmount: {
        allowNull: false,
        type: Sequelize.STRING
      },
      orderStatus: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'in progress', 'completed')
      },
      staffName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staffId: {
        allowNull: false,
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'Staffs',
          key: 'staffId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      organizationId: {
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
    await queryInterface.dropTable('Orders');
  }
};