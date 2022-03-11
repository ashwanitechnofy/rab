const {sequelize,DataTypes} = require('../index');
const category = require('../model/category')(sequelize, DataTypes);

 class categoryService {

    getParent() {
        return new Promise((resolve, reject) => {
           return category.findAll({ attributes:['id','title'], where:{parent:{$eq:null}},order: [ ['id', 'DESC'] ]}).then(res => {
                return resolve(res)
            }).catch(err => {
                return reject(err);
            });
        });
    }
    firstCategoryId() {
        return new Promise((resolve, reject) => {
                return category.findOne({attributes:['id']})
                .then(u => {
                    return resolve(u.id);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }
}
 module.exports = categoryService;