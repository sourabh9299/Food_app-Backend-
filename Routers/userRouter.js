const express = require('express')
const userRouter = express.Router();

const { protectRoute, isAuthorized } = require('../helper');
const { middleware1, getAllUser, postUser, updateUser, deleteUser, setCookies, getCookies, getuser } = require('../controller/userController')

const { Signup, deleteSignup, login, forgotPassword, restPassword, Logout } = require('../controller/authController')


// For User Route


userRouter
    .route('/signup')
    .post(Signup)
    .delete(deleteSignup)

userRouter
    .route('/forgotPassword')
    .post(forgotPassword);

userRouter
    .route('/restpassword/:token')
    .post(restPassword);



userRouter
    .route('/users')
    .get(getAllUser)

userRouter
    .route('/')
    // .get( getAllUser)
    .get(middleware1, getAllUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/setCookies")
    .get(setCookies);
userRouter
    .route("/getCookies")
    .get(getCookies);

userRouter
    .route('/login')
    .post(login)


userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/logout')
    .patch(Logout)

userRouter.use(protectRoute)
userRouter
    .route("/profile")
    .get(getuser)

userRouter.use(isAuthorized(['admin']));
userRouter
    .route('/admin')
    .get(getAllUser)

const planModel = require("../models/planModel");



module.exports = userRouter;