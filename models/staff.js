'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Staff.belongsTo(models.Organisation, {
        foreignKey: 'organisationId',
        as: 'organisation'
      });
      models.Staff.hasMany(models.Order, {
        foreignKey: 'staffId',
        as: 'orders'
      });
      models.Staff.hasMany(models.Delivery, {
        foreignKey: 'staffId',
        as: 'deliveries'
      });
    }
  }
  Staff.init({
      staffId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
    staffName: DataTypes.STRING,
    staffPosition: DataTypes.STRING,
    staffAge: DataTypes.STRING,
    staffSalary: DataTypes.STRING,
    staffProfilePicture: DataTypes.JSON,
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
    modelName: 'Staff',
  });
  return Staff;
};