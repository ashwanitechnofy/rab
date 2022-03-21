var bcrypt = require('bcrypt');
const {sequelize,DataTypes} = require('../../index');
const Category = require('../../model/category')(sequelize, DataTypes);

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
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            // req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Admin');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            const signUp = await User.register(req.body);
            if (signUp) {
                // req.toastr.success("User added successfully.");
                return res.redirect('/admin/users/sub_admin/index');
            } else{
                // req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
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
 * @purpose:     To view Sub Admin detail
*/
controller.subAdminView = async (req, res) => {
    return res.render('manageUsers/subAdmin/view');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Sub Admin edit form
*/
controller.subAdminEdit = async (req, res) => {
    var adminRoleId = await Role.getIdByRoleName('Admin');
    var subAdmin = await User.getUserOne({ id: req.params.id,  role_id: adminRoleId});
    return res.render('manageUsers/subAdmin/edit', {subAdmin: subAdmin});
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To Sub Admin update
*/
controller.subAdminUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            // req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Admin');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            const signUp = await User.update(req.body, req.params.id);
            if (signUp) {
                // req.toastr.error("User updated successfully.");
                return res.redirect('/admin/users/sub_admin/index');
            } else{
                // req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
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
 * @purpose:     To Sub Admin update status
*/
controller.subAdminUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete Sub Admin
*/
controller.subAdminDelete = async (req, res) => {
    await User.deleteUser(req.params.id);
    return res.redirect('back');
}

/********** Vendor **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Vendors listning
*/
controller.vendorsIndex = async (req, res) => {
    var vendorRoleId = await Role.getIdByRoleName('Vendor');
    var vendors = await User.getUserAll({ role_id: vendorRoleId });
    return res.render('manageUsers/vendors/index', {vendors: vendors});
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Vendors Create
*/
controller.vendorsCreate = async (req, res) => {
    await Category.findAll({where: {status: '1'}}).then(categories => {
        return res.render('manageUsers/vendors/create', {categories: categories});
    }).catch(err => {
        // req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    });
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store Vendors
*/
controller.vendorsStore = async (req, res) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // try {
        // var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        // if (isUser && Object.keys(isUser).length) {
        //     console.log('sssssssssssssssssssssssssssssssssss');
        //     // req.toastr.error("User already exist.");
        //     return res.redirect('back');
        // } else {
        //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            // const salt = await bcrypt.genSalt();
            // req.body.password = await bcrypt.hash(req.body.password, salt);
            // var roleId = await Role.getIdByRoleName('Vendor');
            // req.body.role_id = roleId;
            // console.log('###################################');
            // if (req.files && Object.keys(req.files).length) {
        //         console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        //         if (req.files.image && Object.keys(req.files.image).length) {
        //           req.body.image = req.files.image[0].filename;
        //         }
        //         console.log(req.files);
        //         // if (req.files.visiting_card_image && Object.keys(req.files.visiting_card_image).length) {
        //         //     req.body.visiting_card_image = req.files.visiting_card_image[0].filename;
        //         // }
        //         // if (req.files.award_certification_image && Object.keys(req.files.award_certification_image).length) {
        //         //     req.body.award_certification_image = req.files.award_certification_image[0].filename;
        //         // }
            // }
        //     console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', req.body);
        //     const signUp = await User.register(req.body);
        //     if (signUp) {
        //         req.body.user_id = signup.id;
        //         await User.registerVendorBusinessDetail(req.body);
        //         // req.toastr.success("Vendor added successfully.");
        //         return res.redirect('/admin/users/vendors/index');
        //     } else{
        //         // req.toastr.error("Internal server error.");
        //         return res.redirect('back');
        //     }
        // }
    // } catch (err) {
    //     console.log('cccccccccccccccccccccccccccccccc', req.body);
    //     // req.toastr.error("Somthing went wrong.");
    //     return res.redirect('back');
    // }
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
    try {
        var vendorRoleId = await Role.getIdByRoleName('Vendor');
        var vendor = await User.getVendorOne({ id: req.params.id,  role_id: vendorRoleId});
        var categories = await Category.findAll({where: {status: '1'}});
        return res.render('manageUsers/vendors/edit', {categories: categories, vendor: vendor});
    } catch (err) {
        // req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To Vendors update
*/
controller.vendorsUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            // req.toastr.error("Vendor already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Vendor');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            const signUp = await User.update(req.body);
            if (signUp) {
                // req.toastr.success("Vendor updated successfully.");
                return res.redirect('/admin/users/vendors/index');
            } else{
                // req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
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
 * @purpose:     To Vendors account approved
*/
controller.vendorsIsApproved = async (req, res) => {
    let id = req.params.id;
    let isApproved = req.body.is_approved == '1' ? '0' : '1';
    await User.update({is_approved: isApproved}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To user update status
*/
controller.vendorsUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete user
*/
controller.vendorsDelete = async (req, res) => {
    await User.deleteUser(req.params.id);
    return res.redirect('back');
}

/********** User **********/

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Users listning
*/
controller.usersIndex = async (req, res) => {
    var userRoleId = await Role.getIdByRoleName('User');
    var users = await User.getUserAll({ role_id: userRoleId });
    return res.render('manageUsers/users/index', {users: users});
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
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            // req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('User');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            const signUp = await User.register(req.body);
            if (signUp) {
                // req.toastr.success("User added successfully.");
                return res.redirect('/admin/users/users/index');
            } else{
                // req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
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
    var userRoleId = await Role.getIdByRoleName('User');
    var user = await User.getUserOne({ id: req.params.id,  role_id: userRoleId});
    return res.render('manageUsers/users/edit', {user: user});
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To Users update
*/
controller.usersUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            // req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Admin');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            const signUp = await User.update(req.body);
            if (signUp) {
                // req.toastr.success("User updated successfully.");
                return res.redirect('/admin/users/users/index');
            } else{
                // req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
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
 * @purpose:     To user update
*/
controller.usersUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete user
*/
controller.usersDelete = async (req, res) => {
    await User.deleteUser(req.params.id);
    return res.redirect('back');
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
    var hotelsRoleId = await Role.getIdByRoleName('Hotel');
    var hotels = await User.getUserAll({ role_id: hotelsRoleId });
    return res.render('manageUsers/hotels/index', {hotels: hotels});
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
    console.log('###############    request');
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            // req.toastr.error("User already exist.");
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  1');
            return res.redirect('back');
        } else{
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Hotel');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            const signUp = await User.register(req.body);
            if (signUp) {
                // req.toastr.success("User added successfully.");
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  2');
                return res.redirect('/admin/users/hotels/index');
            } else{
                // req.toastr.error("Internal server error.");
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  3');
                return res.redirect('back');
            }
        }
    } catch (err) {
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  4');
        // req.toastr.error("Somthing went wrong.");
        return res.redirect('back');
    }
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
    var hotelRoleId = await Role.getIdByRoleName('Hotel');
    var hotel = await User.getUserOne({ id: req.params.id,  role_id: hotelRoleId});
    console.log('@@@@@@@@@@@@@@@@@@@@@@', hotel);
    return res.render('manageUsers/hotels/edit', {hotel: hotel});
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To Hotels update
*/
controller.hotelsUpdate = async (req, res) => {
    try {
        var isUser = await User.checkUserExist({$or: [{email:req.body.email}, {mobile_no:req.body.mobile_no}]});
        if (isUser && Object.keys(isUser).length) {
            // req.toastr.error("User already exist.");
            return res.redirect('back');
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Hotel');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.image && Object.keys(req.files.image).length) {
                  req.body.image = req.files.image[0].filename;
                }
            }
            const signUp = await User.register(req.body);
            if (signUp) {
                // req.toastr.error("Hotel updated successfully.");
                return res.redirect('/admin/users/hotels/index');
            } else{
                // req.toastr.error("Internal server error.");
                return res.redirect('back');
            }
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
 * @purpose:     To hotels update status
*/
controller.hotelsUpdateStatus = async (req, res) => {
    let id = req.params.id;
    let status = req.body.status == '1' ? '0' : '1';
    await User.update({status: status}, {id: id});
    return res.redirect('back');
}

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete hotels
*/
controller.hotelsDelete = async (req, res) => {
    await User.deleteUser(req.params.id);
    return res.redirect('back');
}

module.exports = controller;