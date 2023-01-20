const express = require('express')
const planRouter = express.Router();

const { protectRoute, isAuthorized } = require('../helper')
const {
    getAllPlans,
    createPlan,
    updatePlan,
    deletePlan,
    getPlan, top3Plans } = require('../controller/planController')

planRouter
    .route('/allplans')
    .get(getAllPlans)

planRouter
    .route("/plans/:id")
    .get(getPlan)


planRouter
    .route('/top3')
    .get(top3Plans)
        
planRouter.use(isAuthorized(['admin', 'restaurantowner']))
planRouter
    .route('/curdPlan')
    .post(createPlan)
    .patch(updatePlan)
    .delete(deletePlan);


planRouter.use(protectRoute)
planRouter
    .route('/')
    .get(getPlan)


module.exports = planRouter

