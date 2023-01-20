const express = require('express');
const reviewRouter = express.Router();

const { deleteReview, updateReview, createReview, getAllReviews, top3Review
} = require('../controller/reviewController')

reviewRouter
    .route('/all')
    .get(getAllReviews)

reviewRouter
    .route('/top3')
    .get(top3Review)

reviewRouter
    .route('/:id')
    .get(getAllReviews)


reviewRouter
    .route('/')
    .post(createReview)

reviewRouter
    .route("/crud")
    .patch(updateReview)
    .delete(deleteReview)

module.exports = reviewRouter
