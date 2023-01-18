const express = require('express')
const userRouter = express.Router();
const {protectRoute} = require('../helper');

const { deleteUser, updateUser, postUser, getUser, middleware1, setCookies, getCookies }  = require('../controller/userController');

// For User Route 

userRouter
    .route('/')
    .get(protectRoute, getUser)
  
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/setCookies")
    .get(setCookies);
userRouter
    .route("/getCookies")
    .get(getCookies);



module.exports = userRouter;