// const UserService = require("../../service/user");
// const bcrypt = require('bcrypt');

// const User = new UserService();

const controller = {};

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Activities listning
*/
controller.activitiesIndex = async (req, res) => {
    return res.render('manageCategories/activities/index');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Activities Create
*/
controller.activitiesCreate = async (req, res) => {
    return res.render('manageCategories/activities/create');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Categories listning
*/
controller.categoriesIndex = async (req, res) => {
    return res.render('manageCategories/categories/index');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Categories Create
*/
controller.categoriesCreate = async (req, res) => {
    return res.render('manageCategories/categories/create');
}

module.exports = controller;