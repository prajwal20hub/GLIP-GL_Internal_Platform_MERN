const mongoose = require('mongoose')

const accessReqSchema = new mongoose.Schema({
    empName: {
        type: String,
        require: true
    },
    empID: {
        type: Number,
        require: true
    },
    requestFor: {
        type: String,
        require: true
    },
    manager: {
        type: String,
        require: true
    },
    reason: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true,
        default: new Date().toISOString()
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

module.exports = mongoose.model('Access-Request', accessReqSchema)