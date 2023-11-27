const asyncHandler = require('express-async-handler')
const Payslip = require('../models/payslip.model.js')

//GET all Emp's Payslips
const getPayslips = asyncHandler(async(req,res)=> {    
    const payslips = await Payslip.find()
    res.status(200).json(payslips)
});

//GET current Emp's Payslips
const getCurrEmpPayslips = asyncHandler(async(req,res)=> {    
    const payslips = await Payslip.find({user_id: req.user.id})       //from token_validation
    res.status(200).json(payslips)
});

const createPayslip = asyncHandler(async (req, res) => {
    const { empName, empID, user_id, designation, salary, deduction, month, year } = req.body
    if (!empName || !empID || !user_id || !designation || !salary || !deduction || !month || !year) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }
    const payslip = await Payslip.create(req.body)

    if (!payslip) {
        res.status(404)
        throw new Error('Request body is not found!')
    }
    res.status(200).json(payslip)
});

module.exports = {getPayslips, getCurrEmpPayslips, createPayslip}