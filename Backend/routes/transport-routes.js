const express = require('express')
const { createTranspReq, getTranspReqs, getTranspReq, updateTranspReq, getTranspReqsEmpID } = require('../controllers/transport-controller.js')
const tokenValidation = require('../middlewares/token-handler.js')

const router = express.Router()
router.use(tokenValidation)

router.post('/', createTranspReq)
router.get('/', getTranspReqs)    
router.get('/:id', getTranspReq)
router.get('/empID/:empID', getTranspReqsEmpID)        //gave objs which has this empID
router.put('/:id', updateTranspReq)

module.exports = router;