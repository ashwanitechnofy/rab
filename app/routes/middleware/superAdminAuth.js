const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

const RoleService = require("../../src/service/role");

const Role = new RoleService();

module.exports = (req, res, next) => {
    try {
        if (req.session.data.token) {
            jwt.verify(req.session.data.token, config.SECRET, (err, verify) => {
                if(!err){
                    req.decoded_data = verify.user;
                    next();
                } else{
                    res.redirect('/admin/login');
                }
            });
        } else{
            res.redirect('/admin/login');
        }
    } catch (error){
        res.redirect('/admin/login');
    }
}