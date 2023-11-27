const asyncHandler = require('express-async-handler')
const Feedback = require('../models/feedback.model.js')

const getFeedbacks = asyncHandler(async (req, res) => {
    const feedback = await Feedback.find();
    res.status(200).json(feedback)
})

//POST Feedback
const createFeedback = asyncHandler(async (req, res) => {
    const { empDept, empFeedName, rating } = req.body
    if (!empDept || !empFeedName || !rating) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }

    //we get this from token_validatoin
    req.body.empName = `${req.user.fname} ${req.user.lname}`
    req.body.user_id = req.user.id

    const feedback = await Feedback.create(req.body)

    if (!techSurvey) {
        res.status(404)
        throw new Error('Request body is not found!')
    }

    res.status(200).json(feedback)
});

const checkFeedback = asyncHandler(async (req, res) => {
    const feedback = await Feedback.findOne({
        user_id: req.user.id,               //from token decoded data
        empFeedName: req.params.empfeedname
    });

    // const feed = feedback.filter((obj) =>
    //     obj.empFeedName == req.params.empfeedname
    // )

    if (feedback) {
        res.status(403)
        throw new Error('You have Already sent feedback for same')
    }
    else {
        res.status(200).json({ message: 'Feedback not available for same' })
    }
})

module.exports = { getFeedbacks, createFeedback, checkFeedback }