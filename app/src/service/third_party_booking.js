const {sequelize,DataTypes} = require('../index');
const ThirdPartyBooking = require('../model/third_party_booking')(sequelize, DataTypes);

class ThridPartyBookingService {
    register(body) {
        return new Promise((resolve, reject) => {
            return ThirdPartyBooking.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return ThirdPartyBooking.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
                return ThirdPartyBooking.destroy({
                    where: {
                        id: id
                    }
                }).then(async u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
}

}
module.exports = ThridPartyBookingService;