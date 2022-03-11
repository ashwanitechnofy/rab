const {sequelize,DataTypes} = require('../index');
const BookingAdventurer = require('../model/booking_adventurer')(sequelize, DataTypes);

class BookingAdvenService {
    register(body) {
        return new Promise((resolve, reject) => {
            return BookingAdventurer.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return BookingAdventurer.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
                return BookingAdventurer.destroy({
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
module.exports = BookingAdvenService;