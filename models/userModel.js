const mongoose = require('mongoose');
const { db_link } = require("../secrets")
mongoose.set('strictQuery', true);
const brypt = require('bcrypt');
var emailvalidator = require("email-validator");
const { v4: uuidv4 } = require('uuid')


mongoose.connect(db_link)
    .then(function () {
        console.log("User-Db is connected ")
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
    confirmPassword: {
        type: String,
        required: true,
        validate: function () {
            return this.confirmPassword == this.password;
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
    this.confirmPassword = undefined;
})

// userSchema.pre('save', async function () {
//     let salt =await brypt.genSalt();
//     let hasedpassword = await brypt.hash(this.password, salt);
//     this.password = hasedpassword;
//     console.log(hasedpassword);

// });

userSchema.methods.createRestToken = function () {
    const restToken = uuidv4();
    this.restToken = restToken;
}

userSchema.methods.restPasswordHandler = function () {
    this.password = password;
    this.confirmPassword = this.confirmPassword
    this.restToken = undefined;

}


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