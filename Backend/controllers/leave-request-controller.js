const asyncHandler = require('express-async-handler')
const LeaveRequest = require('../models/leave-request.model.js')

//POST Leave-Request
const createLeaveReq = asyncHandler(async (req,res) => {
    const {empName,empID,leaveType,startDate,endDate,duration,isHalfDay,halfDayDate,reason} = req.body;
    if(!empName || !empID || !leaveType || !startDate || !endDate || !duration || !isHalfDay || !reason){
        res.status = 401
        throw new Error('All fields are mandatory!')
    }
    if(isHalfDay === 'Yes' && !halfDayDate){
        res.status = 401
        throw new Error('All fields are mandatory!')
    }
    const leaveReq = await LeaveRequest.create(req.body);
    if(!leaveReq){
        res.status(401)
        throw new Error('Request body is not valid!')
    }
    res.status(201).json(leaveReq);
});

//-------------------------------------------------------------------//

//GET all Leave Request 
const getLeaveReqs = asyncHandler(async (req,res) => {
    const leaveReqs = await LeaveRequest.find()
    res.status(200).json(leaveReqs);
});

//-------------------------------------------------------------------//

//GET Leave Request (req.params.id)
const getLeaveReq = asyncHandler(async (req,res) => {
    const leaveReq = await LeaveRequest.findById(req.params.id);
    if(!leaveReq){
        res.status(404)
        throw new Error('Leave-Request not found')
    }
    res.status(200).json(leaveReq);
});
//-------------------------------------------------------------------//

//PUT    
const updateLeaveReq = asyncHandler(async (req,res) => {
    const {actionBy, rejectReason, status} = req.body;
    if(!actionBy || !rejectReason || !status){
        res.status = 401
        throw new Error('All fields are mandatory!')
    }
    const leaveReq = await LeaveRequest.findById(req.params.id)
    if(!leaveReq){
        res.status(404)
        throw new Error('Leave-Request not found')
    }
    leaveReq.actionBy = actionBy;
    leaveReq.rejectReason = rejectReason;
    leaveReq.status = status;

    const updatedReq = await LeaveRequest.findByIdAndUpdate(
        req.params.id,
        leaveReq,
        {new : true}
    )
    res.status(200).json(updatedReq)
});

//GET : get records whose empID is (req.params.empID)
const getLeaveReqsByEmpID = asyncHandler(async (req,res)=> {
    const leaveReq = await LeaveRequest.find({empID: req.params.empID})
    if(!leaveReq){
        res.status(404)
        throw new Error('Leave-Request not found')
    }
    res.status(200).json(leaveReq)
})

module.exports = { createLeaveReq, getLeaveReqs, getLeaveReq, updateLeaveReq, getLeaveReqsByEmpID }