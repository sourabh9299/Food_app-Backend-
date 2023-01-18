const jwt = require('jsonwebtoken')
const JWT_key =require('../secrets')
const userModel = require("../models/userModel");


module.exports.middleware1= function middleware1(req, res, next) {
    console.log("middleware 1 is called ")
    next();
}

module.exports.getAllUser =async function getAllUser(req, res) {
   
    try {
    console.log("User Called ");
    // let id = req.params.id;
    let allUsers = await userModel.find();
    res.json({
        message: " All users are recived ", allUsers
    })
    }
    catch (err) {
        res.json({
        message:err.message
    })
    }
}

module.exports.getuser = async function getuser(req, res) {

    try {
        
        let id = req.id;
        let user = await userModel.findById(id);
        res.json({message:"user Recived",user})
    }
    catch (err) {
        res.json({
            message:err.message
        })
    }


}

module.exports.postUser =async function postUser(req, res) {
    // console.log(req.body.Name)
    try {
        let data = req.body;
        let user = await userModel.create(data);

        // users.push(req.body)
        res.json({
            message: "data Recived Successfully",
            user
        });
    }
    catch (err) {
        res.send(err.message)
    }
}

module.exports.updateUser = async function updateUser(req, res) {
    
    try {
        console.log(req.id);
        let id = req.params.id;
        // console.log(id)
        let user =await userModel.findById(id);
        let datatobeupdated = req.body;
        console.log(user)
        if (user) {
            const keys = [];
            for (let key in datatobeupdated) {
                keys.push(key);
            }
           
            for (let i = 0;i <keys.length; i++){
                user[keys[i]] = datatobeupdated[keys[i]];

            }
            const updateddata = await user.save(); 
            res.json({"message":"done saveing"})
        }        
        else{
            res.json({
            message: "User Not found" 
       })
        }
    }
    catch (err) {
        console.log(err.message)
    }

}

module.exports.deleteUser =async function deleteUser(req, res) {
    try {
        
    
    let id = req.id;
    let user =await userModel.findByIdAndDelete(id);
    console.log(user);
    let del = await user.remove();
        res.json({
        message:"user is deleted",del
    })
    }
    catch(err) {
        res.json({
            message:err.message
        })
    }
    

   
}

module.exports.setCookies = function setCookies(req, res) {
    // res.setHeader('Set-Cookie', "isLoggedIn=true");
    res.cookie('isLoggedIn', false, { maxAge: 2000, secure: true });
    res.cookie('password', 12232123, { secure: true });
    res.send("cookies has been set");
}

module.exports.getCookies = function getCookies(req, res) {
    let cookie = req.cookies.password;
    console.log(cookie);
    res.send("Data Recived")


}