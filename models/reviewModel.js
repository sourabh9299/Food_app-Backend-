const mongoose = require('mongoose');
const { db_link } = require("../secrets")


mongoose.connect(db_link)
    .then(function () {
        console.log("review-Db is connected ")
    })
    .catch(function (err) {
        console.log(err)
    });

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'review is required']

    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'rating is required']

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        require: [true, 'review  must belong to user']
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        require: [true, 'plan  must belong to user']
    }
});

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: "email role"
    }).populate('plan')
})

const reviewModel = mongoose.model('reviewModel', reviewSchema);
module.exports = reviewModel; 