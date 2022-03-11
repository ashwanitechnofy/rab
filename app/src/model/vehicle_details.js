'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vehicle_details.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    model_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    registration_no: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'vehicle_details',
  });
  return vehicle_details;
};