'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class model_year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  model_year.init({
    year: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    registration_no: {
      type: DataTypes.STRING(20),
      allowNull:false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'model_year',
  });
  return model_year;
};