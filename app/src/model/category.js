'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    parent: {
      type: DataTypes.INTEGER(11),
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};