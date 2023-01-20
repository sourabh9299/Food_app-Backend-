const reviewModel = require('../models/reviewModel');

module.exports.getAllReviews = async function getAllReviews(req, res) {
    const review = await reviewModel.find();
    res.json({ message: "req recived", review })
}
module.exports.top3Review = async function top3Review(req, res) {
    try {
        const allReviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
        if (allReviews) {
            res.json({
                message: "top 3 reviews", allReviews
            })
        } else {
            res.json({
                message: "reviews not done yet"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.createReview = async function createReview(req, res) {
    try {
        const review = req.body;

        let doc = await reviewModel.create(review);
        res.json({
            message: "review is saved ", doc
        })

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.updateReview = async function updateReview(req, res) {
}

module.exports.deleteReview = async function deleteReview(req, res) {

    try {
        let review = req.body
        let reviewTobedeletd = await reviewModel.find({ review: review.review })
        if (reviewTobedeletd) {
            await reviewModel.deleteOne(reviewTobedeletd);
            res.json({
                message: "review is delete", reviewTobedeletd
            })
        }
    }

    catch (err) {
        res.json({
            message: err.message
        })
    }
}




