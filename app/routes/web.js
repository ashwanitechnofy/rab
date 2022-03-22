var { reset, submit_reset, thankyou } = require('../src/controller/web');
var { loginForm, login, logout } = require('../src/controller/admin/authController');
var { dashboard } = require('../src/controller/admin/dashboardController');
var { subAdminIndex, subAdminCreate, subAdminStore, subAdminView, subAdminEdit, subAdminUpdate, subAdminUpdateStatus, subAdminDelete, vendorsIndex, vendorsCreate, vendorsStore, vendorsView, vendorsEdit, vendorsUpdate, vendorsIsApproved, vendorsUpdateStatus, vendorsDelete, usersIndex, usersCreate, usersStore, usersView, usersEdit, usersUpdate, usersUpdateStatus, usersDelete, taxiDriversIndex, taxiDriversCreate, taxiDriversStore, taxiDriversView, taxiDriversEdit, taxiDriversUpdate, taxiDriversIsApproved, taxiDriversUpdateStatus, taxiDriversDelete, hotelsIndex, hotelsCreate, hotelsStore, hotelsView, hotelsEdit, hotelsUpdate, hotelsUpdateStatus, hotelsDelete } = require('../src/controller/admin/userController');
var { categoriesIndex, categoriesCreate, categoriesStore, categoriesView, categoriesEdit, categoriesUpdate, categoriesUpdateStatus, activitiesIndex, activitiesCreate, activitiesStore, activitiesView, activitiesEdit, activitiesUpdate, activitiesUpdateStatus } = require('../src/controller/admin/categoriesController');

var adminAuth = require('./middleware/adminAuth');

var { Upload } = require('./common/files/upload');

module.exports = (app) => {
	app.get(['/reset/:token','/reset'], reset);
    app.post('/reset/:token', submit_reset);
	app.get('/thankyou',thankyou);

	// Login
	app.get('/admin/login', loginForm);
	app.post('/admin/login', login);

	/* Dashboard */
	app.get('/admin/dashboard', adminAuth, dashboard);
	
	/* Super Admin / Admin */
	app.get('/admin/users/sub_admin/index', adminAuth, subAdminIndex);
	app.get('/admin/users/sub_admin/create', adminAuth, subAdminCreate);
	app.post('/admin/users/sub_admin/store', adminAuth, Upload, subAdminStore);
	app.get('/admin/users/sub_admin/view', adminAuth, subAdminView);
	app.get('/admin/users/sub_admin/edit/:id', adminAuth, subAdminEdit);
	app.post('/admin/users/sub_admin/update/:id', adminAuth, Upload, subAdminUpdate);
	app.post('/admin/users/sub_admin/update_status/:id', adminAuth, subAdminUpdateStatus);
	app.post('/admin/users/sub_admin/delete/:id', adminAuth, subAdminDelete);

	/* Vendors */
	app.get('/admin/users/vendors/index', adminAuth, vendorsIndex);
	app.get('/admin/users/vendors/create', adminAuth, vendorsCreate);
	app.post('/admin/users/vendors/store', adminAuth, Upload, vendorsStore);
	app.get('/admin/users/vendors/view', adminAuth, vendorsView);
	app.get('/admin/users/vendors/edit/:id', adminAuth, vendorsEdit);
	app.post('/admin/users/vendors/update/:id', adminAuth, Upload, vendorsUpdate);
	app.post('/admin/users/vendors/is_approved/:id', adminAuth, vendorsIsApproved);
	app.post('/admin/users/vendors/update_status/:id', adminAuth, vendorsUpdateStatus);
	app.post('/admin/users/vendors/delete/:id', adminAuth, vendorsDelete);

	/* Users */
	app.get('/admin/users/users/index', adminAuth, usersIndex);
	app.get('/admin/users/users/create', adminAuth, usersCreate);
	app.post('/admin/users/users/store', adminAuth, Upload, usersStore);
	app.get('/admin/users/users/view', adminAuth, usersView);
	app.get('/admin/users/users/edit/:id', adminAuth, usersEdit);
	app.post('/admin/users/users/update/:id', adminAuth, Upload, usersUpdate);
	app.post('/admin/users/users/update_status/:id', adminAuth, usersUpdateStatus);
	app.post('/admin/users/users/delete/:id', adminAuth, usersDelete);

	/* Taxi Drivers */
	app.get('/admin/users/taxi_drivers/index', adminAuth, taxiDriversIndex);
	app.get('/admin/users/taxi_drivers/create', adminAuth, taxiDriversCreate);
	app.post('/admin/users/taxi_drivers/store', adminAuth, Upload, taxiDriversStore);
	app.get('/admin/users/taxi_drivers/view', adminAuth, taxiDriversView);
	app.get('/admin/users/taxi_drivers/edit', adminAuth, taxiDriversEdit);
	app.post('/admin/users/taxi_drivers/update/:id', adminAuth, Upload, taxiDriversUpdate);
	app.post('/admin/users/taxi_drivers/is_approved/:id', adminAuth, taxiDriversIsApproved);
	app.post('/admin/users/taxi_drivers/update_status/:id', adminAuth, taxiDriversUpdateStatus);
	app.post('/admin/users/taxi_drivers/delete/:id', adminAuth, taxiDriversDelete);

	/* Hotels */
	app.get('/admin/users/hotels/index', adminAuth, hotelsIndex);
	app.get('/admin/users/hotels/create', adminAuth, hotelsCreate);
	app.post('/admin/users/hotels/store', adminAuth, Upload, hotelsStore);
	app.get('/admin/users/hotels/view', adminAuth, hotelsView);
	app.get('/admin/users/hotels/edit/:id', adminAuth, hotelsEdit);
	app.post('/admin/users/hotels/update/:id', adminAuth, Upload, hotelsUpdate);
	app.post('/admin/users/hotels/update_status/:id', adminAuth, hotelsUpdateStatus);
	app.post('/admin/users/hotels/delete/:id', adminAuth, hotelsDelete);

	/* Categories */
	app.get('/admin/categories/index', adminAuth, categoriesIndex);
	app.get('/admin/categories/create', adminAuth, categoriesCreate);
	app.post('/admin/categories/store', adminAuth, categoriesStore);
	app.get('/admin/categories/view', adminAuth, categoriesView);
	app.get('/admin/categories/edit/:id', adminAuth, categoriesEdit);
	app.post('/admin/categories/update/:id', adminAuth, categoriesUpdate);
	app.post('/admin/categories/update_status/:id', adminAuth, categoriesUpdateStatus);

	/* Activities */
	app.get('/admin/activities/index', adminAuth, activitiesIndex);
	app.get('/admin/activities/create', adminAuth, activitiesCreate);
	app.post('/admin/activities/store', adminAuth, activitiesStore);
	app.get('/admin/activities/view', adminAuth, activitiesView);
	app.get('/admin/activities/edit/:id', adminAuth, activitiesEdit);
	app.post('/admin/activities/update/:id', adminAuth, activitiesUpdate);
	app.post('/admin/activities/update_status/:id', adminAuth, activitiesUpdateStatus);

	app.post('/admin/logout', adminAuth, logout);

}