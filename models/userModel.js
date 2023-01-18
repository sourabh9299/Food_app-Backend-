const mongoose = require('mongoose');
const { db_link } = require("../secrets")
mongoose.set('strictQuery', true);
const brypt = require('bcrypt');
var emailvalidator = require("email-validator");

mongoose.connect(db_link)
    .then(function () {
        console.log("Db is connected ")
    })
    .catch(function (err) {
        console.log(err)
    })

const userSchema = mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        validate: function () {
            return emailvalidator.validate(this.email); true

        }

    },
    password: {
        type: String,
        required: true,

    }
    ,
    confirm: {
        type: String,
        required: true,
        validate: function () {
            return this.confirm == this.password;
        }

    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    }
});


userSchema.pre('save', function () {
    console.log("before saving in DB")
})

userSchema.post('save', function () {
    console.log("after saving in DB");
    

});

userSchema.pre('save', function () {
    this.confirm = undefined;
})

// userSchema.pre('save', async function () {
//     let salt =await brypt.genSalt();
//     let hasedpassword = await brypt.hash(this.password, salt);
//     this.password = hasedpassword;
//     console.log(hasedpassword);

// });

const userModel = mongoose.model('userModel', userSchema);

module.exports=userModel



// IIFE 
// (async function createUser() {
    // let user = {
    //     name: "sourabh1",
    //     email: "sourabhkumar987@gmail.com",
    //     password: "sourabhkum",
    //     confirm: "sourabhkum"
    
    // }   
//     console.log("user Created")
//     let data = await userModel.create(user)
//     // console.log(data);
// })()