const express = require('express')
const {createAccessReq, getAccessReqs, getAccessReq, updateAccessReq, getAccessReqsEmpID} = require('../controllers/access-controller.js')
const tokenValidation = require('../middlewares/token-handler.js')

const router = express.Router()
router.use(tokenValidation)

router.post('/', createAccessReq)
router.get('/', getAccessReqs)    
router.get('/:id', getAccessReq)
router.get('/empID/:empID', getAccessReqsEmpID)        //gave objs which has this empID
router.put('/:id', updateAccessReq)

module.exports = router;