const express = require('express')

const router = express.Router()
const tokenValidation = require('../middlewares/token-handler.js')

const {getPayslips, getCurrEmpPayslips, createPayslip} = require('../controllers/payslip-controller.js')

router.use(tokenValidation)

router.get('/', getPayslips)
router.get('/curr_emp', getCurrEmpPayslips)
router.post('/', createPayslip)

module.exports = router