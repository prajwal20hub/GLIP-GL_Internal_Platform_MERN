const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    otp: {
        type: String,
        require: true
    },
    expiresIn: {
        type: Number,
        require: true,
        default: new Date().getTime() + (120*1000)           //120 sec : 2min
    }
},{ timestamps: true });

module.exports = mongoose.model('OTP', otpSchema)