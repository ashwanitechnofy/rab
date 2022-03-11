const { DATEONLY } = require('sequelize');
const {sequelize,DataTypes} = require('../index');
const third_party_booking = require('../model/third_party_booking')(sequelize, DataTypes);
const Booking = require('../model/booking')(sequelize, DataTypes);

/*const Company = require('../model/company')(sequelize, DataTypes);
const Vehicle_category = require('../model/vehicle_category')(sequelize, DataTypes);
const Model = require('../model/model')(sequelize, DataTypes);
const ModelYear = require('../model/model_year')(sequelize, DataTypes);
const VehicleAddOns = require('../model/vehicle_add_ons')(sequelize, DataTypes);

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
*/
const BookingUser = Booking.hasOne(third_party_booking, {
    foreignKey: 'booking_id',
    'as':'booking_user'
});
class BookingService {
    
    getOne(param) {
        return new Promise((resolve, reject) => {
            return Booking.findOne({where:param})
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }  

    getById(param) {
        return new Promise((resolve, reject) => {
            return Booking.findOne({where:param})
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    getVBookById(vehicle_id,from,to) {
        return new Promise((resolve, reject) => {
            return Booking.findAll({where:{
                vehicle_id:vehicle_id,
                $or:[{
                from: {
                    $between: [from, to]
                }
            }, {
                to: {
                    $between: [from, to]
                }
            }
        ]
            },
            include:[BookingUser],
             order:[['id','desc']],
            })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    getVehicleQty(vehicle_id,from,to) {
        return new Promise((resolve, reject) => {
            return Booking.findOne({attributes:[ [sequelize.fn('sum', sequelize.col('quanity')), 'total_vehicle_used'] ], where:{vehicle_id:vehicle_id,from:{$gte:from},to:{$lte:to},status:{$in:['0','2']}},group:['vehicle_id'] })
                .then(u => {
                    console.log('>>>>>u',u);
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

    register(body) {
        return new Promise((resolve, reject) => {
            return Booking.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return Booking.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
                return Booking.destroy({
                    where: {
                        id: id
                    }
                }).then(async u => {
                    console.log(u);
                    if(u){
                      //  await ModelYear.destroy({where: {vehicle_id: id }});
                       // await VehicleAddOns.destroy({where: {vehicle_id: id }});      
                    }
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
}

}
module.exports = BookingService;