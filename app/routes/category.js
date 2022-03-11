var { CategoryList } = require('../src/controller/category')

module.exports = (app) => {
	app.get('/api/v1/category', CategoryList);
}