'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activity.init({
    category_id: { type:DataTypes.INTEGER, allowNull:false},
    user_id: { type:DataTypes.INTEGER, allowNull:false},
    title: { type:DataTypes.STRING(200), allowNull:false},
    price: {type:DataTypes.INTEGER,allowNull:false},
    level:  {type: DataTypes.STRING(30)},
    atitude_level:  {type:DataTypes.STRING(30)},
    atitude_height:  {type:DataTypes.STRING(30)},
    age_from: {type:DataTypes.INTEGER(30),allowNull:false},
    age_to: {type:DataTypes.INTEGER(30),allowNull:false},
    hightlight: {type:DataTypes.TEXT('long')},
    pickup: {type:DataTypes.ENUM('0','1')},
    item_take: {
      type: DataTypes.TEXT('long'),
      get() {
        if(this.getDataValue('item_take')){
         var rest = this.getDataValue('item_take').replace('[','');
          rest = rest.replace(']','');
      return rest.split(';');
    }
  },
  set(val) {
    if(val)
     this.setDataValue('item_take',val.join(';'));
     else
     this.setDataValue('item_take',val);
 
  },
    },
    services: {
      type: DataTypes.TEXT('long'),
      get() {
        if(this.getDataValue('services')){
         var rest = this.getDataValue('services').replace('[','');
          rest = rest.replace(']','');
      return rest.split(';');
    }
  },
  set(val) {
     if(val)
     this.setDataValue('services',val.join(';'));
     else
     this.setDataValue('services',val);
  },
    },

    status: {
      type: DataTypes.ENUM('0','1'),
      defaultValue:'0'
    },
  }, {
    sequelize,
    modelName: 'activity',
  });
  return activity;
};