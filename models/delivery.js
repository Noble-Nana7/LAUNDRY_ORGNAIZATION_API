'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Delivery.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      models.Delivery.belongsTo(models.Staff, {
        foreignKey: 'staffId',
        as: 'staff'
      });
      models.Delivery.belongsTo(models.Organisation, {
        foreignKey: 'organisationId',
        as: 'organisation'
      });
    }
  }
  Delivery.init({
    deliveryId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
    deliveryProcessedBy: DataTypes.STRING,
    deliveryStatus: DataTypes.ENUM('pending', 'in transit', 'delivered')  ,
    clothes: DataTypes.STRING,
    orderId: {
      allowNull: false,
      type: DataTypes.UUID,
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
      type: DataTypes.UUID,
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
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Organisations',
        key: 'organisationId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' 
    }
  }, {
    sequelize,
    modelName: 'Delivery',
  });
  return Delivery;
};