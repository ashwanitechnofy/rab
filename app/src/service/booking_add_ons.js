const {sequelize,DataTypes} = require('../index');
const BookingAddons = require('../model/booking_addons')(sequelize, DataTypes);

class BookingAddOnService {
    register(body) {
        return new Promise((resolve, reject) => {
            return BookingAddons.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return BookingAddons.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
                return BookingAddons.destroy({
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
module.exports = BookingAddOnService;