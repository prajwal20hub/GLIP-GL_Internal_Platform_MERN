const express = require('express')
const {getUserByEmail, verifyOTP} = require('../controllers/otp-controller.js')

const router = express.Router()

router.get('/email/:email', getUserByEmail)
router.post('/verify-otp', verifyOTP) 

module.exports = router