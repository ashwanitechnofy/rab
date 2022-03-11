const {sequelize,DataTypes} = require('../index');
const Vehicles = require('../model/vehicles')(sequelize, DataTypes);
const Company = require('../model/company')(sequelize, DataTypes);
const Vehicle_category = require('../model/vehicle_category')(sequelize, DataTypes);
const Model = require('../model/model')(sequelize, DataTypes);
const ModelYear = require('../model/model_year')(sequelize, DataTypes);
const VehicleAddOns = require('../model/vehicle_add_ons')(sequelize, DataTypes);
const Booking = require('../model/booking')(sequelize, DataTypes);
const BookingAddOns = require('../model/booking_addons')(sequelize, DataTypes);
const BookingAddventurers = require('../model/booking_adventurer')(sequelize, DataTypes);
const BookingThirdParty = require('../model/third_party_booking')(sequelize, DataTypes);
const Comments = require('../model/comments')(sequelize, DataTypes);


const vehicleCategory = Vehicles.belongsTo(Vehicle_category, {
    foreignKey: 'category_id',
    as: 'category'
});

const companyModel = Vehicles.belongsTo(Company, {
    foreignKey: 'company_id',
    as :'company',
});

const modelYear = Vehicles.hasMany(ModelYear, {
    foreignKey: 'vehicle_id',
    as :'yearNames'
});

const modelName = Vehicles.belongsTo(Model, {
    foreignKey: 'model_id',
    as :'model'
});

const addOns = Vehicles.hasMany(VehicleAddOns, {
    foreignKey: 'vehicle_id',
    as :'addOns'
});

Vehicles.hasMany(Booking, {
    foreignKey: 'vehicle_id'
});

Vehicles.hasMany(Comments, {
    foreignKey: 'vehicle_id'
});

Booking.hasMany(BookingAddOns, {
    foreignKey: 'booking_id',
});

Booking.hasMany(BookingAddventurers, {
    foreignKey: 'booking_id',
});
Booking.hasMany(BookingThirdParty, {
    foreignKey: 'booking_id',
    as:'booking_person'
});
class VehicleService {
    
    getOne(param) {
        return new Promise((resolve, reject) => {
            return Vehicles.findOne({where:param})
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }  

    getByAttr(param) {
        return new Promise((resolve, reject) => {
            return Vehicles.findOne({where:param,attributes:['id','quantity','h_images','v_images','services','item_take']})
                .then(u => {
                    console.log(u);
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }  

    getById(param) {
        return new Promise((resolve, reject) => {
            return Vehicles.findOne({where:param,include:[{model:Vehicle_category,as: 'category',attributes:['category_name','image']},
            {model:Company,as: 'company',attributes:['name']},
            {model:ModelYear,as: 'yearNames',attributes:['year','registration_no']},
            {model:Model,as: 'model',attributes:['name']},
            {model:VehicleAddOns,as: 'addOns',attributes:['id','item','price']},
            {model:Booking,seperate:true,include:[BookingAddOns,BookingAddventurers,{model:BookingThirdParty,as:'booking_person'}
        ],order:[['id','desc']],limit:10},
        {model:Comments,order:[['id','desc']],limit:20}  
                ],
            })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    getVendorVehicles(param) {
        return new Promise((resolve, reject) => {
            return Vehicles.findAll({where:param,include:[{model:Vehicle_category,as: 'category',attributes:['category_name','image']},
            {model:Company,as: 'company',attributes:['name']},
            {model:ModelYear,as: 'yearNames',attributes:['year','registration_no']},
            {model:Model,as: 'model',attributes:['name']},
            {model:VehicleAddOns,as: 'addOns',attributes:['id','item','price']},
            {model:Booking,seperate:true,include:[BookingAddOns,BookingAddventurers,{model:BookingThirdParty,as:'booking_person'}
        ],order:[['id','desc']],limit:10} 
                ]
            })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    register(body) {
        return new Promise((resolve, reject) => {
            return Vehicles.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return Vehicles.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
                return Vehicles.destroy({
                    where: {
                        id: id
                    }
                    // truncate: true /* this will ignore where and truncate the table instead */
                }).then(async u => {
                    if(u){
                        await ModelYear.destroy({where: {vehicle_id: id }});
                       await VehicleAddOns.destroy({where: {vehicle_id: id }});      
                    }
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
}

}
module.exports = VehicleService;