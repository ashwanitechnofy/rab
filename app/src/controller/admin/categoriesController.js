const {sequelize,DataTypes} = require('../../index');
const Category = require('../../model/category')(sequelize, DataTypes);

const controller = {};

/********** Categories **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Categories listning
*/
controller.categoriesIndex = async (req, res) => {
    Category.findAll().then(data => {
        console.log("datadatadatadatadta", data);
        return res.render('manageCategories/categories/index', {data: data});
    }).catch(err => {
        console.log("erorororoor", err);
        // req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
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
    try {
        const category = await Category.create(req.body);
        if (category) {
            req.toastr.success("Category added successfully.");
            return res.redirect('/admin/categories/index');
        } else{
            req.toastr.error("Internal server error.");
            return res.redirect('back');
        }
    } catch (err) {
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
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
    await Category.findOne({where: {id: req.params.id}}).then(data => {
        return res.render('manageCategories/categories/edit', {data: data});
    }).catch(err => {
        // req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To categories update
*/
controller.categoriesUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const category = await Category.update(req.body, {where: {id: id}});
        if (category) {
            // req.toastr.success("Category added successfully.");
            return res.redirect('/admin/categories/index');
        } else{
            // req.toastr.error("Internal server error.");
            return res.redirect('back');
        }
    } catch (err) {
        // req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To categories update status
*/
controller.categoriesUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await Category.update({status: status}, {where: {id: id}});
    return res.redirect('back');
}

/********** Activities **********/

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

module.exports = controller;