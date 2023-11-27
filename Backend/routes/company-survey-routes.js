const express = require('express');
const tokenValidation = require('../middlewares/token-handler.js');
const {getCompSurveys, getCompSurvey, createCompSurvey}  = require('../controllers/company-survey-controller.js')

const router = express.Router();

router.use(tokenValidation)

router.get('/', getCompSurveys);
router.get('/user_id', getCompSurvey);     //(req.user.id) so not need to send id in url
router.post('/', createCompSurvey);

module.exports = router