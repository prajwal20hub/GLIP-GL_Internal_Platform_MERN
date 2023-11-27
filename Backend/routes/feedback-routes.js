const express = require('express');
const tokenValidation = require('../middlewares/token-handler.js');
const {getFeedbacks, createFeedback, checkFeedback}  = require('../controllers/feedback-controller.js')

const router = express.Router();

router.use(tokenValidation)

router.get('/', getFeedbacks);
router.post('/', createFeedback);
router.get('/empfeed/:empfeedname', checkFeedback);   

module.exports = router