'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.belongsTo(models.Staff, {
        foreignKey: 'staffId',
        as: 'staff'
      });
      models.Order.belongsTo(models.Organisation, {
        foreignKey: 'organisationId',
        as: 'organisation'
      });
       models.Order.hasOne(models.Delivery, {
        foreignKey: 'orderId',
        as: 'delivery'
      });
    }
  }
  Order.init({
     orderId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4  
      },
    orderType: DataTypes.STRING,
    orderImage: DataTypes.JSON,
    orderAmount: DataTypes.STRING,
    orderStatus: DataTypes.ENUM('pending', 'in progress', 'completed'),
    staffName: DataTypes.STRING,
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
    organizationId: {
      allowNull: false,
      type: DataTypes.UUID,
      foreignKey: true,
      references: {
        model: 'Organisations',
        key: 'organisationId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};