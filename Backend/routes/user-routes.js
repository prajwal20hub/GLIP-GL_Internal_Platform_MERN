const express = require('express')
const {getUsers, getManagers, createUser, getUser, loginUser, deleteUser, resetPassword, updateUserType, updateDesignation, forgotPassword, currentUser} = require('../controllers/user-controller.js')
const tokenValidation = require('../middlewares/token-handler.js')

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/forgot-password/:id', forgotPassword)

router.get('/', tokenValidation, getUsers)          
router.get('/currentUser', tokenValidation, currentUser)
router.get('/managers', tokenValidation, getManagers)
router.delete('/:id', tokenValidation, deleteUser)           //by admin

router.get('/:id', tokenValidation, getUser)  
router.put('/reset-password', tokenValidation, resetPassword) 
router.put('/update-user_type/:empID', tokenValidation, updateUserType) 
router.put('/designation/:id', tokenValidation, updateDesignation)      

module.exports = router