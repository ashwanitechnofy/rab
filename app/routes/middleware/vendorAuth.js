const RoleService = require("../../src/service/role");
const UserService = require("../../src/service/user");

const User = new UserService();
const Role = new RoleService();

module.exports = async(req, res, next) => {
    try {
      let data = req.decoded_data;
        if (data) {
            var roleId = await Role.getIdByRoleName('Vendor');
            const service = await User.checkUserExist({email:data.email,role_id:roleId,status:'1'});
            req.roleId = roleId;
            req.user_id = service.id;
           if(service)
            next();
            else
            res.status(401).json({ success: false, message: "Unauthorized User" })
        }
        else {
            res.status(401).json({ success: false, message: "Invalid Token" })
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid Token" })
    }
}