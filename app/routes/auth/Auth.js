const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (req, res, next) => {
    try {
        const jwttoken = req.body.token || req.query.token || req.params.token || req.headers.token;
        if (jwttoken) {
            const decoded = jwt.verify(jwttoken, config.SECRET)
            req.decoded_data = decoded;
            next()
        }
        else {
            res.status(401).json({ success: false, message: "Invalid Token" })
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid Token" })
    }

}