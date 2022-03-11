var { reset, submit_reset, thankyou } = require('../src/controller/web');
var { loginForm, login } = require('../src/controller/admin/authController');
var { dashboard } = require('../src/controller/admin/dashboardController');
var { subAdminIndex, subAdminCreate, vendorsIndex, vendorsCreate, usersIndex, usersCreate, taxiDriversIndex, taxiDriversCreate, hotelsIndex, hotelsCreate } = require('../src/controller/admin/userController');

module.exports = (app) => {
	app.get(['/reset/:token','/reset'], reset);
    app.post('/reset/:token', submit_reset);
	app.get('/thankyou',thankyou);

	/* Super Admin / Admin */
	app.get('/admin/login', loginForm);
	app.post('/admin/login', login);

	app.get('/admin/dashboard', dashboard);
	
	app.get('/admin/users/sub_admin/index', subAdminIndex);
	app.get('/admin/users/sub_admin/create', subAdminCreate);

	app.get('/admin/users/vendors/index', vendorsIndex);
	app.get('/admin/users/vendors/create', vendorsCreate);

	app.get('/admin/users/users/index', usersIndex);
	app.get('/admin/users/users/create', usersCreate);

	app.get('/admin/users/taxi_drivers/index', taxiDriversIndex);
	app.get('/admin/users/taxi_drivers/create', taxiDriversCreate);

	app.get('/admin/users/hotels/index', hotelsIndex);
	app.get('/admin/users/hotels/create', hotelsCreate);

}