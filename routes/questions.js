const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionsController');

// Route to create a new question
router.post('/create', questionController.Create);

// Route to delete a question
router.post('/:id/delete', questionController.delete);

// Route to view a question and its options
router.get('/:id', questionController.question);

module.exports = router;