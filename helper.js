const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel');
const {JWT_key}  = require('./secrets')
// console.log(JWT_key);

module.exports.protectRoute = async function (req, res, next) {
    let token;
    if (req.cookies.login) {
        token = req.cookies.login;
        let payloadObj = jwt.verify(token, JWT_key);
        const user = await userModel.findById(payloadObj.payload);
        req.id = user.id;
        req.role = user.role;
        if (payloadObj) next();
        else {
            req.json({
                msg: "user not verified",
            });
        }
    } else {
        return res.json({
            msg: "opertion not allowed",
        });
    }
};

module.exports.isAuthorized = function (roles) {
    return function (req, res, next) {
        let role = req.role;
        if (roles.includes(role)) {
            next();
        }
        else {
            
            res.status(401).json({
            msg: "invalid role",
        });
    }
    };
};