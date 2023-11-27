const mongoose = require('mongoose')

const compSurveySchema = new mongoose.Schema({
    empName:{
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    empSatisfaction: {
        type: Number,
        required: true
    },
    trainingDev: {
        type: Number,
        required: true
    },
    empEngagement: {
        type: Number,
        required: true
    },
    empBenifits: {
        type: Number,
        required: true
    },
    empLeadership: {
        type: Number,
        required: true
    },
    empFuturePlanning: {
        type: Number,
        required: true
    },
    empWorkDiversity: {
        type: Number,
        required: true
    },
    empCommunication: {
        type: Number,
        required: true
    },
},
{   
    timestamps: true
})

module.exports = mongoose.model('Company-Survey', compSurveySchema)