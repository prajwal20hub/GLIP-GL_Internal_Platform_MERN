const express = require('express');
const tokenValidation = require('../middlewares/token-handler');
const {getLocations, getTotalRegs, updateTotalRegs, leavesRemain}  =require('../controllers/other-controller.js')

const router = express.Router();

router.get('/locations',tokenValidation, getLocations);
router.get('/total-registrations', getTotalRegs);
router.put('/total-registrations', updateTotalRegs);

module.exports = router