const mongoose = require('mongoose')

const payslipSchema = new mongoose.Schema({
    empName: {
        type: String,
        require: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    empID: {
        type: Number,
        require: true
    },
    designation:{
        type: String,
        require: true
    },                              
    salary: {
        type: Number,
        require: true
    },
    deduction: {
        type: Number,
        require: true
    },
    month: {
        type: Number,
        require: true
    },
    year: {
        type: Number,
        require: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Payslip', payslipSchema)