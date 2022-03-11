const {sequelize,DataTypes} = require('../index');
const Comment = require('../model/comments')(sequelize, DataTypes);

class CommentService {
    register(body) {
        return new Promise((resolve, reject) => {
            return Comment.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }
}
module.exports = CommentService;