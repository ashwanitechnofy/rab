// const UserService = require("../../service/user");
// const bcrypt = require('bcrypt');

// const User = new UserService();

const controller = {};

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Super Admin / Admin dashboard
*/
controller.dashboard = async (req, res) => {
    // app.locals.abc=req.session.data.first_name
    return res.render('dashboard');
}

module.exports = controller;