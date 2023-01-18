const express = require('express')
const app = express();
const userRouter = express.Router();

const { protectRoute, isAuthorized } = require('../helper');
const { middleware1, getAllUser, postUser, updateUser, deleteUser, setCookies, getCookies, getuser } = require('../controller/userController')

const { Signup, deleteSignup, login } = require('../controller/authController')


// For User Route


userRouter
    .route('/signup')
    .post(Signup)
    .delete(deleteSignup)



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
        
userRouter.use(protectRoute)
userRouter
    .route("/profile")
    .get(getuser)

userRouter.use(isAuthorized(['admin']));
userRouter
    .route('/admin')
    .get(getAllUser)


module.exports = userRouter;