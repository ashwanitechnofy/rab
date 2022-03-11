const CategoryService = require("../service/category");
const Category = new CategoryService();
const controller = {};

controller.CategoryList = async (req, res) => {
    const service = await Category.getParent()
     return res.status(200).json({
                success: true,
                data: service,
                error: false,
                message: 'Successfully fetched categories!'
            })
}

module.exports = controller;