const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const OTP = require('../models/otp.model.js')

const getOTPMailContent = (username, otp) => {
    html = `
    <body>
        Hello <b>${username}</b>,<br/>
        OTP : <b>${otp}</b><br/>
        Regards,<br/>
        GLIP
    </body>
    `
    return html;
}

const postOTP = asyncHandler(async (email, name, otp) => {
    var otpObj = await OTP.findOne({ email: email });
    console.log(email, name);

    //Create 
    if (!otpObj) {
        await OTP.create({
            email,
            name,
            otp: await bcrypt.hash(otp.toString(), 10)
        });
    }
    //Update
    else {
        otpObj.otp = await bcrypt.hash(otp.toString(), 10);
        otpObj.expiresIn = new Date().getTime() + (120*1000);     //set new expiry time (+2min)

        await OTP.findByIdAndUpdate(
            otpObj.id,
            otpObj,
            { new: true }
        );
    }
});

const sendOTPMail = ({ receipientEmail, receipientName }) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);     //6 digit otp

        const transport = nodemailer.createTransport({
            port: 5500,
            service: 'gmail',
            auth: {
                user: 'prajwalpchunarkar6935@gmail.com',
                pass: 'xfsp oxzw acmu bpjr'
                //app password from google account
            },
        });

        const mailOption = {
            from: 'Prajwal Chunarkar',
            to: receipientEmail,
            subject: 'GLIP Account OTP',
            html: getOTPMailContent(receipientName, otp),
        };

        transport.sendMail(mailOption, (error) => {
            if (error) {
                console.log('====================================');
                console.log("Error occured while sending email...");
                console.dir(error, { depth: 'Infinity' });
                console.log('====================================');
            } else {
                console.log('====================================');
                console.log('Email sent successfully...');
                console.log('====================================');
            }
        });

        postOTP(receipientEmail, receipientName, otp);
    }
    catch (error) {
        console.log(error, { depth: 'Infinity' });
    }
};

module.exports = sendOTPMail;