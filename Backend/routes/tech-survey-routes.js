const express = require('express');
const tokenValidation = require('../middlewares/token-handler.js');
const {getTechSurveys, getTechSurvey, createTechSurvey}  = require('../controllers/tech-survey-controller.js')

const router = express.Router();

router.use(tokenValidation)

router.get('/', getTechSurveys);
router.get('/user_id/', getTechSurvey);     //(req.user.id) so not need to send id in url
router.post('/', createTechSurvey);

module.exports = router