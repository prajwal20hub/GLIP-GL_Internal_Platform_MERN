const express = require('express');
const tokenValidation = require('../middlewares/token-handler.js');
const {createLeaves, getLeavesByEmpID, updateLeavesByEmpID}  = require('../controllers/leave-remain-controller.js')

const router = express.Router();

router.post('/', createLeaves);        //not added token_validator as we use this in registration
router.get('/empID/:empID', tokenValidation, getLeavesByEmpID);
router.put('/empID/:empID', tokenValidation, updateLeavesByEmpID);

module.exports = router