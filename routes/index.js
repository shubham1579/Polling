const express = require('express');

const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.use('/questions', require('./questions'));
router.use('/options', require('./options'));

module.exports = router;