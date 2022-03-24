const UserService = require("../../src/service/user");

const User = new UserService();

module.exports = async(req, res, next) => {
    try {
        let authUser = req.decoded_data;
        if (authUser) {
            const isVendor = await User.checkUserExist({email: authUser.email, role_id: authUser.role_id, status: '1'});
            if(isVendor){
                next();
            } else{
                res.status(401).json({ status: 401, message: "Unauthorized", error: true });
            }
        } else {
            return res.send({ status: 400, message: "Invalid token", error: err });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Somthing went wrong.", error: error });
    }
}