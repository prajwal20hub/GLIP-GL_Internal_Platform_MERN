const asyncHandler = require('express-async-handler')
const TechSurvey = require('../models/tech-survey.model.js')

//GET all Tech Surveys 
const getTechSurveys = asyncHandler(async(req,res)=> {    
    const techSurveys = await TechSurvey.find()
    res.status(200).json(techSurveys)
});

//GET Tech Survey by by decoded token data saved in req.user in token_validation middleware
const getTechSurvey = asyncHandler(async(req,res)=> {    
    const techSurvey = await TechSurvey.findOne({user_id: req.user.id})
    if(!techSurvey){
        res.status(404)
        throw new Error('Not found!')
    }
    res.status(200).json(techSurvey)
});

//POST Tech Survey 
const createTechSurvey = asyncHandler(async (req,res)=> {
    const {tech, cyber, cloud, commTool} = req.body
    if(!tech|| !cyber|| !cloud|| !commTool){
        res.status(400)
        throw new Error('All fields are mandatory!')
    }

    //we get this from token_validatoin
    req.body.empName = `${req.user.fname} ${req.user.lname}` 
    req.body.user_id = req.user.id            

    const techSurvey = await TechSurvey.create(req.body)

    if(!techSurvey){
        res.status(404)
        throw new Error('Request body is not found!')
    }

    res.status(200).json(techSurvey)
});



module.exports = {getTechSurveys, getTechSurvey, createTechSurvey}