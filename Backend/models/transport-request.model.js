const mongoose = require('mongoose')

const transpReqSchema = new mongoose.Schema({
    empName: {
        type: String,
        require: true
    },
    empID: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    pickupLocation: {
        type: String,
        require: true
    },
    pickupAddress: {
        type: String,
        require: true
    },
    dropLocation: {
        type: String,
        require: true
    },
    dropAddress: {
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
    returnTrip: {
        type: String,
        require: true,
    },
    weekDays: {
        type: Number,
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

module.exports = mongoose.model('Transport-Request', transpReqSchema)