const express = require('express');

const router = express.Router();
const optionController = require('../controllers/optionsController');

// Route to add options to a specific question
router.post('/:questionId/options/create', optionController.create);

// Route to delete an option
router.post('/:id/delete', optionController.delete);

// Route to increment the count of votes for an option
router.post('/:id/add_vote', optionController.addVote);

module.exports = router;
