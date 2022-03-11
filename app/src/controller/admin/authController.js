// const UserService = require("../../service/user");
// const bcrypt = require('bcrypt');

// const User = new UserService();

const controller = {};

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Super Admin / Admin login form
*/
controller.loginForm = async (req, res) => {
    return res.render('login', {key: 'login'});
}

/**
 * @params:      Request
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To authenticate Super Admin / Admin 
*/
controller.login = async (req, res) => {
    try {
        console.log(req);
    } catch (err) {
        console.log(err);
    }
}

module.exports = controller;