const mongoose = require('mongoose')

const leaveReqSchema = new mongoose.Schema({
    empName: {
        type: String,
        require: true
    },
    empID: {
        type: Number,
        require: true
    },
    leaveType: {
        type: String,
        require: true
    },
    startDate: {
        type: String,
        require: true,
    },
    endDate: {
        type: String,
        require: true,
    },
    duration: {
        type: String,
        require: true
    },
    isHalfDay: {
        type: String,
        require: true
    },
    halfDayDate: {
        type: String,
        require: true,
    },
    reason: {
        type: String,
        require: true,
    },
    rejectReason: {
        type: String,
        require: true,
        default: ''
    },
    actionBy: {
        type: String,
        require: true,
        default: '-'
    },
    status: {
        type: String,
        require: true,
        default: 'Pending'
    },  
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Leave-Request', leaveReqSchema)