const RoleService = require("../../service/role");
const UserService = require("../../service/user");
// const bcrypt = require('bcrypt');

const Role = new RoleService();
const User = new UserService();

const controller = {};

/********** Sub Admin **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Sub Admin listning
*/
controller.subAdminIndex = async (req, res) => {
    var adminRoleId = await Role.getIdByRoleName('Admin');
    var subAdmin = await User.getUserAll({ role_id: adminRoleId });
    return res.render('manageUsers/subAdmin/index', {subAdmin: subAdmin});
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Sub Admin create form
*/
controller.subAdminCreate = async (req, res) => {
    return res.render('manageUsers/subAdmin/create');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store Sub Admin
*/
controller.subAdminStore = async (req, res) => {
    console.log("****************** Store");
    console.log('okk');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Sub Admin detail
*/
controller.subAdminView = async (req, res) => {
    console.log("****************** View");
    return res.render('manageUsers/subAdmin/view');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Sub Admin edit form
*/
controller.subAdminEdit = async (req, res) => {
    console.log("****************** Edit");
    return res.render('manageUsers/subAdmin/edit');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To Sub Admin update
*/
controller.subAdminUpdateStatus = async (req, res) => {
    console.log("****************** Update Status");
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete Sub Admin details
*/
controller.subAdminDelete = async (req, res) => {
    // var subAdmin = await User.deleteUser({ _id:req.params.id });
    console.log("****************** Delete");
}




/********** Vendor **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Vendors listning
*/
controller.vendorsIndex = async (req, res) => {
    return res.render('manageUsers/vendors/index');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Vendors Create
*/
controller.vendorsCreate = async (req, res) => {
    return res.render('manageUsers/vendors/create');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store Vendors
*/
controller.vendorsStore = async (req, res) => {
    console.log('okk');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Vendors view detail
*/
controller.vendorsView = async (req, res) => {
    return res.render('manageUsers/vendors/view');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Vendors edit form
*/
controller.vendorsEdit = async (req, res) => {
    return res.render('manageUsers/vendors/edit');
}

/********** User **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Users listning
*/
controller.usersIndex = async (req, res) => {
    return res.render('manageUsers/users/index');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Users create form 
*/
controller.usersCreate = async (req, res) => {
    return res.render('manageUsers/users/create');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store Users
*/
controller.usersStore = async (req, res) => {
    console.log('okk');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Users view detail
*/
controller.usersView = async (req, res) => {
    return res.render('manageUsers/users/view');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Users edit form
*/
controller.usersEdit = async (req, res) => {
    return res.render('manageUsers/users/edit');
}

/********** Taxi Driver **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Taxi Drivers listning
*/
controller.taxiDriversIndex = async (req, res) => {
    return res.render('manageUsers/taxiDrivers/index');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Taxi Drivers create form
*/
controller.taxiDriversCreate = async (req, res) => {
    return res.render('manageUsers/taxiDrivers/create');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store Taxi Drivers
*/
controller.taxiDriversStore = async (req, res) => {
    console.log('okk');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Taxi view details
*/
controller.taxiDriversView = async (req, res) => {
    return res.render('manageUsers/taxiDrivers/view');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Taxi edit form
*/
controller.taxiDriversEdit = async (req, res) => {
    return res.render('manageUsers/taxiDrivers/edit');
}

/********** Hotel **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Hotels listning
*/
controller.hotelsIndex = async (req, res) => {
    return res.render('manageUsers/hotels/index');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Hotels create form 
*/
controller.hotelsCreate = async (req, res) => {
    return res.render('manageUsers/hotels/create');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store Hotels
*/
controller.hotelsStore = async (req, res) => {
    console.log('okk');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Hotels view details
*/
controller.hotelsView = async (req, res) => {
    return res.render('manageUsers/hotels/view');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Hotels edit form
*/
controller.hotelsEdit = async (req, res) => {
    return res.render('manageUsers/hotels/edit');
}

module.exports = controller;