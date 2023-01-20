
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { JWT_key } = require('../secrets');
// const bcrypt = require('bcrypt')

module.exports.Signup = async function Signup(req, res) {
    try {
        
        const data = req.body;
        console.log(data)

        let user = await userModel.findOne({ email: data.email });
        if (user) {
            res.json({
                message: "Already Exist", user
            });

        } else {
            userModel.create(data);
            console.log("user is Created")
        }

    }
    catch (err) {
        res.json({
            message:err.message
        })
    }
}


module.exports.deleteSignup=async function deleteSignup(req, res) {
    let request_db = req.body
    let users1 = userModel.deleteMany(request_db);
    res.json({
        message: "Data is deleted"
    })
}

module.exports.login = async function (req, res) {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        console.log(user)
        if (user) {
            //check if password matches
            //bcrypt - compare
            if (password == user.password) {
                let uid = user["_id"];
                var token = jwt.sign({ payload: uid }, JWT_key);
                res.cookie("login", token);
                res.json({
                    msg: "user logged in",
                });
            } else {
                res.json({
                    msg: "wrong credentials",
                });
            }
        } else {
            res.json({
                msg: "user not found",
            });
        }
    } catch (err) {
        res.json({
            msg: err.message,
        });
    }
}

module.exports.forgotPassword = async function (req, res) {
    try {
        let { email } = req.body;
        const user = userModel.findOne({ email: email });
        if (user) {
            const restToken = user.createRestToken();
            // https://xyz.com/restPassword/restToken
            let restPasswordLink = `${res.protcol}://${res.get('host')}/restpassword/{restToken}`;

        } else {
            res.json({
                message: "user Not Found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.restPassword = async function (req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;
        const user = userModel.findOne({ restToken: token });
        if (user) {

            // Rest Password handler will update password with DB
            user.restPasswordHandler(password, confirmPassword);
            await user.save();

            res.josn({
                message: "Password Changed "
            })
        }
        else {
            res.json({
                message: "user Not found"
            })
        }

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.Logout = async function (req, res) {
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        message: "User is Logged Out"
    })
}
