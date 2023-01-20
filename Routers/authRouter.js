const express = require('express')
const authRouter = express.Router();


const {  Signup, deleteSignup, loginUser }=require('../controller/authController')

// For auth Route
authRouter
.route('/')
.get()
.post()

module.exports = authRouter