const express = require('express')
const { createLeaveReq, getLeaveReqs, getLeaveReq, updateLeaveReq, getLeaveReqsByEmpID } = require('../controllers/leave-request-controller.js')
const tokenValidation = require('../middlewares/token-handler.js')

const router = express.Router()
router.use(tokenValidation)

router.post('/', createLeaveReq)
router.get('/', getLeaveReqs)    
router.get('/:id', getLeaveReq)
router.get('/empID/:empID', getLeaveReqsByEmpID)        //gave objs which has this empID
router.put('/:id', updateLeaveReq)

module.exports = router;