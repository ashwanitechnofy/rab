const {sequelize,DataTypes} = require('../index');
const listDates = require('../model/activity_list_dates')(sequelize, DataTypes);

class ActivityListDatesService {

    register(body) {
        return new Promise((resolve, reject) => {
            return listDates.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    delete(param) {
        return new Promise((resolve, reject) => {
                return listDates.destroy({
                    where: param
                }).then(async u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
}
    
}
module.exports = ActivityListDatesService;