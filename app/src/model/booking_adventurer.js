'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_adventurer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking_adventurer.init({
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    first_name: {
      type: DataTypes.STRING(200),
      allowNull:false,
    },
    last_name: {
      type: DataTypes.STRING(200),
      allowNull:false,
    },
    age: {
      type: DataTypes.STRING(200),
      allowNull:false,
    },
    gender: {
      type: DataTypes.STRING(200),
    },
  }, {
    sequelize,
    modelName: 'booking_adventurer',
  });
  return booking_adventurer;
};