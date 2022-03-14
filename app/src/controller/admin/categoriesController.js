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
 * @purpose:     To view Categories create form
*/
controller.categoriesCreate = async (req, res) => {
    return res.render('manageCategories/categories/create');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store categories
*/
controller.categoriesStore = async (req, res) => {
    console.log('okk');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view categories detail
*/
controller.categoriesView = async (req, res) => {
    return res.render('manageCategories/categories/view');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view categories edit form
*/
controller.categoriesEdit = async (req, res) => {
    return res.render('manageCategories/categories/edit');
}

module.exports = controller;