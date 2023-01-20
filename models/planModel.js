const mongoose = require('mongoose');
const { db_link } = require("../secrets")
mongoose.set('strictQuery', true);


mongoose.connect(db_link)
    .then(function () {
        console.log("Plan-Db is connected ")
    })
    .catch(function (err) {
        console.log(err)
    })

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    averageRating: {
        type: Number
    },
    Discount: {
        type: Number,
        Discount: function () {
            return this.Discount < 100
        }
    }


});


const planModel = mongoose.model('planModel', planSchema);
module.exports = planModel;

// (async function createPlan() {
//     let plan = {
//         name: "superFood",
//         duration: 3,
//         price: 1000,
//         averageRating: 4,
//         Discount: 10
//     }
//     let data = await planModel.create(plan);
//     console.log(data);
//     // const doc = new planModel(plan);
//     // await doc.save();

// })();



