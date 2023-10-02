const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Options',
    },
  ],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
