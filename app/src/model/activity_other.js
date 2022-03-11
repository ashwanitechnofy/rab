'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity_other extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activity_other.init({
    activity_id: { type:DataTypes.INTEGER,allowNull:false},
    user_id: { type:DataTypes.INTEGER,allowNull:false},
    duration: {type:DataTypes.ENUM('single','multiple'),defaultValue:'single'},
    duration_date: {type:DataTypes.DATEONLY},
    duration_time: {type:DataTypes.TIME},
    capacity_day: {type:DataTypes.INTEGER},
    capacity_appointment: {type:DataTypes.INTEGER},
    itinerary: { type:DataTypes.TEXT('long')},
    h_images: { type:DataTypes.TEXT('long'),
    get() {
      if(this.getDataValue('h_images')){
       var rest = this.getDataValue('h_images').replace('[','');
        rest = rest.replace(']','');
        rest =  rest.split(';');
        let arr = [];
        rest.forEach(element => {
          arr.push(config.BASE_URL+'image/activity/'+element);
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
  v_images: { type:DataTypes.TEXT('long'),
  get() {
    if(this.getDataValue('v_images')){
     var rest = this.getDataValue('v_images').replace('[','');
      rest = rest.replace(']','');
      rest =  rest.split(';');
      let arr = [];
      rest.forEach(element => {
        arr.push(config.BASE_URL+'image/activity/'+element);
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

    address: { type:DataTypes.TEXT},
    address1: { type:DataTypes.TEXT},
    city: { type:DataTypes.STRING(50)},
    state: { type:DataTypes.STRING(50)},
    country: { type:DataTypes.STRING(50)},
    pin: { type:DataTypes.STRING(50)},
    lat: { type:DataTypes.STRING(15)},
    long: { type:DataTypes.STRING(15)},
    other_review: {type:DataTypes.ENUM('0','1'),defaultValue:'0'},
    part_activity: {type:DataTypes.ENUM('0','1')},
    other_website: {type:DataTypes.TEXT('long'),
    get() {
      if(this.getDataValue('other_website')){
       var rest = this.getDataValue('other_website').replace('[','');
        rest = rest.replace(']','');
        rest =  rest.split(';');
        return rest;
     }
  },
   set(val) {
   if(val)
   this.setDataValue('other_website',val.join(';'));
   else
   this.setDataValue('other_website',val);
  },
  },

  }, {
    sequelize,
    modelName: 'activity_other',
  });
  return activity_other;
};