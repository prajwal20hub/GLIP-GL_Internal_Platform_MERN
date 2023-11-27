const asyncHandler = require('express-async-handler')
const Location = require('../models/location.model.js')
const TotalRegs = require('../models/total-registration.model.js')

//GET
const getLocations = asyncHandler(async (req, res) => {
    const locations = await Location.find();
    res.status(200).json(locations)
});

//-------------------------------------------------------------------//

//GET 
const getTotalRegs = asyncHandler (async (req,res)=> {
    const totalRegs = await TotalRegs.find();
    res.status(200).json(totalRegs[0])
});

//-------------------------------------------------------------------//

//PUT
const updateTotalRegs = asyncHandler (async (req,res)=> {
    const totalRegs = await TotalRegs.find();
    const {total_registrations} = req.body;

    if(!total_registrations){
        res.status(401)
        throw new Error('All fields are mandatory!')
    }

    const updatedTotalRegs = await TotalRegs.findByIdAndUpdate(
        totalRegs[0].id,
        req.body,
        { new: true }
      );

    if(!updatedCount){
        res.status(401)
        throw new Error('Request body is not valid!')
    }

    res.status(200).json(updatedTotalRegs);

});

//-------------------------------------------------------------------//

module.exports = {getLocations, getTotalRegs, updateTotalRegs}