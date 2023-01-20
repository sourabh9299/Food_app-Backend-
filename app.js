// Node-Js-Express..... 

const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
app.use(cookieParser());

// console.log(__dirname)
const userRouter = require('./Routers/userRouter')
const authRouter = require('./Routers/authRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/plan', planRouter);
app.use('/plan', planRouter);

app.get("/", (req, res) => {

    res.sendFile("./public/views/index.html", { root: __dirname });

})
app.listen(5000);



