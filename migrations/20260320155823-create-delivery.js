'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deliveries', {
      deliveryId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      deliveryProcessedBy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deliveryStatus: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'in transit', 'delivered')
      },
      clothes: {
        allowNull: false,
        type: Sequelize.STRING
      },
      orderId: {
        allowNull: false,
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'Orders',
          key: 'orderId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Deliveries');
  }
};