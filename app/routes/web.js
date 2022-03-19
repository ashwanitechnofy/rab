var { reset, submit_reset, thankyou } = require('../src/controller/web');
var { loginForm, login, logout } = require('../src/controller/admin/authController');
var { dashboard } = require('../src/controller/admin/dashboardController');
var { subAdminIndex, subAdminCreate, subAdminStore, subAdminView, subAdminEdit, subAdminUpdate, subAdminUpdateStatus, subAdminDelete, vendorsIndex, vendorsCreate, vendorsStore, vendorsView, vendorsEdit, vendorsUpdate, usersIndex, usersCreate, usersStore, usersView, usersEdit, usersUpdate, usersUpdateStatus, usersDelete, taxiDriversIndex, taxiDriversCreate, taxiDriversStore, taxiDriversView, taxiDriversEdit, taxiDriversUpdate, hotelsIndex, hotelsCreate, hotelsStore, hotelsView, hotelsEdit, hotelsUpdate } = require('../src/controller/admin/userController');
var { categoriesIndex, categoriesCreate, categoriesStore, categoriesView, categoriesEdit, categoriesUpdate, categoriesUpdateStatus, activitiesIndex, activitiesCreate } = require('../src/controller/admin/categoriesController');

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
	app.get('/admin/users/vendors/index', vendorsIndex);
	app.get('/admin/users/vendors/create', vendorsCreate);
	app.post('/admin/users/vendors/store', vendorsStore);
	app.get('/admin/users/vendors/view', vendorsView);
	app.get('/admin/users/vendors/edit', vendorsEdit);
	// app.post('/admin/users/vendors/update/:id', vendorsUpdate);

	/* Users */
	app.get('/admin/users/users/index', adminAuth, usersIndex);
	app.get('/admin/users/users/create', adminAuth, usersCreate);
	app.post('/admin/users/users/store', adminAuth, usersStore);
	app.get('/admin/users/users/view', adminAuth, usersView);
	app.get('/admin/users/users/edit/:id', adminAuth, usersEdit);
	app.post('/admin/users/users/update/:id', adminAuth, Upload, usersUpdate);
	app.post('/admin/users/users/update_status/:id', adminAuth, usersUpdateStatus);
	app.post('/admin/users/users/delete/:id', adminAuth, usersDelete);

	/* Taxi Drivers */
	app.get('/admin/users/taxi_drivers/index', taxiDriversIndex);
	app.get('/admin/users/taxi_drivers/create', taxiDriversCreate);
	app.post('/admin/users/taxi_drivers/store', taxiDriversStore);
	app.get('/admin/users/taxi_drivers/view', taxiDriversView);
	app.get('/admin/users/taxi_drivers/edit', taxiDriversEdit);
	// app.post('/admin/users/taxi_drivers/update/:id', taxiDriversUpdate);

	/* Hotels */
	app.get('/admin/users/hotels/index', hotelsIndex);
	app.get('/admin/users/hotels/create', hotelsCreate);
	app.post('/admin/users/hotels/store', hotelsStore);
	app.get('/admin/users/hotels/view', hotelsView);
	app.get('/admin/users/hotels/edit', hotelsEdit);
	// app.post('/admin/users/hotels/update/:id', hotelsUpdate);

	/* Categories */
	app.get('/admin/categories/index', adminAuth, categoriesIndex);
	app.get('/admin/categories/create', adminAuth, categoriesCreate);
	app.post('/admin/categories/store', adminAuth, categoriesStore);
	app.get('/admin/categories/view', adminAuth, categoriesView);
	app.get('/admin/categories/edit/:id', adminAuth, categoriesEdit);
	app.post('/admin/categories/update/:id', adminAuth, categoriesUpdate);
	app.post('/admin/categories/update_status/:id', adminAuth, categoriesUpdateStatus);

	/* Activities */
	app.get('/admin/activities/index', activitiesIndex);
	app.get('/admin/activities/create', activitiesCreate);

	app.post('/admin/logout', adminAuth, logout);

}