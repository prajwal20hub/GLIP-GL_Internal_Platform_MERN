const asyncHandler = require('express-async-handler')
const TranspRequest = require('../models/transport-request.model')

//POST Transport-Request
const createTranspReq = asyncHandler(async (req,res) => {
    const {empID,empName,location,pickupLocation,pickupAddress,dropLocation,dropAddress,startDate,endDate,returnTrip,weekDays} = req.body;
    if(!empName || !empID || !location || !pickupLocation || !pickupAddress || !dropLocation || !dropAddress || !startDate || !endDate || !returnTrip || !weekDays){
        res.status(401)
        throw new Error('All fields are mandatory!')
    }
    
    const transpReq = await TranspRequest.create(req.body);
    if(!transpReq){
        res.status(401)
        throw new Error('Request body is not valid!')
    }
    res.status(201).json(transpReq);
});

//-------------------------------------------------------------------//

//GET all Transport Requests
const getTranspReqs = asyncHandler(async (req,res) => {
    const transpReqs = await TranspRequest.find()
    res.status(200).json(transpReqs);
});

//-------------------------------------------------------------------//

//GET Transport Request (req.params.id)
const getTranspReq = asyncHandler(async (req,res) => {
    const transpReq = await TranspRequest.findById(req.params.id);
    if(!transpReq){
        res.status(404)
        throw new Error('Trasnport-Request not found')
    }
    res.status(200).json(transpReq);
});
//-------------------------------------------------------------------//

//PUT    
const updateTranspReq = asyncHandler(async (req,res) => {
    const {actionBy, rejectReason, status} = req.body;
    if(!actionBy || !rejectReason || !status){
        res.status = 401
        throw new Error('All fields are mandatory!')
    }
    const transpReq = await TranspRequest.findById(req.params.id)
    if(!transpReq){
        res.status(404)
        throw new Error('Trasnport-Request not found')
    }
    transpReq.actionBy = actionBy;
    transpReq.rejectReason = rejectReason;
    transpReq.status = status;

    const updatedReq = await TranspRequest.findByIdAndUpdate(
        req.params.id,
        transpReq,
        {new : true}
    )
    res.status(200).json(updatedReq)
});

//GET : get records whose empID is (req.params.empID)
const getTranspReqsEmpID = asyncHandler(async (req,res)=> {
    const transpReq = await TranspRequest.find({empID: req.params.empID})
    if(!transpReq){
        res.status(404)
        throw new Error('Trasnport-Request not found')
    }
    res.status(200).json(transpReq)
})

module.exports = { createTranspReq, getTranspReqs, getTranspReq, updateTranspReq, getTranspReqsEmpID }