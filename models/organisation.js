'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Organisation.hasMany(models.Staff, { 
        foreignKey: 'organisationId',
        as: 'staffs'
      });
      models.Organisation.hasMany(models.Equipment, {
         foreignKey: 'organisationId',
         as: 'equipment'
      });
      models.Organisation.hasMany(models.Order, {
         foreignKey: 'organisationId',
         as: 'orders'
        });
      models.Organisation.hasMany(models.Delivery, {
         foreignKey: 'organisationId',
         as: 'deliveries'
      });
    }
  }
  Organisation.init({
     organisationId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
    organisationLogo: DataTypes.JSON,
    organisationName: DataTypes.STRING,
    organisationAddress: DataTypes.STRING,
    organisationEmail: DataTypes.STRING,
    organizationPhoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organisation',
  });
  return Organisation;
};