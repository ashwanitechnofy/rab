'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driver_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  driver_info.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    date_of_birth: {
      type: DataTypes.STRING(15)
    },
    location: {
      type: DataTypes.TEXT
    },
    area_radius: {
      type: DataTypes.STRING(10)
    },
    license_no: {
      type: DataTypes.STRING(10)
    },
    license_img: {
      type: DataTypes.STRING(150)
    },
    expiry: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'driver_info',
  });
  return driver_info;
};