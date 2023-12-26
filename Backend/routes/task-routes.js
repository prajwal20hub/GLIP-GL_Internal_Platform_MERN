const express = require('express');

const router = express.Router();
const tokenValidation = require('../middlewares/token-handler.js');

const {getTasksByUserId, createTask, getTaskById} = require('../controllers/task-controller.js')

router.use(tokenValidation);

router.get('/', getTasksByUserId);
router.post('/', createTask);
router.get('/:id', getTaskById);

module.exports = router