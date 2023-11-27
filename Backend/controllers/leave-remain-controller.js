const asyncHandler = require('express-async-handler')
const Leave = require('../models/leave.model.js')

//Post at time of registration
const createLeaves = asyncHandler(async (req,res) => {
    const {empID, empName} = req.body;
    if(!empID || !empName){
        res.status(401)
        throw new Error('All fields are mandatory!')
    }

    const leaves = await Leave.create(req.body);

    if(!leaves){
        res.status(401)
        throw new Error('Request body is not valid!')
    }

    res.status(201).json(leaves);
});

//GET leaves by empID
const getLeavesByEmpID = asyncHandler(async(req,res)=> {
    const leaves = await Leave.findOne({empID: req.params.empID})
    if(!leaves){
        res.status(401)
        throw new Error('Leaves data not found!')
    }
    res.status(200).json(leaves)
})

//PUT Updated leaves by empID
const updateLeavesByEmpID = asyncHandler(async(req,res)=> {
    const {casualLeaves, sickLeaves, paidLeaves}  = req.body;
    if(!casualLeaves || !sickLeaves || !paidLeaves){
        res.status(401)
        throw new Error('All fields are mandatory!')
    }

    const leaves = await Leave.findOne({empID: req.params.empID})
    if(!leaves){
        res.status(404)
        throw new Error('Leaves data not found!')
    }

    leaves.casualLeaves = casualLeaves
    leaves.sickLeaves = sickLeaves
    leaves.paidLeaves = paidLeaves

    const updatedLeaves = await Leave.findByIdAndUpdate(
        leaves.id,
        leaves,
        {new : true}
    )
    if(!updatedLeaves){
        res.status(404)
        throw new Error('Updated leave data not found!')
    }
    res.status(200).json(updatedLeaves)
})

module.exports = { createLeaves, getLeavesByEmpID, updateLeavesByEmpID }