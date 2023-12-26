const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/user.model.js');
const OTP = require('../models/otp.model.js');
const sendOTPMail = require('../utils/sendOTPMail.js');

//GET user by Email and create/update otp for that user in database
const getUserByEmail = asyncHandler(async(req,res)=> {
    const user = await User.findOne({email: req.params.email});

    if (!user) {
        res.status(404)
        throw new Error('Email is not registered!')
    }

    sendOTPMail({
        receipientEmail: user.email,
        receipientName: `${user.fname} ${user.lname}`
    });
    
    res.status(200).json(user);
});

//Verify OTP from backend
const verifyOTP = asyncHandler(async (req,res) => {
    const {email, otp} = req.body;
    const otpObj = await OTP.findOne({email});

    if(!otpObj){
        res.status(404);
        throw new Error('OTP info is not Found');
    }
    
    else if (otpObj && await bcrypt.compare(otp, otpObj.otp.toString())) {
        const diff = otpObj.expiresIn - new Date().getTime();
        
        if(Number(diff) < 0){
            res.status(401);
            throw new Error('OTP is expired!');
        }
        else{
            res.status(200).json({ message: 'OTP Varified Successfully!'});
        }
    }
    else {
        res.status(401);
        throw new Error('OTP is Incorrect');
    }
});


module.exports = { getUserByEmail, verifyOTP }