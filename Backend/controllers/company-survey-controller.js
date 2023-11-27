const asyncHandler = require('express-async-handler')
const CompanySurvey = require('../models/company-survey.model.js')

//GET all Tech Surveys 
const getCompSurveys = asyncHandler(async(req,res)=> {    
    const compSurveys = await CompanySurvey.find()
    res.status(200).json(compSurveys)
});

//GET Company Survey by decoded token data saved in req.user in token_validation middleware
const getCompSurvey = asyncHandler(async(req,res)=> {
    const compSurvey = await CompanySurvey.findOne({user_id: req.user.id})
    res.status(200).json(compSurvey)
});

//POST Tech Survey 

const createCompSurvey = asyncHandler(async (req,res)=> {
    const {empSatisfaction, trainingDev, empEngagement, empBenifits, empLeadership, empFuturePlanning, empWorkDiversity, empCommunication} = req.body;

    if(!empSatisfaction|| !trainingDev|| !empEngagement|| !empBenifits|| !empLeadership|| !empFuturePlanning|| !empWorkDiversity|| !empCommunication){
        res.status(400)
        throw new Error('All fields are mandatory!')
    }

    //we get this from token_validatoin
    req.body.empName = `${req.user.fname} ${req.user.lname}` 
    req.body.user_id = req.user.id            

    const compSurvey = await CompanySurvey.create(req.body)
    if(!compSurvey){
        res.status(404)
        throw new Error('Request body is not found!')
    }
    res.status(200).json(compSurvey)
});

module.exports = {getCompSurveys, getCompSurvey, createCompSurvey}