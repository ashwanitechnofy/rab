'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_addons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking_addons.init({
    addons_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull:false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'booking_addons',
  });
  return booking_addons;
};