const {sequelize,DataTypes} = require('../index');
const AddOns = require('../model/vehicle_add_ons')(sequelize, DataTypes);

class VehicleAddOnsService {

    getAll(param) {
        return new Promise((resolve, reject) => {
            return AddOns.findAll({attributes:['item','price'], where:param})
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
            return AddOns.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return AddOns.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(param) {
        return new Promise((resolve, reject) => {
                return AddOns.destroy({
                    where: param
                }).then(async u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
}
}
module.exports = VehicleAddOnsService;