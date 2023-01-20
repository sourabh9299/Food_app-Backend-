const planModel = require('../models/planModel')

module.exports.getAllPlans = async function getAllPlans(req, res) {
    planuser = await planModel.find();
    // console.log(planuser)
    res.json({ message: "req recived", planuser })
}

module.exports.getPlan = async function getPlan(req, res) {
    res.json({ message: "req recived" })
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        console.log(req.id);
        let id = req.params.id;
        // console.log(id)
        let plan = await planModel.findById(id);
        let datatobeupdated = req.body;
        console.log(plan)
        if (plan) {
            const keys = [];
            for (let key in datatobeupdated) {
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                plan[keys[i]] = datatobeupdated[keys[i]];

            }
            const updateddata = await plan.save();
            res.json({ "message": "done saveing" })
        }
        else {
            res.json({
                message: "plan Not found"
            })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}


module.exports.createPlan = async function createPlan(req, res) {

    try {
        const plans = req.body;
        let allPlans = await planModel.find();
        const plan = await planModel.findOne({ name: plans.name });
        if (plan) {
            res.json({
                message: "already exist"
            });

        } else {
            planModel.create(data);
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    res.json({ message: "req recived" })
}


module.exports.top3Plans = async function top3Plans(req, res) {
    try {

        const plans = await planModel.find().sort({ averageRating: -1 }).limit(3);
        return res.json({
            message: "top 3 recived ",
             data: plans
        })


    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}