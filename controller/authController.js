
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const { JWT_key } = require('../secrets');
// const bcrypt = require('bcrypt')

module.exports.Signup = async function Signup(req, res) {
    try {
        
        let data = req.body;
        // console.log(data)
        let user = await userModel.create(data);
        if (user) {
            res.json({
                message:"User Signup",user
            })
        } else {
            res.json({
                message:"User Could not SignedUp"
            })
        }
        
        console.log("user is Created")
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

