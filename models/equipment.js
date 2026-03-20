'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Equipment.belongsTo(models.Organisation, {
        foreignKey: 'organisationId',
        as: 'organisation'
      });
    }
  }
  Equipment.init({
    equipmentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
    equipmentName: DataTypes.STRING,
    equipmentPrice: DataTypes.STRING,
    equipmentExpiryDate: DataTypes.STRING,
    equipmentStatus: DataTypes.ENUM('available', 'active', 'maintenance'),
    equipmentImage: DataTypes.JSON,
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
    modelName: 'Equipment',
  });
  return Equipment;
};