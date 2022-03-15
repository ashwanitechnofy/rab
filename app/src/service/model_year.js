const {sequelize,DataTypes} = require('../index');
const Year = require('../model/model_year')(sequelize, DataTypes);

class ModelYearService {

    register(body) {
        return new Promise((resolve, reject) => {
            return Year.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    update(body, condition) {
        return Year.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    delete(param) {
        return new Promise((resolve, reject) => {
                return Year.destroy({
                    where: param
                }).then(async u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
}
}
module.exports = ModelYearService;