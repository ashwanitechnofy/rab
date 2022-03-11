'use strict';
const {
  Model
} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (sequelize, DataTypes) => {
  class vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vehicles.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registration_no: {
      type: DataTypes.STRING(50)
    },
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
    v_images: {
      type: DataTypes.TEXT('long'),
      get() {
        if(this.getDataValue('v_images')){
         var rest = this.getDataValue('v_images').replace('[','');
          rest = rest.replace(']','');
          rest =  rest.split(';');
          let arr = [];
          rest.forEach(element => {
            arr.push(config.BASE_URL+'image/vehicles/'+element);
          });
      return arr;
    }
  },
  set(val) {
     if(val)
     this.setDataValue('v_images',val.join(';'));
     else
     this.setDataValue('v_images',val);
  },
    },
    h_images: {
      type: DataTypes.TEXT('long'),
      get() {
        if(this.getDataValue('h_images')){
         var rest = this.getDataValue('h_images').replace('[','');
          rest = rest.replace(']','');
          rest =  rest.split(';');
          let arr = [];
          rest.forEach(element => {
            arr.push(config.BASE_URL+'image/vehicles/'+element);
          });
      return arr;
    }
  },
  set(val) {
     if(val)
     this.setDataValue('h_images',val.join(';'));
     else
     this.setDataValue('h_images',val);
  },
    },
  }, {
    sequelize,
    modelName: 'vehicles',
  });
  return vehicles;
};