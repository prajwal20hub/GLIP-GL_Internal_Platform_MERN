const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    empID: {
        type: Number,
        reqiured: true
    },
    empName: {
        type: String,
        required: true
    },
    casualLeaves: {
        type: Number,
        required: true,
        default: 6
    },
    sickLeaves: {
        type: Number,
        required: true,
        default: 8
    },
    paidLeaves: {
        type: Number,
        required: true,
        default: 10
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Leave', leaveSchema)