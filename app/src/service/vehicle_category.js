const {sequelize,DataTypes} = require('../index');
const Vehicle_category = require('../model/vehicle_category')(sequelize, DataTypes);
const Model = require('../model/model')(sequelize, DataTypes);
const Company = require('../model/company')(sequelize, DataTypes);


const vehicleCompany = Vehicle_category.hasMany(Company, {
    foreignKey: 'category_id'
});

const companyModel = Company.hasMany(Model, {
    foreignKey: 'company_id'
});

class VehicleCategoryService {

    getCompanyModel(body) {
        return new Promise((resolve, reject) => {
                return Vehicle_category.findAll({ include:[{model:Company, foreignKey: 'category_id',include:[{model:Model,foreignKey: 'company_id'}]}] })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    firstCategoryId() {
        return new Promise((resolve, reject) => {
                return Vehicle_category.findOne({attributes:['id']})
                .then(u => {
                    return resolve(u.id);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }

}
module.exports = VehicleCategoryService;