const asyncHandler = require('express-async-handler')
const AccessRequest = require('../models/access-request.model')

//POST Transport-Request
const createAccessReq = asyncHandler(async (req,res) => {
    const {empID, empName, requestFor, manager, reason} = req.body;
    if(!empName || !empID || !requestFor || !manager || !reason){
        res.status(401)
        throw new Error('All fields are mandatory!')
    }
    
    const accessReq = await AccessRequest.create(req.body);
    if(!accessReq){
        res.status(401)
        throw new Error('Request body is not valid!')
    }
    res.status(201).json(accessReq);
});

//-------------------------------------------------------------------//

//GET all Transport Requests
const getAccessReqs = asyncHandler(async (req,res) => {
    const accessReqs = await AccessRequest.find()
    res.status(200).json(accessReqs);
});

//-------------------------------------------------------------------//

//GET Transport Request (req.params.id)
const getAccessReq = asyncHandler(async (req,res) => {
    const accessReq = await AccessRequest.findById(req.params.id);
    if(!accessReq){
        res.status(404)
        throw new Error('Access-Request not found')
    }
    res.status(200).json(accessReq);
});
//-------------------------------------------------------------------//

   
const updateAccessReq = asyncHandler(async (req,res) => {
    const {actionBy, rejectReason, status} = req.body;
    if(!actionBy || !rejectReason || !status){
        res.status = 401
        throw new Error('All fields are mandatory!')
    }
    const accessReq = await AccessRequest.findById(req.params.id)
    if(!accessReq){
        res.status(404)
        throw new Error('Access-Request not found')
    }
    accessReq.actionBy = actionBy;
    accessReq.rejectReason = rejectReason;
    accessReq.status = status;

    const updatedReq = await AccessRequest.findByIdAndUpdate(
        req.params.id,
        accessReq,
        {new : true}
    )
    res.status(200).json(updatedReq)
});

//GET : get records whose empID is (req.params.empID)
const getAccessReqsEmpID = asyncHandler(async (req,res)=> {
    const accessReq = await AccessRequest.find({empID: req.params.empID});
    
    if(!accessReq){
        res.status(404)
        throw new Error('Access-Request not found')
    }
    
    res.status(200).json(accessReq)
})

module.exports = { createAccessReq, getAccessReqs, getAccessReq, updateAccessReq, getAccessReqsEmpID }