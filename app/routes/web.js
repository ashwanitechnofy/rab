var { reset, submit_reset, thankyou } = require('../src/controller/web');
var { loginForm, login, logout } = require('../src/controller/admin/authController');
var { dashboard } = require('../src/controller/admin/dashboardController');
var { subAdminIndex, subAdminCreate, subAdminStore, subAdminView, subAdminEdit, subAdminUpdate, subAdminUpdateStatus, subAdminDelete, vendorsIndex, vendorsCreate, vendorsStore, vendorsView, vendorsEdit, vendorsUpdate, usersIndex, usersCreate, usersStore, usersView, usersEdit, usersUpdate, taxiDriversIndex, taxiDriversCreate, taxiDriversStore, taxiDriversView, taxiDriversEdit, taxiDriversUpdate, hotelsIndex, hotelsCreate, hotelsStore, hotelsView, hotelsEdit, hotelsUpdate } = require('../src/controller/admin/userController');
var { categoriesIndex, categoriesCreate, categoriesStore, categoriesView, categoriesEdit, categoriesUpdate, activitiesIndex, activitiesCreate } = require('../src/controller/admin/categoriesController');

var adminAuth = require('./middleware/adminAuth');

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
	app.get('/admin/users/sub_admin/index', subAdminIndex);
	app.get('/admin/users/sub_admin/create', subAdminCreate);
	app.post('/admin/users/sub_admin/store', subAdminStore);
	app.get('/admin/users/sub_admin/view', subAdminView);
	app.get('/admin/users/sub_admin/edit', subAdminEdit);
	// app.post('/admin/users/sub_admin/update/:id', subAdminUpdate);
	app.post('/admin/users/sub_admin/update_status/:id', subAdminUpdateStatus);
	app.post('/admin/users/sub_admin/delete/:id', subAdminDelete);


	/* Vendors */
	app.get('/admin/users/vendors/index', vendorsIndex);
	app.get('/admin/users/vendors/create', vendorsCreate);
	app.post('/admin/users/vendors/store', vendorsStore);
	app.get('/admin/users/vendors/view', vendorsView);
	app.get('/admin/users/vendors/edit', vendorsEdit);
	// app.post('/admin/users/vendors/update/:id', vendorsUpdate);

	/* Users */
	app.get('/admin/users/users/index', usersIndex);
	app.get('/admin/users/users/create', usersCreate);
	app.post('/admin/users/users/store', usersStore);
	app.get('/admin/users/users/view', usersView);
	app.get('/admin/users/users/edit', usersEdit);
	// app.post('/admin/users/users/update/:id', usersUpdate);

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
	app.get('/admin/categories/index', categoriesIndex);
	app.get('/admin/categories/create', categoriesCreate);
	app.post('/admin/categories/store', categoriesStore);
	app.get('/admin/categories/view', categoriesView);
	app.get('/admin/categories/edit', categoriesEdit);
	// app.post('/admin/categories/update/:id', categoriesUpdate);

	/* Activities */
	app.get('/admin/activities/index', activitiesIndex);
	app.get('/admin/activities/create', activitiesCreate);

	app.post('/admin/logout', adminAuth, logout);

}