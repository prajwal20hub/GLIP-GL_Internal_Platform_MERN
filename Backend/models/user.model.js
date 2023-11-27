const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    mname: {
        type: String,
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email is already registered!']
    },
    phone: {
        type: Number,
        required: true,
        unique: [true, 'Phone number is already registered!']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    workLocation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    empID: {
        type: Number,
        required: true
    },
    user_type: {
        type: String,
        required: true,
        default: 'employee'
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)