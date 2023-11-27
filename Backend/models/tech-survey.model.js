const mongoose = require('mongoose')

const techSurveySchema = new mongoose.Schema({
    empName:{
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    cyber: {
        type: String,
        required: true
    },
    cloud: {
        type: String,
        required: true
    },
    commTool: {
        type: String,
        required: true
    }
},
{   
    timestamps: true
})

module.exports = mongoose.model('Tech-Survey', techSurveySchema)